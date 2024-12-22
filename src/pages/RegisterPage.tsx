import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'
import fetchAuth from '../services/fetchAuth'
import Loader from '../components/ux/Loader'
import { useMutation } from '@tanstack/react-query'
import Header from '../layouts/Header'
import Main from '../layouts/Main'

import { RegisterFormData, RegisterResponse, RegisterSchema } from '../schemas/userSchema'
import useDarkTheme from '../stores/themeStore'
import FormInput from '../components/FormInput'
import Container from '../layouts/Container'
import Logo from '../components/Logo'
import Button from '../components/ui/Button'
import { FaArrowLeft, FaMoon, FaSun } from 'react-icons/fa'
import SignButton from '../components/ui/SignButton'
import { zodResolver } from '@hookform/resolvers/zod'

const RegisterPage: React.FC = () => {
    const methods = useForm<RegisterFormData>({ resolver: zodResolver(RegisterSchema) })
    const navigate = useNavigate()
    const { handleSubmit, setError } = methods
    const { isDarkMode: darkMode, toggleDarkMode } = useDarkTheme()
    const mutation = useMutation({
        mutationFn: fetchAuth.register,
        onSuccess: (data: RegisterResponse) => {
            navigate('/app/login')
        },
    })

    const onSubmit = (data: RegisterFormData) => {
        if (data.password !== data.confirmPassword) {
            setError('confirmPassword', {
                type: 'validate',
                message: 'Passwords do not match',
            })
            return
        }

        mutation.mutate({
            username: data.username,
            email: data.email,
            password: data.password,
        })
    }

    if (mutation.isPending) return <Loader loading={mutation.isPending} />

    return (
        <Container className={`body-bg`} dataTheme={darkMode ? 'dark' : 'light'}>
            {' '}
            <Header className="w-screen h-fit flex flex-row justify-between items-center bg-transparent text-neutral-100 border-b-[1px] border-neutral-100 p-4 sticky top-0">
                <div className="flex items-center gap-2 ml-2">
                    <Logo />
                </div>
                <div className="flex gap-4 items-center mr-4">
                    <SignButton name="Login" variant="login" />

                    <Button
                        className="flex items-center justify-center bg-yellow-500 text-black w-12 h-12 m-0 rounded-full hover:bg-yellow-600 transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none"
                        onClick={toggleDarkMode}
                        icon={darkMode ? <FaSun /> : <FaMoon />}
                    >
                        {' '}
                    </Button>
                </div>
            </Header>
            <Main className="container mt-20 m-auto flex justify-center items-center flex-col gap-4">
                <FormProvider {...methods}>
                    <form onSubmit={handleSubmit(onSubmit)} className="form-style">
                        <h2 className="text-2xl font-bold mb-4">Register</h2>
                        {mutation.error && (
                            <div className="bg-red-100 text-red-600 p-2 rounded mb-4">
                                {(mutation.error as Error).message || 'An error occurred during registration'}
                            </div>
                        )}

                        <FormInput label="User Name" name="username" placeholder="Enter your user name" />
                        <FormInput label="E-mail" name="email" placeholder="Enter your email" />
                        <FormInput label="Password" name="password" placeholder="Enter your password" type="password" />
                        <FormInput label="Confirm Password" name="confirmPassword" placeholder="Confirm your password" type="password" />

                        {methods.formState.errors.confirmPassword && (
                            <p className="text-red-600 text-sm">{methods.formState.errors.confirmPassword?.message}</p>
                        )}

                        <button type="submit" className="w-full bg-blue-500 text-neutral-100 py-2 rounded hover:bg-blue-600 transition mt-2">
                            Register
                        </button>
                        <p className="mt-4 text-sm text-gray-600">
                            Already have an account?{' '}
                            <a href="/app/login" className="text-blue-500 hover:underline">
                                Log in
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

export default RegisterPage
