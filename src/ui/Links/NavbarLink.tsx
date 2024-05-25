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
    const baseStyle = `inline-block ${color} ${height} ${padding}`;

    return (
        <RouterNavLink to={link} className={baseStyle}>
            {text}
        </RouterNavLink>
    );
};
