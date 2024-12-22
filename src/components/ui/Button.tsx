import { ReactNode } from 'react'
import React from 'react'

interface ButtonProps {
    onClick: () => void
    icon?: ReactNode
    children: ReactNode
    className?: string
}

const Button: React.FC<ButtonProps> = ({ onClick, icon, children, className }) => {
    return (
        <button type="button" onClick={onClick} className={className}>
            {icon && <span className="text-xl">{icon}</span>}
            {children}
        </button>
    )
}
export default Button
