import React from 'react'
import { useNavigate, useParams } from 'react-router'
import Button from '../components/ui/Button'
import Header from '../layouts/Header'
import Main from '../layouts/Main'
import { FaArrowLeft } from 'react-icons/fa'
import useDarkTheme from '../stores/themeStore'
import Logo from '../components/Logo'
import Container from '../layouts/Container'

const ErrorPage: React.FC = () => {
    const navigate = useNavigate()
    const { message } = useParams()
    const { isDarkMode } = useDarkTheme()
    return (
        <Container className="body-bg border-2 border-green-400" dataTheme={isDarkMode ? 'dark' : 'light'}>
            {' '}
            <Header className="w-screen h-fit flex flex-row justify-between items-center bg-transparent text-neutral-100 border-b-[1px] border-neutral-100 p-4 sticky top-0">
                <div className="flex items-center gap-2 ml-2">
                    <Logo />
                </div>
                <div className="flex-1 flex justify-center">
                    <h2 className="text-4xl font-bold font-special hidden xl:block " data-theme={isDarkMode ? 'dark' : 'light'}>
                        Recipe Dream
                    </h2>
                </div>
            </Header>
            <Main className="container mt-20 m-auto flex justify-center items-center flex-col gap-4">
                <h3 className="text-4xl text-amber-500 font-extrabold m-4">SOMETHING WENT WRONG</h3>
                <p className="font-special font-2xl ">{message ? `${message}` : ' path does not exist'}</p>
                <Button
                    className="flex items-center justify-center bg-yellow-500 text-black w-24 h-fit m-0 rounded-lg hover:bg-yellow-600 transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none"
                    onClick={() => navigate('/app')}
                    icon={<FaArrowLeft />}
                >
                    Go back
                </Button>
            </Main>
        </Container>
    )
}

export default ErrorPage
