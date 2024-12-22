import React from 'react'
import Container from '../layouts/Container'
import useDarkTheme from '../stores/themeStore'
import Header from '../layouts/Header'
import NavBar from '../components/Navbar'
import Main from '../layouts/Main'
import Logo from '../components/Logo'
import { useAuth } from '../contexts/AuthContext'
import SignButton from '../components/ui/SignButton'
import Button from '../components/ui/Button'
import { FaMoon, FaSun } from 'react-icons/fa'
import ExplorerContainer from '../components/ExplorerContainer'

const HomePage: React.FC = () => {
    const { isDarkMode, toggleDarkMode } = useDarkTheme()

    const { isAuthenticated } = useAuth()
    const handleThemeToggle = () => {
        toggleDarkMode()
    }

    return (
        <Container className="body-bg border-2 border-green-400" dataTheme={isDarkMode ? 'dark' : 'light'}>
            <Header className="w-screen h-fit flex flex-row justify-between items-center bg-transparent text-neutral-100 border-b-[1px] border-neutral-100 p-4 sticky top-0">
                <div className="flex items-center gap-2 ml-2">
                    <Logo />
                </div>
                <h1 className="text-4xl font-bold font-special hidden xl:block " data-theme={isDarkMode ? 'dark' : 'light'}>
                    Recipe Dream
                </h1>
                <NavBar />
                <div className="flex gap-4 items-center mr-4">
                    {isAuthenticated ? (
                        <SignButton name="Logout" variant="logout" />
                    ) : (
                        <>
                            <SignButton name="Login" variant="login" />
                            <SignButton name="Register" variant="register" />
                        </>
                    )}
                    <Button
                        className="flex items-center justify-center bg-yellow-500 text-black w-12 h-12 m-0 rounded-full hover:bg-yellow-600 transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none"
                        onClick={handleThemeToggle}
                        icon={isDarkMode ? <FaSun /> : <FaMoon />}
                    >
                        {' '}
                    </Button>
                </div>
            </Header>

            <Main className="container mt-20 m-auto flex justify-center items-center flex-col gap-4">
                <ExplorerContainer />
            </Main>
        </Container>
    )
}

export default HomePage
