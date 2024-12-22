import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'
import { FaCheckCircle, FaClock, FaUsers } from 'react-icons/fa'

import { useState } from 'react'
import Loader from './ux/Loader'
import { useAuth } from '../contexts/AuthContext'
import { ExplorerIngredient, ExplorerRecipe } from '../schemas/explorerSchema'

interface ExplorerCardProps {
    recipe: ExplorerRecipe
    onAddRecipe: (liked: boolean) => void
    onOpenModal: (recipe: ExplorerRecipe) => void
}

const ExplorerCard: React.FC<ExplorerCardProps> = ({ recipe, onAddRecipe, onOpenModal }) => {
    const [liked, setLiked] = useState(false)
    const [isImageLoaded, setIsImageLoaded] = useState(false)
    const { isAuthenticated } = useAuth()

    const toggleLike = () => {
        setLiked(!liked)
        onAddRecipe(!liked)
    }

    const handleImageLoad = () => {
        setIsImageLoaded(true)
    }

    const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
        if (e.target instanceof HTMLImageElement && !e.target.dataset.errorHandled) {
            e.target.src = '/recipe.png'
            e.target.dataset.errorHandled = 'true'
        }
    }

    return (
        <div className="bg-white rounded-lg border border-gray-200 shadow-lg overflow-hidden transform transition-transform hover:scale-105 relative h-[600px]">
            <div className="relative w-full h-48 bg-gray-200 flex items-center justify-center">
                {!isImageLoaded && <Loader loading={!isImageLoaded} />}
                <img
                    src={recipe.image}
                    alt={recipe.title}
                    className={`w-full h-48 object-cover rounded-t-lg transition-opacity duration-500 ${isImageLoaded ? 'opacity-100' : 'opacity-0'}`}
                    onLoad={handleImageLoad}
                    onError={handleImageError}
                    loading="lazy"
                />
            </div>
            <div className="p-6  border-2 bg-slate-200 ">
                <h2 className="text-xl font-semibold font-special text-gray-900 mb-2">{recipe.title.slice(0, 40)}</h2>
                <p className="text-gray-700 text-sm font-bold m-1 inline">
                    <FaClock className="inline mr-1" /> {recipe.readyInMinutes} minutes
                </p>
                <p className="text-gray-700 text-sm m-1 inline font-bold  ">
                    <FaUsers className="inline mr-1" /> {recipe.servings} people{' '}
                </p>
                <ul className="space-y-2 mt-4">
                    {recipe.extendedIngredients
                        ?.slice(0, 5) // Limite à 5 ingrédients
                        .map((ingredient: ExplorerIngredient) => (
                            <li key={ingredient.id} className="flex items-center gap-2 text-gray-700 text-sm">
                                <FaCheckCircle className="text-amber-500" />
                                <span className="font-special bg-gray-100 px-2 py-1 rounded-full">{ingredient.original.slice(0, 51)}</span>
                            </li>
                        ))}
                    {recipe.extendedIngredients && recipe.extendedIngredients.length > 5 && (
                        <li className="text-gray-500 text-sm italic">...and more</li>
                    )}
                </ul>
                <button
                    onClick={() => onOpenModal(recipe)}
                    className="text-blue-100  hover:text-blue-700 transition-colors absolute bottom-0 right-0 bg-amber-500 p-2 rounded-full shadow-lg hover:shadow-md hover:-translate-y-1 m-2"
                >
                    Read More
                </button>
                {isAuthenticated && (
                    <button
                        onClick={toggleLike}
                        className="absolute top-4 right-4 bg-white text-red-500 p-2 rounded-full shadow-lg hover:text-red-700 hover:bg-gray-100 transition-transform transform hover:scale-110"
                    >
                        {liked ? <AiFillHeart className="w-6 h-6" /> : <AiOutlineHeart className="w-6 h-6" />}
                    </button>
                )}
            </div>
        </div>
    )
}

export default ExplorerCard
