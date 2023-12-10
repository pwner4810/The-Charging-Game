import React from 'react';

interface ButtonProps {
    onClick?: () => void;
    message: string;
    disabled: boolean;
    type?: "button" | "submit" | "reset" | undefined;
}

const Button: React.FC<ButtonProps> = ({ onClick, message,disabled,type }) => {
    return (
        <button
            disabled={disabled}
            type={type}
            onClick={onClick}
            className="border-colourgrey-300 rounded-2xl  border-solid   hover:bg-colourgrey-300 text-gray-400  font-bold py-2 px-4 bg-colourgrey-300 ">
            {message}
        </button>
    );
};

export default Button;
