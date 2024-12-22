import classNames from 'classnames'
import { useNavigate } from 'react-router'
import { useAuth } from '../../contexts/AuthContext'

interface SignButtonProps {
    name: string
    variant: 'login' | 'register' | 'logout'
}

const SignButton: React.FC<SignButtonProps> = ({ name, variant }) => {
    const { logout } = useAuth()
    const navigate = useNavigate()

    const baseStyles =
        'px-6 py-2 font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-300 ease-in-out transform'

    /*     const variantStyles: Record<SignButtonProps['variant'], string> = {
        login: 'bg-blue-500 text-white hover:bg-blue-600 hover:shadow-lg focus:ring-blue-400 hover:-translate-y-1',
        register:
            'bg-white text-blue-500 border-2 border-blue-500 hover:bg-blue-500 hover:text-white focus:ring-blue-500 hover:shadow-md hover:-translate-y-1',
        logout: 'bg-red-500 text-white hover:bg-red-600 focus:ring-red-400 hover:-translate-y-1',
    }
 */
    const variantStyles: Record<SignButtonProps['variant'], string> = {
        login: 'bg-amber-500 text-white hover:bg-amber-600 focus:ring-amber-400 shadow-md hover:shadow-lg hover:-translate-y-1',
        register:
            'bg-white text-amber-500 border-2 border-amber-500 hover:bg-amber-500 hover:text-white focus:ring-amber-400 shadow-md hover:shadow-lg hover:-translate-y-1',
        logout: 'bg-red-500 text-white hover:bg-red-600 focus:ring-red-400 shadow-md hover:shadow-lg hover:-translate-y-1',
    }

    const handleClick = async () => {
        if (variant === 'login') {
            navigate('/app/login')
        } else if (variant === 'register') {
            navigate('/app/register')
        } else if (variant === 'logout') {
            try {
                logout()
            } catch (error) {
                console.error('Logout failed:', error)
            }
        }
    }

    return (
        <button className={classNames(baseStyles, variantStyles[variant])} onClick={handleClick}>
            {name}
        </button>
    )
}

export default SignButton
