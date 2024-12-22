import React from 'react'
import { useForm, useFieldArray, SubmitHandler } from 'react-hook-form'

interface Ingredient {
    name: string
    amount: string
    unit?: string
    original?: string
}

interface RecipeFormData {
    title: string
    description: string
    coverPicture: FileList | null
    servings: string
    readyInMinutes: string
    extendedIngredients: Ingredient[]
}

interface RecipeFormProps {
    addRecipeToMyRecipes: (recipe: RecipeFormData) => void
}

const RecipeForm: React.FC<RecipeFormProps> = ({ addRecipeToMyRecipes }) => {
    const {
        control,
        handleSubmit,
        register,
        formState: { errors },
    } = useForm<RecipeFormData>()

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'extendedIngredients',
    })

    const onSubmit: SubmitHandler<RecipeFormData> = (data) => {
        // Vérification des données
        console.log('Vérification des données du formulaire:')
        console.log('Titre:', data.title)
        console.log('Description:', data.description)
        console.log('Image de couverture:', data.coverPicture?.[0])
        console.log('Portions:', data.servings)
        console.log('Ingrédients:', data.extendedIngredients)
        console.log('Temps de preparation:', data.readyInMinutes)

        // Vérification des fichiers (s'ils existent)
        if (data.coverPicture && data.coverPicture.length > 0) {
            console.log('Fichier sélectionné:', data.coverPicture[0])
        } else {
            console.error('Aucun fichier sélectionné')
        }
        // Ajout des champs manquants
        const newData = {
            ...data,
            cover_image: {
                public_id: '', // vous pouvez laisser cela vide ou ajouter une valeur par défaut
                url: '', // vous pouvez laisser cela vide ou ajouter une valeur par défaut
            },
            ingredients: data.extendedIngredients.map((ingredient) => ({
                name: ingredient.name,
                amount: ingredient.amount,
                unit: ingredient.unit,
            })),
        }

        // Appel à la fonction pour ajouter la recette
        addRecipeToMyRecipes(newData)
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
                        {...register('coverPicture', { required: 'Image de couverture est requise' })}
                        className="w-full p-2 border rounded"
                    />
                    {errors.coverPicture && <p className="text-red-500">{errors.coverPicture.message}</p>}
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
                <div className="mb-4">
                    <label className="block text-gray-700">Temps de preparation</label>
                    <input
                        type="number"
                        {...register('readyInMinutes', { required: 'Le temps de preparation est requis', min: 1 })}
                        className="w-full p-2 border rounded"
                        min="1"
                    />
                    {errors.readyInMinutes && <p className="text-red-500">{errors.readyInMinutes.message}</p>}
                </div>

                <h3 className="text-xl font-semibold mb-2 font-inter">Ingrédients</h3>
                {fields.map((item, index) => (
                    <div key={item.id} className="flex items-center mb-2">
                        <input
                            type="text"
                            {...register(`extendedIngredients.${index}.original`)}
                            placeholder="Description complète"
                            className="w-full p-2 border rounded"
                        />
                        {errors.extendedIngredients?.[index]?.original && (
                            <p className="text-red-500">{errors.extendedIngredients[index].original?.message}</p>
                        )}
                        <input
                            type="text"
                            {...register(`extendedIngredients.${index}.name`, {
                                required: "Nom de l'ingrédient est requis",
                            })}
                            placeholder="Nom de l'ingrédient"
                            className="w-1/3 p-2 border rounded mr-2"
                        />
                        {errors.extendedIngredients?.[index]?.name && (
                            <p className="text-red-500">{errors.extendedIngredients[index].name?.message}</p>
                        )}

                        <input
                            type="text"
                            {...register(`extendedIngredients.${index}.amount`, {
                                required: 'Quantité est requise',
                            })}
                            placeholder="Quantité"
                            className="w-1/4 p-2 border rounded mr-2"
                        />
                        {errors.extendedIngredients?.[index]?.amount && (
                            <p className="text-red-500">{errors.extendedIngredients[index].amount?.message}</p>
                        )}

                        <input
                            type="text"
                            {...register(`extendedIngredients.${index}.unit`)}
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
                    onClick={() => append({ name: '', amount: '', unit: '' })}
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
