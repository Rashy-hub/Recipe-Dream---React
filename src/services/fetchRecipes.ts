import { Recipe } from '../schemas/recipeSchema'
import urlBuilder from '../utils/urlBuilder'

const fetchRecipes = {
    getRecipes: async () => {
        try {
            const token = sessionStorage.getItem('authToken')
            if (!token) {
                throw new Error('No authentication token found in sessionStorage.')
            }

            const baseUrl = import.meta.env.VITE_BASE_URL
            if (!baseUrl) {
                throw new Error('Base URL is undefined. Check your environment variables.')
            }

            const buildedURL = urlBuilder({
                baseURL: baseUrl,
                endpoint: '/recipe',
            })
            if (!buildedURL) {
                throw new Error('URL building failed.')
            }

            const response = await fetch(buildedURL, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            })

            if (!response.ok) {
                const errorText = await response.text()
                if (response.status === 404) {
                    throw new Error('Endpoint not found (404): ' + errorText)
                } else if (response.status === 500) {
                    throw new Error('Internal Server Error (500): ' + errorText)
                } else {
                    throw new Error(`Error: ${response.status} - ${errorText}`)
                }
            }

            const data = await response.json()

            return data
        } catch (error) {
            console.error('Error in fetchRecipes.getRecipes:', error)
            throw new Error((error as Error).message)
        }
    },
    /*     {
        "title": "Coucous",
        "description": "super couscous de mamie",
        "coverPicture": {
            "0": {}
        },
        "servings": "2",
        "readyInMinutes": "60",
        "extendedIngredients": [
            {
                "name": "Oeufs",
                "amount": "2",
                "unit": "unité",
                "original": "2 cuillére à soupe de soupe"
            }
        ],
        "cover_image": {
            "public_id": "",
            "url": ""
        },
        "ingredients": [
            {
                "name": "Oeufs",
                "amount": "2",
                "unit": "unité"
            }
        ]
    } */
    /*{
    title: string;
    description: string;
    coverPicture: Record<string, object>; // Index signature avec une clé de type string et une valeur de type object
    servings: string; // Nombre de portions, représenté ici comme une chaîne
    readyInMinutes: string; // Temps de préparation, en minutes, représenté ici comme une chaîne
    extendedIngredients: {
        name: string;
        amount: string;
        unit: string;
        original: string; // Description complète de l'ingrédient
    }[];
    cover_image: {
        public_id: string;
        url: string;
    };
    ingredients: {
        name: string;
        amount: string;
        unit: string;
    }[];
} */
    postRecipe: async (recipeData: {
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
    }) => {
        try {
            const token = sessionStorage.getItem('authToken')
            if (!token) {
                throw new Error('No authentication token found in sessionStorage.')
            }

            const baseUrl = import.meta.env.VITE_BASE_URL
            if (!baseUrl) {
                throw new Error('Base URL is undefined. Check your environment variables.')
            }

            const buildedURL = urlBuilder({
                baseURL: baseUrl,
                endpoint: '/recipe',
            })

            const formData = new FormData()
            formData.append('title', recipeData.title)
            formData.append('description', recipeData.description)
            //formData.append('coverPicture', recipeData.coverPicture)
            if (recipeData.coverPicture) formData.append('coverPicture', recipeData.coverPicture[0]) // Ajoutez le fichier à l'objet FormData
            formData.append('readyInMinutes', recipeData.readyInMinutes)
            formData.append('servings', recipeData.servings)

            recipeData.extendedIngredients.forEach((ingredient, index) => {
                formData.append(`extendedIngredients[${index}][name]`, ingredient.name)
                formData.append(`extendedIngredients[${index}][original]`, ingredient.original)
                formData.append(`extendedIngredients[${index}][unit]`, ingredient.unit)
                formData.append(`extendedIngredients[${index}][amount]`, ingredient.amount)
            })

            const response = await fetch(buildedURL, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            })

            if (!response.ok) {
                const errorText = await response.text()
                if (response.status === 404) {
                    throw new Error('Endpoint not found (404): ' + errorText)
                } else if (response.status === 500) {
                    throw new Error('Internal Server Error (500): ' + errorText)
                } else {
                    throw new Error(`Error: ${response.status} - ${errorText}`)
                }
            }

            const data = await response.json()

            return data
        } catch (error) {
            console.error('Error in fetchRecipes.postRecipe:', error)
            throw new Error((error as Error).message)
        }
    },

    deleteRecipes: async (recipeId: string) => {
        try {
            const token = sessionStorage.getItem('authToken')
            if (!token) {
                throw new Error('No authentication token found in sessionStorage.')
            }

            const baseUrl = import.meta.env.VITE_BASE_URL
            if (!baseUrl) {
                throw new Error('Base URL is undefined. Check your environment variables.')
            }

            const buildedURL = urlBuilder({
                baseURL: baseUrl,
                endpoint: `/recipe/${recipeId}`,
            })

            const response = await fetch(buildedURL, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })

            if (!response.ok) {
                const errorText = await response.text()
                if (response.status === 404) {
                    throw new Error('Endpoint not found (404): ' + errorText)
                } else if (response.status === 500) {
                    throw new Error('Internal Server Error (500): ' + errorText)
                } else {
                    throw new Error(`Error: ${response.status} - ${errorText}`)
                }
            }

            const data = await response.json()

            return data
        } catch (error) {
            console.error('Error in fetchRecipes.deleteRecipes:', error)
            throw new Error((error as Error).message)
        }
    },

    postExplorer: async (recipeData: Recipe) => {
        try {
            const token = sessionStorage.getItem('authToken')
            if (!token) {
                throw new Error('No authentication token found in sessionStorage.')
            }

            const baseUrl = import.meta.env.VITE_BASE_URL
            if (!baseUrl) {
                throw new Error('Base URL is undefined. Check your environment variables.')
            }

            const buildedURL = urlBuilder({
                baseURL: baseUrl,
                endpoint: '/recipe',
            })

            const formData = new FormData()
            formData.append('title', recipeData.title)
            formData.append('description', recipeData.description)
            formData.append('readyInMinutes', recipeData.readyInMinutes)
            formData.append('servings', recipeData.servings)
            formData.append('cover_image[url]', recipeData.cover_image.url)

            recipeData.extendedIngredients?.forEach((ingredient, index) => {
                formData.append(`extendedIngredients[${index}][name]`, ingredient.name)
                formData.append(`extendedIngredients[${index}][original]`, ingredient.original)
                formData.append(`extendedIngredients[${index}][unit]`, ingredient.unit)
                formData.append(`extendedIngredients[${index}][amount]`, ingredient.amount)
            })

            const response = await fetch(buildedURL, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            })

            if (!response.ok) {
                const errorText = await response.text()
                if (response.status === 404) {
                    throw new Error('Endpoint not found (404): ' + errorText)
                } else if (response.status === 500) {
                    throw new Error('Internal Server Error (500): ' + errorText)
                } else {
                    throw new Error(`Error: ${response.status} - ${errorText}`)
                }
            }

            const data = await response.json()

            return data
        } catch (error) {
            console.error('Error in fetchRecipes.postRecipe:', error)
            throw new Error((error as Error).message)
        }
    },
}

export default fetchRecipes
