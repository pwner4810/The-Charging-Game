import React from 'react';

interface StatusIndicatorProps {
    message: string;
    isSelected: boolean;
}

const StatusIndicator: React.FC<StatusIndicatorProps> = ({ message, isSelected }) => {
    return (
        <div className={`py-2 px-4 ${isSelected ? 'text-green-500' : 'text-gray-500'}`}>
    {message}
    </div>
);
};

export default StatusIndicator;
