import React from 'react';
import { NavLink as RouterNavLink } from 'react-router-dom';

interface NavLinkProps {
    text: string;
    link: string;
    color?: string;
    height?: string;
    padding?: string;
}

export const NavbarLink: React.FC<NavLinkProps> = ({ text, link, color, height, padding }) => {
    const baseStyle = `inline-block ${color || 'text-gray-700'} ${height || 'h-10'} ${padding || 'p-2.5'} rounded-full hover:bg-gray-300 transition duration-300`;

    return (
        <RouterNavLink to={link} className={baseStyle}>
            <div className="flex items-center justify-center h-full w-full">
                {text}
            </div>
        </RouterNavLink>
    );
};
