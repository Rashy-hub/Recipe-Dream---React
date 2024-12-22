import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter, Route, Routes } from 'react-router'
import HomePage from './pages/HomePage.tsx'
import LoginPage from './pages/LoginPage.tsx'
import RegisterPage from './pages/RegisterPage.tsx'
import { AuthProvider } from './contexts/AuthContext.tsx'
import ProtectedRoute from './components/spec/ProtectedRoute.tsx'
import ErrorPage from './pages/ErrorPage.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import DashBoardPage from './pages/DashBoardPage.tsx'
const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
    <QueryClientProvider client={queryClient}>
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    {/* Public Routes */}

                    <Route path="/" element={<HomePage />} />

                    <Route path="/app/login" element={<LoginPage />} />
                    <Route path="/app/register" element={<RegisterPage />} />
                    <Route path="/app/home" element={<HomePage />} />
                    {/* Protected Routes */}
                    <Route element={<ProtectedRoute />}>
                        <Route path="/app" element={<App />} />
                        <Route path="/app/dashboard" element={<DashBoardPage />} />
                    </Route>

                    {/* Error Routes */}
                    <Route path="/app/error/:message" element={<ErrorPage />} />
                    <Route path="*" element={<ErrorPage />} />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    </QueryClientProvider>
)
