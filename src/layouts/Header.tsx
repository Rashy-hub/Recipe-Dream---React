import React from 'react'
interface PropsType {
    children?: React.ReactNode
    className: string
}
const Header: React.FC<PropsType> = ({ children, className }) => {
    return <header className={className}>{children}</header>
}

export default Header
