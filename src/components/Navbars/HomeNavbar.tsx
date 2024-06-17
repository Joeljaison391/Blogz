import React, { useState } from "react";
import { NavbarLink } from "../../ui/Links/NavbarLink";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faPen, faMoon, faUser, faBars } from "@fortawesome/free-solid-svg-icons";

interface Link {
  text: string;
  url: string;
}

export const HomeNavbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const links: Link[] = [
    { text: "My Feed", url: "/my-feed" },
    { text: "Discussions", url: "/discussions" },
    { text: "Headless CMS", url: "/headless-cms" },
  ];

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="w-full bg-gray-200 shadow-md">
      <div className="flex items-center justify-between px-4 py-10 max-w-screen h-16">
        <div className="flex items-center pr-8">
          {/* Hamburger Icon for Mobile */}
          <button className="sm:hidden " onClick={toggleMenu}>
            <FontAwesomeIcon icon={faBars} className="text-gray-500 w-6 h-6" />
          </button>
          <div className="text-3xl font-bold text-blue-500 pb-2 ml-2 sm:ml-0">Blogz</div>
        </div>
        <nav className="hidden sm:flex gap-5 flex-1 justify-center">
          {links.map((link, index) => (
            <NavbarLink key={index} text={link.text} link={link.url} />
          ))}
        </nav>
        <div className="flex items-center gap-4">
          {/* Search Button */}
          <button className="p-2">
            <FontAwesomeIcon icon={faSearch} className="text-gray-500 w-6 h-6" />
          </button>
          {/* Write Button */}
          <button className="flex items-center p-2 bg-blue-500 text-white rounded-full">
            <FontAwesomeIcon icon={faPen} className="w-6 h-6 mr-2" />
            Write
          </button>
          {/* Dark Mode Button */}
          <button className="p-2">
            <FontAwesomeIcon icon={faMoon} className="text-gray-500 w-6 h-6" />
          </button>
          {/* Profile Button */}
          <button className="p-2">
            <FontAwesomeIcon icon={faUser} className="text-gray-500 w-6 h-6" />
          </button>
        </div>
      </div>
      {menuOpen && (
        <div className="sm:hidden bg-white shadow-md rounded-lg mt-2 pb-4 p-4">
          <nav className="flex flex-col gap-3">
            {links.map((link, index) => (
              <NavbarLink key={index} text={link.text} link={link.url} />
            ))}
          </nav>
        </div>
      )}
    </div>
  );
};
