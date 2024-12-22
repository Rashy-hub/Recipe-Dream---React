import { z } from 'zod'

export const ExplorerIngredientsSchema = z.object({
    id: z.number(),
    name: z.string(),
    original: z.string(),
    amount: z.string(),
    unit: z.string(),
    meta: z.array(z.string()).optional(),
    measures: z.object({
        us: z
            .object({
                amount: z.number(),
                unitShort: z.string(),
                unitLong: z.string(),
            })
            .optional(),
        metric: z
            .object({
                amount: z.number(),
                unitShort: z.string(),
                unitLong: z.string(),
            })
            .optional(),
    }),
})

export const ExplorerSchema = z.object({
    id: z.string(), // ID unique de la recette

    title: z.string(), // Titre de la recette
    summary: z.string(), // Description de la recette
    readyInMinutes: z.number(), // Duree de la recette
    servings: z.number(), // Nombre de personnes
    image: z.string().url(), // URL de l'image de la recette
    extendedIngredients: z.array(ExplorerIngredientsSchema).optional(),
    __v: z.number(), // Version du document
})

/*  {
      "id": 2069,
      "aisle": "Oil, Vinegar, Salad Dressing",
      "image": "balsamic-vinegar.jpg",
      "consistency": "LIQUID",
      "name": "balsamic vinegar",
      "nameClean": "balsamic vinegar",
      "original": "1/2 cup balsamic vinegar",
      "originalName": "balsamic vinegar",
      "amount": 0.5,
      "unit": "cup",
      "meta": [],
      "measures": {
        "us": {
          "amount": 0.5,
          "unitShort": "cups",
          "unitLong": "cups"
        },
        "metric": {
          "amount": 127.5,
          "unitShort": "ml",
          "unitLong": "milliliters"
        }
      }
    } */
export type ExplorerRecipe = z.infer<typeof ExplorerSchema>
export type ExplorerIngredient = z.infer<typeof ExplorerIngredientsSchema>
