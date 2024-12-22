import { Navigate, Outlet } from 'react-router'
import Loader from '../ux/Loader'
import { useAuth } from '../../contexts/AuthContext'

interface ProtectedRouteProps {
    element?: React.ReactNode
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = () => {
    const { isLogin, isAuthenticated } = useAuth()

    if (isLogin) {
        return (
            <div className="w-20 h-screen container border-2 border-x-red-400">
                <Loader loading={isLogin} />
            </div>
        )
    }

    return isAuthenticated ? <Outlet /> : <Navigate to="/app/login" replace />
}

export default ProtectedRoute
