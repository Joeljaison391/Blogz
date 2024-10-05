import  { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

interface Link {
  text: string;
  url: string;
}

const links: Link[] = [
  { text: "Dashboard", url: "/dashboard" },
  { text: "Posts", url: "/posts" },
  { text: "Settings", url: "/settings" },
];

export default function Navbar(): JSX.Element {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white bg-opacity-80 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between py-4">
          <div className="flex items-center">
            <button
              className="lg:hidden p-2 focus:outline-none"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <svg
                className="w-6 h-6 text-gray-800"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
            <span className="text-2xl font-bold text-gray-800 ml-4 lg:ml-0">
              Blogz
            </span>
          </div>
          <div className="hidden lg:flex items-center space-x-8">
            {links.map((link, index) => (
              <NavLink
                key={index}
                to={link.url}
                className={({ isActive }: { isActive: boolean }) =>
                  `relative px-3 py-2 text-gray-800 transition-colors duration-300 hover:text-gray-600 ${
                    isActive ? "font-bold" : "font-medium"
                  }`
                }
              >
                {({ isActive }: { isActive: boolean }) => (
                  <>
                    {link.text}
                    {isActive && (
                      <motion.div
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-800"
                        layoutId="underline"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </div>
          <Link to="/auth/login">
            <Button variant="outline">Sign Up</Button>
          </Link>
        </nav>
      </div>
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="lg:hidden bg-white shadow-lg rounded-b-lg mt-2 mx-4 p-4"
        >
          <nav className="flex flex-col gap-3">
            {links.map((link, index) => (
              <NavLink
                key={index}
                to={link.url}
                className={({ isActive }: { isActive: boolean }) =>
                  `px-3 py-2 rounded-md transition-colors duration-300 ${
                    isActive
                      ? "bg-gray-100 text-gray-900 font-bold"
                      : "text-gray-600 hover:bg-gray-50"
                  }`
                }
                onClick={() => setMenuOpen(false)}
              >
                {link.text}
              </NavLink>
            ))}
          </nav>
        </motion.div>
      )}
    </header>
  );
}
