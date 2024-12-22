import React, { useState } from 'react'
import Container from '../layouts/Container'
import Header from '../layouts/Header'
import Main from '../layouts/Main'

import useDarkTheme from '../stores/themeStore'
import Logo from '../components/Logo'
import NavBar from '../components/Navbar'
import SignButton from '../components/ui/SignButton'
import Button from '../components/ui/Button'
import { FaMoon, FaSun } from 'react-icons/fa'
import { useAuth } from '../contexts/AuthContext'
import { useMutation, useQuery } from '@tanstack/react-query'
import fetchRecipes from '../services/fetchRecipes'
import RecipeCard from '../components/RecipeCard'
import Modal from 'react-modal'
import { Recipe } from '../schemas/recipeSchema'
import RecipeForm from '../components/RecipeForm'

const DashBoardPage: React.FC = () => {
    const { isDarkMode, toggleDarkMode } = useDarkTheme()
    const { isAuthenticated } = useAuth()

    const [isOpen, setIsOpen] = useState(false)
    const [modalRecipe, setModalRecipe] = useState<Recipe>({} as Recipe)

    const [isFormVisible, setIsFormVisible] = useState(false)

    const toggleFormVisibility = () => {
        setIsFormVisible(!isFormVisible)
    }

    const { data, isError, error, isLoading } = useQuery({
        queryKey: ['recipes'],
        queryFn: () => fetchRecipes.getRecipes(),
    })

    const { mutate: addRecipe } = useMutation({
        mutationKey: ['addRecipe'],
        mutationFn: (recipe: {
            title: string
            description: string
            readyInMinutes: string
            servings: string
            coverPicture: FileList | null

            extendedIngredients: {
                name: string
                amount: string
                unit: string
                original: string
            }[]
            cover_image: {
                public_id: string
                url: string
            }
            ingredients: {
                name: string
                amount: string
                unit: string
            }[]
        }) => fetchRecipes.postRecipe(recipe),
        onSuccess: () => {
            alert('Recipe added to your recipes!')
        },
        onError: (mutationError) => {
            console.error('Error while adding recipe:', mutationError)
        },
    })

    const addRecipeToMyRecipes = (recipe) => {
        //Here I mutate the API
        console.log('DATA FROM THE FORM')
        console.log(JSON.stringify(recipe, null, 2))
        console.log('END DATA FROM THE FORM')
        addRecipe(recipe)
    }

    const handleThemeToggle = () => {
        toggleDarkMode()
    }

    const openModal = (recipe) => {
        setModalRecipe(recipe)
        setIsOpen(true)
    }

    const closeModal = () => setIsOpen(false)

    return (
        <Container className="body-bg border-2 border-green-400" dataTheme={isDarkMode ? 'dark' : 'light'}>
            <Header className="w-screen h-fit flex flex-row justify-between items-center bg-transparent text-neutral-100 border-b-[1px] border-neutral-100 p-4 sticky top-0">
                <div className="flex items-center gap-2 ml-2">
                    <Logo />
                </div>
                <h1 className="text-4xl font-bold font-special hidden xl:block " data-theme={isDarkMode ? 'dark' : 'light'}>
                    Recipe Dream
                </h1>

                <NavBar />
                <div className="flex gap-4 items-center mr-4">
                    {isAuthenticated ? (
                        <SignButton name="Logout" variant="logout" />
                    ) : (
                        <>
                            <SignButton name="Login" variant="login" />
                            <SignButton name="Register" variant="register" />
                        </>
                    )}
                    <Button
                        className="flex items-center justify-center bg-yellow-500 text-black w-12 h-12 m-0 rounded-full hover:bg-yellow-600 transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none"
                        onClick={handleThemeToggle}
                        icon={isDarkMode ? <FaSun /> : <FaMoon />}
                    >
                        {''}
                    </Button>
                </div>
            </Header>

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
                            <img src={modalRecipe.cover_image?.url} className=" " />
                        </div>
                        <p
                            className="font-special p-4"
                            dangerouslySetInnerHTML={{
                                __html: modalRecipe.description,
                            }}
                        ></p>
                    </div>
                </div>

                <button onClick={closeModal} className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg absolute bottom-0 mb-2">
                    Close
                </button>
            </Modal>

            <Main className="container mt-20 m-auto flex justify-center items-center flex-col gap-4">
                <div className="flex justify-between items-center mb-6">
                    <button onClick={toggleFormVisibility} className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600 transition">
                        {isFormVisible ? 'Hide Recipe Form' : 'Add Recipe'}
                    </button>
                </div>
                {isFormVisible && (
                    <div className="mb-6 transition-all duration-300">
                        <RecipeForm addRecipeToMyRecipes={(recipe) => addRecipeToMyRecipes(recipe)} />
                    </div>
                )}
                {isLoading && <p>Loading...</p>}
                {isError && <p>Error: {error?.message || 'Something went wrong!'}</p>}
                {data?.data?.recipes && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {data.data.recipes.map((recipe) => (
                            <RecipeCard key={recipe._id} recipe={recipe} onOpenModal={() => openModal(recipe)} />
                        ))}
                    </div>
                )}
            </Main>
        </Container>
    )
}

export default DashBoardPage
