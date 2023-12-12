
# The Fastned Charging Game

## Project Description
The Fastned Charging Game. The goal of the game is to provide electricity from our charger
to your electrical vehicle (EV) as fast as possible. When the user starts a new game, a timer will run to measure how
long it takes you to create an electric circuit from the charger to the car. As soon as the circuit is
established, the timer will stop and your name, email and time will be added to the leaderboard. The game will show the
names and email addresses of the top 5 players with their fastest time. You can use the
Leaderboard service to submit scores and retrieve the top players.
The game board consists of 9 cells, each containing an electrical cable. The charger is connected to the left side
of the top left cell. The car is connected to the right side of the bottom right cell.

## Installation and Setup
- Clone the repository.
- Navigate to the project's root directory.
- Run `npm install` or `yarn` to install dependencies.

## Usage
- Start the server with `npm run dev` or `yarn dev`.
- Access the application at `http://localhost:3000`.
- 
## Usage
- In order to run test cases use `npm run test` or `yarn test`.
- 
## Features
- user interface with React and Next.js.
- Tailwind CSS for responsive design.
- Modular and maintainable code structure.
- Responsive UI 
- Redux 
- React-query 
- 
## Game Features
- Puzzle generation based on the connector type example size=> `CCS : 3 X 3` `CHAdeMO : 5 X 5` `AC : 8 X 8`
- Start and reset the session by clicking on the button
- Generate Solvable Puzzle in dynamic size
- Tracking the competition time of the puzzle 
- Track the connected cable from top left after each rotation 
- recognized the puzzle solved 
- form for passing the name email and the stored time to the service 
- leaderboard dashboard to show top 5 players
- filtering based on name (using debounce)

## Technologies Used
- React.js
- Next.js
- Tailwind CSS
- TypeScript

