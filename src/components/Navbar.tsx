import React from 'react'
import { NavLink, useLocation } from 'react-router'
import useDarkTheme from '../stores/themeStore'
import { useAuth } from '../contexts/AuthContext'

const NavBar: React.FC = () => {
    const location = useLocation()
    const { isDarkMode } = useDarkTheme()
    const { isAuthenticated } = useAuth()

    const links = [
        { name: 'My Recipes', path: '/app/dashboard' },
        { name: 'Explorer', path: '/app/home' },
    ]

    return (
        <nav className={`p-4 ${isAuthenticated ? 'block' : 'hidden'}`}>
            <ul className="flex space-x-6 gap-5">
                {links.map((link) => {
                    const isActive = location.pathname === link.path
                    return (
                        <li key={link.name} className="relative">
                            <NavLink
                                to={link.path}
                                className={`navlink ${isActive ? 'navlink-active' : ''}`}
                                data-theme={isDarkMode ? 'dark' : 'light'}
                            >
                                {link.name}
                            </NavLink>
                        </li>
                    )
                })}
            </ul>
        </nav>
    )
}

export default NavBar
