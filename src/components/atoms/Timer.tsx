// src/components/Timer.tsx
import React from 'react';

interface TimerProps {
    seconds: number;
}

const Timer: React.FC<TimerProps> = ({seconds}) => {
    return (
        <div
            className='items-center gap-4 p-4 bg-colouryellow-100 border-2 rounded-lg shadow-lg text-2xl font-bold animate-pulse'>
            Time : <span className='text-colourgrey-400'>{seconds}s</span>
        </div>

    );
};

export default Timer;
