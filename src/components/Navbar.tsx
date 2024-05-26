import React from 'react';
import { NavbarLink } from '../ui/Links/NavbarLink';
import { SignupButton } from '../ui/Buttons/SignupButton';

interface Link {
    text: string;
    url: string;
}

export const Navbar: React.FC = () => {
    const links: Link[] = [
        { text: 'Dashboard', url: '/dashboard' },
        { text: 'Posts', url: '/posts' },
        { text: 'Settings', url: '/settings' },
    ];

    return (
        <div className="w-full flex justify-center bg-white py-4 sm:py-6">
            <div className="flex flex-col items-center justify-between p-4 bg-white shadow-md rounded-lg sm:flex-row sm:items-center sm:w-3/4 sm:max-w-screen-lg sm:border sm:border-gray-300">
                <div className="text-2xl font-bold text-blue-500 mb-4 sm:mb-0 sm:mr-8">Blogz</div>
                <nav className="flex flex-col sm:flex-row sm:gap-5">
                    {links.map((link, index) => (
                        <NavbarLink key={index} text={link.text} link={link.url} />
                    ))}
                </nav>
                <div className="flex items-center justify-center mt-4 sm:mt-0">
                    <div className="border border-gray-300 rounded-full p-1 hover:bg-gray-300 transition duration-300">
                        <SignupButton />
                    </div>
                </div>
            </div>
        </div>
    );
};
