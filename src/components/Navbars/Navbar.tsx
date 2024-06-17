import React, { useState } from 'react';
import { NavbarLink } from '../../ui/Links/NavbarLink';
import { SignupButton } from '../../ui/Buttons/SignupButton';

interface Link {
    text: string;
    url: string;
}

export const Navbar: React.FC = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const links: Link[] = [
        { text: 'Dashboard', url: '/dashboard' },
        { text: 'Posts', url: '/posts' },
        { text: 'Settings', url: '/settings' },
    ];

    return (
        <div className="w-full flex justify-center bg-white py-4 px-4">
            <div className="w-full sm:w-3/4 max-w-screen-lg px-4">
                <div className="flex items-center justify-between p-4 bg-white shadow-md rounded-full border border-gray-300">
                    <div className="flex items-center">
                        <button
                            className="sm:hidden p-2 focus:outline-none"
                            onClick={() => setMenuOpen(!menuOpen)}
                        >
                            <svg
                                className="w-6 h-6 text-gray-500"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                            </svg>
                        </button>
                        <div className="text-2xl font-bold text-blue-500 ml-4 sm:ml-0">Blogz</div>
                    </div>
                    <nav className="hidden sm:flex sm:gap-5">
                        {links.map((link, index) => (
                            <NavbarLink key={index} text={link.text} link={link.url} />
                        ))}
                    </nav>
                    <div className="border border-gray-300 rounded-full p-1 hover:bg-gray-300 transition duration-300">
                        <SignupButton />
                    </div>
                </div>
                {menuOpen && (
                    <div className="sm:hidden bg-white shadow-md rounded-lg mt-2 mx-4 p-4">
                        <nav className="flex flex-col gap-3">
                            {links.map((link, index) => (
                                <NavbarLink key={index} text={link.text} link={link.url} />
                            ))}
                        </nav>
                    </div>
                )}
            </div>
        </div>
    );
};
