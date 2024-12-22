import React, { useEffect } from 'react'
import Container from '../layouts/Container'
import useDarkTheme from '../stores/themeStore'
import Header from '../layouts/Header'
import Logo from '../components/Logo'
import Main from '../layouts/Main'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import FormInput from '../components/FormInput'
import { LoginFormData, LoginSchema } from '../schemas/userSchema'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router'
import Button from '../components/ui/Button'
import { FaArrowLeft, FaMoon, FaSun } from 'react-icons/fa'
import SignButton from '../components/ui/SignButton'

const LoginPage: React.FC = () => {
    const { isDarkMode, toggleDarkMode } = useDarkTheme()
    const { isAuthenticated, loginAsync, loginError, error } = useAuth()
    const navigate = useNavigate()

    const methods = useForm<LoginFormData>({ resolver: zodResolver(LoginSchema) })

    const { handleSubmit, setError } = methods

    const onSubmit = async (formData: LoginFormData) => {
        try {
            await loginAsync(formData)
            navigate('/app/dashboard')
        } catch (error) {
            const parsedError = JSON.parse((error as Error).message)
            setError('email', {
                type: 'server',
                message: parsedError.error || 'Something went wrong , please try again.',
            })
        }
    }
    const handleThemeToggle = () => {
        toggleDarkMode()
    }

    useEffect(() => {
        if (isAuthenticated) navigate('/app')
    }, [isAuthenticated, navigate])

    if (loginError) {
        navigate(`/app/error/${error}`)
    }
    return (
        <Container className={`body-bg`} dataTheme={isDarkMode ? 'dark' : 'light'}>
            {' '}
            <Header className="w-screen h-fit flex flex-row justify-between items-center bg-transparent text-neutral-100 border-b-[1px] border-neutral-100 p-4 sticky top-0">
                <div className="flex items-center gap-2 ml-2">
                    <Logo />
                </div>
                <div className="flex gap-4 items-center mr-4">
                    <SignButton name="Register" variant="register" />

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
                <FormProvider {...methods}>
                    <form onSubmit={handleSubmit(onSubmit)} className="form-style">
                        <h2 className="text-2xl font-bold mb-4 ">Login</h2>

                        <FormInput label="E-mail" name="email" placeholder="bobdoe@gmail.com" type="email" defaultValue="bobdoe@gmail.com" />
                        <FormInput label="Password" name="password" placeholder="Test123+" type="password" defaultValue="Test123+" />

                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-neutral-100 py-2 rounded hover:bg-blue-600 transition mt-2 disabled:bg-slate-500 "
                        >
                            Login
                        </button>
                        <p className="mt-4 text-sm text-gray-600">
                            Not registred yet ?{' '}
                            <a href="/app/register" className="text-blue-500 hover:underline">
                                Sign up
                            </a>
                        </p>
                    </form>
                </FormProvider>

                <Button
                    className="flex items-center justify-center bg-yellow-500 text-black w-24 h-fit m-0 rounded-lg hover:bg-yellow-600 transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none"
                    onClick={() => navigate('/app/home')}
                    icon={<FaArrowLeft />}
                >
                    Go back
                </Button>
            </Main>
        </Container>
    )
}

export default LoginPage
