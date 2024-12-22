import ClipLoader from 'react-spinners/ClipLoader'

interface LoaderProps {
    loading: boolean
}
const override = {
    display: 'block',
    margin: '0 auto',
    borderColor: 'green',
}
const Loader: React.FC<LoaderProps> = ({ loading }) => {
    return (
        <div className="flex justify-center items-start h-[20%] ">
            {/* <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div> */}
            <ClipLoader loading={loading} cssOverride={override} size={150} aria-label="Loading Spinner" data-testid="loader" />
        </div>
    )
}

export default Loader
