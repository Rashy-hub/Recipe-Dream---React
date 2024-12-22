import { z } from 'zod'
import { ExplorerIngredientsSchema } from './explorerSchema'

// Schema pour une recette complète
const RecipeSchema = z.object({
    _id: z.string(), // ID unique de la recette
    //userId: z.string(), // ID de l'utilisateur ayant créé la recette
    title: z.string(), // Titre de la recette
    description: z.string(), // Description de la recette
    readyInMinutes: z.number().optional(), // Duree de la recette
    extendedIngredients: z.array(ExplorerIngredientsSchema).optional(),
    servings: z.number().optional(), // Nombre de personnes servies
    cover_image: z.object({
        public_id: z.string().nullable().optional(),
        url: z.string().url(),
    }),

    __v: z.number(), // Version du document
})

// Schema pour les données envoyées via le formulaire (POST)
const RecipeFormDataSchema = z.object({
    title: z.string(),
    description: z.string(),
    cover_image: z.object({
        public_id: z.string(),
        url: z.string().url(),
    }),
    ingredients: z.array(
        z.object({
            name: z.string(),
            amount: z.number(),
            unit: z.string().optional(),
        })
    ),
})

// Schema pour la réponse complète de l'API
const RecipeResponseSchema = z.object({
    status: z.number(),
    success: z.boolean(),
    message: z.string(),
    data: z.object({
        recipes: z.array(RecipeSchema),
    }),
})

// Inference des types avec TypeScript
export type Recipe = z.infer<typeof RecipeSchema> // Type d'une recette complète
export type RecipeFormData = z.infer<typeof RecipeFormDataSchema> // Type des données pour le formulaire
export type RecipeResponse = z.infer<typeof RecipeResponseSchema> // Type de la réponse de l'API

export { RecipeSchema, RecipeFormDataSchema, RecipeResponseSchema }
