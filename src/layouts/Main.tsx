interface MainProps {
    children: React.ReactNode
    className?: string
}
const Main: React.FC<MainProps> = ({ children, className }) => {
    return <main className={className}>{children}</main>
}

export default Main
