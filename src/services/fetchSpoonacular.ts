const apiKey = import.meta.env.VITE_SPOONACULAR_API_KEY

const fetchSpoonacular = {
    getRecipes: async (data: { query: string; offset: number }) => {
        const getUrl = `https://api.spoonacular.com/recipes/complexSearch/?query=${data.query}&number=12&offset=${data.offset}&addRecipeInformation=true&fillIngredients=true&apiKey=${apiKey}`
        try {
            const response = await fetch(getUrl)
            const data = await response.json()

            if (data.code === 402) throw new Error(data.message)
            return data
        } catch (error) {
            throw new Error((error as Error).message) //optimistic assertion
        }
    },
}

export default fetchSpoonacular
