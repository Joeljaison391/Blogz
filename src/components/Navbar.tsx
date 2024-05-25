import React from 'react';
import { NavbarLink } from '../ui/Links/NavbarLink';
import { SignupButton } from '../ui/Buttons/SignupButton';

export const Navbar: React.FC = () => {
    const links = [
        {
            text: 'Dashboard',
            url: '/dashboard',
            color: 'text-blue-500',
            height: 'h-10',
            padding: 'p-2.5'
        },
        {
            text: 'Posts',
            url: '/posts',
            color: 'text-green-500',
            height: 'h-10',
            padding: 'p-2.5'
        },
        {
            text: 'Settings',
            url: '/settings',
            color: 'text-red-500',
            height: 'h-10',
            padding: 'p-2.5'
        }
    ];

    return (
        <div className="flex items-center justify-between p-4 bg-gray-100">
            <div className="text-2xl font-bold">Blogz</div>
            <nav className="flex gap-5">
                {
                    links.map((link, index) => (
                        <NavbarLink
                            key={index}
                            text={link.text}
                            link={link.url}
                            color={link.color}
                            height={link.height}
                            padding={link.padding}
                        />
                    ))
                }
            </nav>
            <SignupButton />
        </div>
    );
};