## Table of Contents
- [Project Structure](#project-structure)
- [How to Play the Game](#how-to-play-the-game)
- [Game Board State Management with Redux](#game-board-state-management-with-redux)
- [Generating a Solvable Puzzle](#generating-a-solvable-puzzle)
- [Detecting Circuit Completion and Path](#detecting-circuit-completion-and-path-in-the-game)
- [Place to improve ](#place-to-improve-)

## Project Structure
<a name="project-structure"></a>

### `src/` Directory
- **__test__/**: there are test cases for testing functionality of the app  (`board.test.ts`).
- **constants/**: Houses game configurations and settings (`game.constants.ts`).
- **utils/**: Utility functions and types (`circuit.helper.ts`, `board.helper.ts`).
- **state/**: Manages application state using redux  (`gameBoardSlice.ts`, `store.ts`).
- **styles/**: Global styling (`globals.css`).
- **components/**: UI components, categorized into atoms, molecules, and organisms.
  - **atoms/**: Basic UI elements (`Button.tsx`, `Footer.tsx`).
  - **molecules/**: Compound components (`Cell.tsx`, `PlayerForm.tsx`).
  - **organisms/**: Complex UI structures (`Board.tsx`, `GameInterface.tsx`).
- **hooks/**: Custom React hooks (`useTimer.hook.ts`, `useLeaderBoard.hook.ts`).
- **api/**: API interaction files (`leaderBoard.api.ts`).
- **pages/**: Application pages and routing (`index.tsx`, `leaderBoard.tsx`).



## How to Play the Game
<a name="how-to-play"></a>
<table>
  <tr>
    <td align="center">
      <img src="https://github.com/pwner4810/The-Charging-Game/blob/main/public/screenshots/select.png?raw=true" width="100%" alt="Step 1: Select your connector type." /><br />
      Step 1: Select your connector type. each connector has different puzzle size
    </td>
    <td align="center">
      <img src="https://github.com/pwner4810/The-Charging-Game/blob/main/public/screenshots/start.png?raw=true" width="100%" alt="Step 2: Start the charging session." /><br />
      Step 2: Start the charging session. after that the timer start counting 
    </td>
    <td align="center">
      <img src="https://github.com/pwner4810/The-Charging-Game/blob/main/public/screenshots/change-selector.png?raw=true" width="100%" alt="Step 3: Charging session in progress." /><br />
      Step 3: Charging session in progress. you need to finish the puzzle by connecting the cables from top left to bottom right
    </td>
  </tr>
  <tr>
    <td align="center">
      <img src="https://github.com/pwner4810/The-Charging-Game/blob/main/public/screenshots/solve-puzzle.png?raw=true" width="100%" alt="Step 4: Complete the charging session." /><br />
      Step 4: Complete the charging session. you can change the connector and the timer would be reseting 
    </td>
    <td align="center">
      <img src="https://github.com/pwner4810/The-Charging-Game/blob/main/public/screenshots/add-name.png?raw=true" width="100%" alt="Step 5: Enter your name and email after the session." /><br />
      Step 5: Enter your name and email after the session and click on submit button
    </td>
    <td align="center">
      <img src="https://github.com/pwner4810/The-Charging-Game/blob/main/public/screenshots/leaderboard.png?raw=true" width="100%" alt="Step 6: View the leaderboard." /><br />
      Step 6: View the leaderboard. you can filter the data by the name 
    </td>
  </tr>
</table>

## Game Board State Management with Redux

### Overview

In the project, i use Redux Toolkit to manage the state of the game board efficiently. The `gameBoardSlice` is a crucial part of our state management strategy, residing in the `src/state` directory. It handles various aspects of the game board's state, such as rotation of cells, resetting the game, and tracking the completion time.

### GameBoardSlice

The `gameBoardSlice` is created using Redux Toolkit's `createSlice` function, which simplifies the process of writing Redux logic. It defines the initial state and the reducers for the various actions that can be performed on the game board.

#### Initial State

The initial state of the game board is defined with the following properties:
- `isCircuitComplete`: Indicates whether the circuit is complete.
- `completionTime`: Stores the time taken to complete the game.
- `isGameActive`: A boolean to track if the game is currently active.
- `gridSize`: The size of the grid for the game board.
- `cells`: The cells of the game board, initialized with a solvable puzzle.
- `correctPath`: An array storing the correct path for completing the circuit.

#### Reducers and Actions

- `rotateCell`: This reducer rotates a specified cell on the game board and checks if the circuit is complete after the rotation.
- `resetGame`: Resets the game board to a new solvable state based on the specified grid size.
- `setCompletionTime`: Sets the completion time upon completing the puzzle.
- `setGameActive`: Toggles the game's active status.

These actions enable the dynamic and responsive management of the game board's state as the player interacts with the game.




## Generating a Solvable Puzzle
<a name="generating-a-solvable-puzzle"></a>
### Overview

the game features an intriguing mechanic of generating solvable puzzles dynamically. This process is crucial for ensuring a unique and challenging experience each time a player starts a game. The puzzle generation is handled by a series of functions, primarily located in the utility files.

### Key Functions

1. **`randomRotation`**: This function returns a random rotation degree (0, 90, 180, 270) for the cables. It's used to add variability to the puzzle.

2. **`randomCableType`**: It randomly selects a type of cable from the defined `CableType` enum. This adds diversity to the game board by varying the cable types.

3. **`createPathCell`**: Given two directions, this function creates a cell with a specific cable type and rotation. It ensures that the cables connect correctly from one direction to the next, forming a solvable path.

4. **`generateSolvableBoard`**: This is the core function that generates the puzzle. It creates a grid of a specified size and populates it with cells that form a solvable path. The path is created by sequentially placing cells that connect from one edge of the grid to the other. Once the path is complete, remaining cells are filled with random cables and rotations.

5. **`rotateAllCells`**: After generating a solvable path, this function applies a random rotation to each cell in the grid, making the puzzle challenging to solve.


### Puzzle Generation Process

1. **Starting the Board**: The process begins by creating an empty grid of the desired size.

2. **Creating a Solvable Path**: Starting from one corner, the `generateSolvableBoard` function lays down a path of connected cables. This path snakes through the grid, ensuring that there's at least one solvable route from start to finish.

3. **Randomizing Cells**: Once the path is established, the remaining cells are filled with random cable types and orientations.

4. **Final Touches**: `rotateAllCells` is then called to rotate all cells randomly, further randomizing the puzzle and ensuring that the solution is not immediately apparent.


## Detecting Circuit Completion and Path in the Game

### Overview

The game includes a mechanism to check whether the puzzle's circuit is complete and to identify the correct path through the grid. This functionality is crucial for game logic, ensuring that players can successfully complete puzzles and receive accurate feedback on their progress.

### Key Functions

1. **`getExitPoint`**: Determines the exit point from a cell based on the cable type, entry point, and rotation. This function is fundamental in understanding how each cell connects to its adjacent cells.

2. **`getNextCell`**: Calculates the coordinates of the next cell in the grid based on the current cell's exit point. This is essential for traversing the grid to check the continuity of the circuit.

3. **`isCellCorrectlyConnected`**: Checks if a cell is correctly connected based on its cable type, rotation, and entry/exit points. This function validates each connection within the circuit.

4. **`isCircuitComplete`**: The primary function that iterates through the grid to determine if a complete circuit has been formed. It uses the previous functions to check each cell's connections and tracks the path taken.

### Circuit Completion Process

- **Starting at the Grid's Beginning**: The process begins at the top-left cell of the grid, assuming an entry point from the left (`Direction.Left`).

- **Traversing the Grid**: Using `getExitPoint`, the function determines the exit direction for each cell, then moves to the next cell in that direction using `getNextCell`.

- **Path Tracking**: As the function traverses the grid, it records the path taken in the `correctPath` array. This records the sequence of cells that are part of the completed circuit.

- **Validation**: At each step, `isCellCorrectlyConnected` checks whether the current cell's connections are valid based on its type, rotation, and the direction of entry and exit.

- **Completing the Circuit**: The circuit is considered complete if the function successfully reaches the bottom-right cell of the grid and exits to the right. If at any point the path loops back on itself or reaches an invalid cell, the circuit is deemed incomplete.

- **Result**: The function returns an object of type `CircuitResponse`, containing a boolean indicating if the circuit is completed and the array `correctPath`.

## Place to improve 
- **Add e2e testing**: right now there is a comprehensive unit testing placed in the app , adding e2e testing using cypress would complete this cycle 
- **Game Hint**: in the app right now tracking the connected cable is done but i see there is a nice improvement to add user hint for the next step 
- **Store User info**: right now users need to complete the form every time they solve the puzzle its better to store the data for further game
- **Play more with UI** : of course there is a huge space for UI to be improved and it can be taken ino the consideration for future implementation 