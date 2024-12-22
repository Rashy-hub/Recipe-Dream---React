import { createContext, useContext, useState, ReactNode, useEffect } from 'react'
import { useMutation } from '@tanstack/react-query'
import fetchAuth from '../services/fetchAuth'
import { User, LoginResponse, LoginFormData } from '../schemas/userSchema'

interface AuthContextType {
    isAuthenticated: boolean
    authUser: User | null
    login: (formData: LoginFormData, options?: object) => void
    loginAsync: (formData: LoginFormData) => Promise<void>
    logout: () => void
    isLogout: boolean
    logoutError: boolean
    isLogin: boolean
    loginError: boolean
    error: Error | null
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}

interface AuthProviderProps {
    children: ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps): JSX.Element => {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [authUser, setAuthUser] = useState<User | null>(null)

    useEffect(() => {
        const isAuthenticatedFromStorage = sessionStorage.getItem('authToken') ? true : false
        setIsAuthenticated(isAuthenticatedFromStorage)
    }, [isAuthenticated])

    const {
        mutate: login,
        isPending: isLogin,
        isError: loginError,
        error,
    } = useMutation<LoginResponse, Error, LoginFormData>({
        mutationFn: fetchAuth.login,
        onMutate: async (data: LoginFormData) => {
            console.log('Logging in:', data)
        },
        onSuccess: async (data: LoginResponse) => {
            if (data.data?.user) {
                const token = data.token
                if (token) {
                    sessionStorage.setItem('authToken', token)
                }
                setAuthUser(data.data.user)
                setIsAuthenticated(true)
            }
        },
        onError: (error: Error) => {
            console.error('Login failed:', error.message)
        },
    })

    const loginAsync = (formData: LoginFormData): Promise<void> => {
        return new Promise((resolve, reject) => {
            login(formData, {
                onSuccess: (data: LoginResponse) => {
                    console.log('Login successful:', data)
                    resolve()
                },
                onError: (error: Error) => {
                    reject(error)
                },
            })
        })
    }

    const {
        mutate: logout,
        isPending: isLogout,
        isError: logoutError,
    } = useMutation({
        mutationFn: fetchAuth.logout,
        onSuccess: () => {
            sessionStorage.removeItem('authToken')
            setIsAuthenticated(false)
            setAuthUser(null)
        },
        onError: (error: Error) => {
            console.error('Logout failed:', error.message)
        },
    })

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated,
                authUser,
                login,
                loginAsync,
                logout,
                isLogout,
                logoutError,
                isLogin,
                loginError,
                error,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}
