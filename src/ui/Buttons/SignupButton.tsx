import React from 'react';

interface SignupButtonProps {
    color?: string;
    backgroundColor?: string;
    padding?: string;
}

export const SignupButton: React.FC<SignupButtonProps> = ({ color, backgroundColor, padding }) => {
    const defaultColor = 'text-white';
    const defaultBackgroundColor = 'bg-blue-500';
    const defaultPadding = 'py-2 px-4';

    const buttonColor = color || defaultColor;
    const buttonBackgroundColor = backgroundColor || defaultBackgroundColor;
    const buttonPadding = padding || defaultPadding;

    const baseStyle = `${buttonColor} ${buttonBackgroundColor} ${buttonPadding} rounded cursor-pointer`;

    return (
        <button className={baseStyle}>
            Signup
        </button>
    );
};
