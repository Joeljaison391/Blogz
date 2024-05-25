import React from 'react';

export const SignupButton: React.FC = () => {
    return (
        <button className="text-gray-700 hover:text-gray-900 flex items-center p-2 rounded-full hover:bg-gray-300 transition duration-300">
            <span className="hidden sm:inline">Log in</span>
            <span className="sm:hidden">→</span>
        </button>
    );
};
