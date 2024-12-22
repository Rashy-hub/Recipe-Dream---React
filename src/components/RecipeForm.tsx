import React from 'react'
import { useForm, useFieldArray } from 'react-hook-form'

interface RecipeFormProps {
    addRecipeToMyRecipes: (recipe: any) => void
}
const RecipeForm = ({ addRecipeToMyRecipes }: RecipeFormProps) => {
    const {
        control,
        handleSubmit,
        register,
        formState: { errors },
    } = useForm({
        defaultValues: {
            title: '',
            description: '',
            cover_image: null,
            servings: 1,
            extendedIngredients: [{ name: '', quantity: '', unit: '' }],
        },
    })

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'extendedIngredients',
    })

    const onSubmit = (data: any) => {
        console.log(data)
        addRecipeToMyRecipes(data)
    }

    return (
        <div className="p-6 bg-white rounded-lg shadow-lg text-black">
            <h2 className="text-3xl font-bold mb-4 font-inter text-black">Créer une Recette</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-4">
                    <label className="block text-gray-700">Titre</label>
                    <input type="text" {...register('title', { required: 'Titre est requis' })} className="w-full p-2 border rounded" />
                    {errors.title && <p className="text-red-500">{errors.title.message}</p>}
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700">Description</label>
                    <textarea {...register('description', { required: 'Description est requise' })} className="w-full p-2 border rounded" />
                    {errors.description && <p className="text-red-500">{errors.description.message}</p>}
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700">Image de couverture</label>
                    <input
                        type="file"
                        {...register('cover_image', { required: 'Image de couverture est requise' })}
                        className="w-full p-2 border rounded"
                    />
                    {errors.cover_image && <p className="text-red-500">{errors.cover_image.message}</p>}
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700">Portions</label>
                    <input
                        type="number"
                        {...register('servings', { required: 'Portions sont requises', min: 1 })}
                        className="w-full p-2 border rounded"
                        min="1"
                    />
                    {errors.servings && <p className="text-red-500">{errors.servings.message}</p>}
                </div>

                <h3 className="text-xl font-semibold mb-2 font-inter">Ingrédients</h3>
                {fields.map((item, index) => (
                    <div key={item.id} className="flex items-center mb-2">
                        <input
                            type="text"
                            {...register(`extendedIngredients[${index}].name`, { required: "Nom de l'ingrédient est requis" })}
                            placeholder="Nom de l'ingrédient"
                            className="w-1/3 p-2 border rounded mr-2"
                        />
                        {errors.extendedIngredients?.[index]?.name && (
                            <p className="text-red-500">{errors.extendedIngredients[index].name?.message}</p>
                        )}

                        <input
                            type="number"
                            {...register(`extendedIngredients[${index}].amount`, { required: 'Quantité est requise', min: 0 })}
                            placeholder="Quantité"
                            className="w-1/4 p-2 border rounded mr-2"
                        />
                        {errors.extendedIngredients?.[index]?.quantity && (
                            <p className="text-red-500">{errors.extendedIngredients[index].quantity?.message}</p>
                        )}

                        <input
                            type="text"
                            {...register(`extendedIngredients[${index}].unit`)}
                            placeholder="Unité"
                            className="w-1/4 p-2 border rounded mr-2"
                        />

                        <button type="button" onClick={() => remove(index)} className="text-red-500 hover:text-red-700">
                            Supprimer
                        </button>
                    </div>
                ))}
                <button
                    type="button"
                    onClick={() => append({ name: '', quantity: '', unit: '' })}
                    className="text-blue-500 hover:text-blue-700 mb-4 mr-5"
                >
                    Ajouter un ingrédient
                </button>

                <button type="submit" className="bg-blue-500 text-white p-2 rounded shadow-lg hover:bg-blue-600">
                    Créer la recette
                </button>
            </form>
        </div>
    )
}

export default RecipeForm
