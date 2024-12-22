import React from 'react'
import { Recipe } from '../schemas/recipeSchema'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import fetchRecipes from '../services/fetchRecipes'
import { FaCheckCircle, FaClock, FaUsers } from 'react-icons/fa'
import { ExplorerIngredient } from '../schemas/explorerSchema'

interface RecipeCardProps {
    recipe: Recipe
    onOpenModal: (recipe: Recipe) => void
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, onOpenModal }) => {
    const queryClient = useQueryClient()
    const { mutate: deleteRecipe } = useMutation({
        mutationKey: ['deleteRecipe'],
        mutationFn: (id: string) => fetchRecipes.deleteRecipes(id),
        onSuccess: () => {
            queryClient.invalidateQueries(['recipes'])
        },
        onError: (mutationError) => {
            console.error('Error while deleting recipe:', mutationError)
        },
    })

    const deleteRecipeHandler = (id: string) => {
        deleteRecipe(id)
    }

    return (
        <div className="relative max-w-sm rounded overflow-hidden shadow-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
            <img className="w-full h-48 object-cover" src={recipe.cover_image.url} alt={recipe.title} />
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2 text-gray-900 dark:text-gray-100">{recipe.title.slice(0, 40)}</div>
                <p className="text-gray-700 text-sm font-bold m-1 inline">
                    <FaClock className="inline mr-1" /> {recipe.readyInMinutes} minutes
                </p>
                <p className="text-gray-700 text-sm m-1 inline font-bold  ">
                    <FaUsers className="inline mr-1" /> {recipe.servings} people{' '}
                </p>
            </div>
            <div className="px-6 pt-4 pb-2">
                <ul className="space-y-2 mt-4">
                    {recipe.extendedIngredients?.slice(0, 5).map((ingredient: ExplorerIngredient, index) => (
                        <li key={index} className="flex items-center gap-2 text-gray-700 text-sm">
                            <FaCheckCircle className="text-amber-500" />
                            <span className="font-special bg-gray-100 px-2 py-1 rounded-full">{ingredient.original}</span>
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
            </div>
            <button
                onClick={() => deleteRecipeHandler(recipe._id)}
                className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition"
                aria-label="Delete Recipe"
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M9 7h6m-7 0a2 2 0 00-2 2h12a2 2 0 00-2-2M9 7V5a2 2 0 012-2h2a2 2 0 012 2v2"
                    />
                </svg>
            </button>
        </div>
    )
}

export default RecipeCard
