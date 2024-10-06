import React, { useState } from "react"
import { NavLink } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faSearch,
  faPen,
  faMoon,
  faUser,
  faBars,
  faEdit,
  faKey,
  faFileAlt,
  faSignOutAlt,
  faInfoCircle,
  faEnvelope
} from "@fortawesome/free-solid-svg-icons"

interface Link {
  text: string
  url: string
}

const NavbarLink: React.FC<{ text: string; link: string }> = ({ text, link }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    <NavLink
      to={link}
      className={({ isActive }) =>
        `text-lg font-medium ${isActive ? 'text-blue-600' : 'text-gray-600 hover:text-blue-500'}`
      }
    >
      {text}
    </NavLink>
  </motion.div>
)

export const HomeNavbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [profileMenuOpen, setProfileMenuOpen] = useState(false)

  const links: Link[] = [
    { text: "My Feed", url: "/my-feed" },
    { text: "Discussions", url: "/discussions" },
    { text: "All posts", url: "/posts/all" },
  ]

  const profileLinks: Link[] = [
    { text: "Edit Profile", url: "/profile/edit" },
    { text: "Change Password", url: "/profile/change-password" },
    { text: "My Posts", url: "/profile/posts" },
    { text: "Logout", url: "/logout" },
    { text: "About", url: "/about" },
    { text: "Contact", url: "/contact" },
  ]

  const toggleMenu = () => setMenuOpen(!menuOpen)
  const toggleProfileMenu = () => setProfileMenuOpen(!profileMenuOpen)

  return (
    <div className="w-full bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <button className="sm:hidden mr-2" onClick={toggleMenu}>
              <FontAwesomeIcon icon={faBars} className="text-gray-500 w-5 h-5" />
            </button>
            <div className="text-2xl font-bold text-blue-600">Blogz</div>
          </div>
          <nav className="hidden sm:flex space-x-4">
            {links.map((link, index) => (
              <NavbarLink key={index} text={link.text} link={link.url} />
            ))}
          </nav>
          <div className="flex items-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-gray-500 hover:text-blue-500"
            >
              <FontAwesomeIcon icon={faSearch} className="w-5 h-5" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center px-3 py-2 bg-blue-500 text-white rounded-full text-sm font-medium hover:bg-blue-600"
            >
              <FontAwesomeIcon icon={faPen} className="w-4 h-4 mr-2" />
              Write
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-gray-500 hover:text-blue-500"
            >
              <FontAwesomeIcon icon={faMoon} className="w-5 h-5" />
            </motion.button>
            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="text-gray-500 hover:text-blue-500"
                onClick={toggleProfileMenu}
              >
                <FontAwesomeIcon icon={faUser} className="w-5 h-5" />
              </motion.button>
              <AnimatePresence>
                {profileMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10"
                  >
                    {profileLinks.map((link, index) => (
                      <motion.div
                        key={index}
                        whileHover={{ backgroundColor: "#f3f4f6" }}
                      >
                        <NavLink
                          to={link.url}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          <FontAwesomeIcon icon={
                            link.text === "Edit Profile" ? faEdit :
                            link.text === "Change Password" ? faKey :
                            link.text === "My Posts" ? faFileAlt :
                            link.text === "Logout" ? faSignOutAlt :
                            link.text === "About" ? faInfoCircle :
                            faEnvelope
                          } className="w-4 h-4 mr-2" />
                          {link.text}
                        </NavLink>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="sm:hidden bg-white border-t border-gray-200"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              {links.map((link, index) => (
                <NavbarLink key={index} text={link.text} link={link.url} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default HomeNavbar