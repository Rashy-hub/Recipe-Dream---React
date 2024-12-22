interface ContainerProps {
    children: React.ReactNode
    className?: string
    dataTheme?: string
}

const Container: React.FC<ContainerProps> = ({ children, className, dataTheme }) => {
    return (
        <div className={className} data-theme={dataTheme}>
            {children}
        </div>
    )
}

export default Container
