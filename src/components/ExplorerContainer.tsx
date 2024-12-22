import React, { useEffect, useState } from 'react'
import { useMutation, useQuery } from '@tanstack/react-query'

import SearchBar from './SearchBar'
import fetchSpoonacular from '../services/fetchSpoonacular'
import ExplorerCard from './ExplorerCard'
import { useNavigate } from 'react-router'
import { ExplorerRecipe } from '../schemas/explorerSchema'
import Modal from 'react-modal'
import fetchRecipes from '../services/fetchRecipes'
import { Recipe } from '../schemas/recipeSchema'

const ExplorerContainer: React.FC = () => {
    const navigate = useNavigate()
    const [recipes, setRecipes] = useState<ExplorerRecipe[]>([])
    const [searchQuery, setSearchQuery] = useState('')
    const [offset, setOffset] = React.useState(0)
    const [maxResults, setMaxResults] = React.useState(0)
    const [isOpen, setIsOpen] = useState(false)
    const [modalRecipe, setModalRecipe] = useState<ExplorerRecipe>({} as ExplorerRecipe)

    const { data, isError, error } = useQuery({
        queryKey: ['explorers', offset, searchQuery],
        queryFn: () => fetchSpoonacular.getRecipes({ query: searchQuery, offset }),
    })

    const { mutate: addRecipe } = useMutation({
        mutationKey: ['addRecipe'],
        mutationFn: (recipe: Recipe) => fetchRecipes.postExplorer(recipe),
        onSuccess: () => {
            alert('Recipe added to your recipes!')
        },
        onError: (mutationError) => {
            console.error('Error while adding recipe:', mutationError)
        },
    })

    const addRecipeToMyRecipes = (recipe: ExplorerRecipe, liked: boolean) => {
        if (liked) {
            //Here I mutate the API

            addRecipe({
                title: recipe.title,
                cover_image: { url: recipe.image },
                description: recipe.summary,
                readyInMinutes: recipe.readyInMinutes || '0',
                servings: recipe.servings,
                _id: recipe.spoonacularId,
                extendedIngredients: recipe.extendedIngredients,
            })
        } else {
            alert("DOn't forget to delete the recipe if you don't like it")
        }
    }

    useEffect(() => {
        if (data === undefined) return
        setRecipes(data.results)
        setMaxResults(data.totalResults)
    }, [data])

    const openModal = (recipe) => {
        setModalRecipe(recipe)
        setIsOpen(true)
    }

    const closeModal = () => setIsOpen(false)

    const handleSearch = (query: string) => {
        setSearchQuery(query)
    }

    if (isError) {
        navigate(`/app/error/${error.message}`)
    }

    return (
        <div className="w-full p-4 ">
            <p className="text-center p-4 font-special">⚠️ The API limits the number of results to 150 per day ⚠️</p>
            <Modal
                isOpen={isOpen}
                onRequestClose={closeModal}
                contentLabel="Recipe Details"
                className="fixed  m-auto inset-0 flex justify-start items-center bg-opacity-1 bg-white flex-col  h-4/5 w-4/5 p-12 rounded-xl"
                overlayClassName="fixed inset-0 bg-black bg-opacity-50"
            >
                <h2 className="text-4xl font-bold mb-4 text-stone-800">{modalRecipe.title}</h2>
                <div className="flex flex-row justify-between items-center border-2 h-full">
                    <div className="w-1/2 text-justify flex flex-col justify-center items-center bg-gray-500 h-full">
                        <h3 className="text-3xl font-bold">Ingredients</h3>
                        <ul className="p-4 font-special text-lg ">
                            {modalRecipe.extendedIngredients?.map((ingredient) => {
                                return <li key={ingredient.id}>{ingredient.original}</li>
                            })}
                        </ul>
                    </div>

                    <div className="flex flex-col w-1/2 gap-4 bg-pink-200 h-full">
                        <div className=" border-2 rounded-2xl w-fit left-0">
                            <img src={modalRecipe.image} className=" " />
                        </div>
                        <p
                            className="font-special p-4"
                            dangerouslySetInnerHTML={{
                                __html: modalRecipe.summary,
                            }}
                        ></p>
                    </div>
                </div>

                <button onClick={closeModal} className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg absolute bottom-0 mb-2">
                    Close
                </button>
            </Modal>
            <SearchBar onSearch={handleSearch} />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-10">
                {recipes.map((recipe: ExplorerRecipe) => (
                    <ExplorerCard
                        key={recipe.spoonacularId}
                        recipe={recipe}
                        onAddRecipe={(liked) => addRecipeToMyRecipes(recipe, liked)}
                        onOpenModal={() => openModal(recipe)}
                    />
                ))}
            </div>
            <div className="flex justify-center items-center gap-4 mt-4">
                {' '}
                <button
                    className="w-fit h-fit disabled:opacity-50 border border-orange-600 rounded-2xl bg-amber-500 p-4"
                    onClick={() => setOffset((old) => old - 12)}
                    disabled={offset === 0}
                >
                    Previous
                </button>{' '}
                <button
                    className="w-fit h-fit disabled:opacity-50 border border-orange-600 rounded-2xl bg-amber-500 p-4"
                    onClick={() => {
                        if (recipes && maxResults > offset) {
                            setOffset((old) => old + 12)
                        }
                    }}
                    disabled={!recipes || maxResults <= offset + 12}
                >
                    Next
                </button>
            </div>
        </div>
    )
}

export default ExplorerContainer
