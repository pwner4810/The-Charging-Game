import React, { useState } from 'react';
import Button from "@/components/atoms/Button";
import {PlayerData} from "@/utils/types/leaderBoard.type";

interface PlayerFormProps {
    onPlayerSubmit: (playerData: PlayerData) => void;
    initialTime: number;
}

const PlayerForm: React.FC<PlayerFormProps> = ({ onPlayerSubmit, initialTime }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onPlayerSubmit({ name, email, seconds: initialTime });
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 shadow-md rounded-lg bg-colouryellow-100 border-2">
            <div className="mb-6 p-4 bg-green-100 border-l-4 border-green-500 text-green-700">
                <p className="font-semibold">Congratulations!</p>
                <p>{`You finished it in ${initialTime} seconds`}</p>
            </div>
            <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Name:</label>
                <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                />
            </div>
            <div className="mb-6">
                <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email:</label>
                <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                />
            </div>

            <Button  message={'Submit'} disabled={false} type="submit"/>
        </form>
    );
};

export default PlayerForm;
