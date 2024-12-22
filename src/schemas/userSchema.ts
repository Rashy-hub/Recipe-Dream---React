import { z } from 'zod'

// Schéma de base pour un utilisateur (commun)
export const UserSchema = z.object({
    id: z.string(),
    username: z.string().optional(),
    email: z.string().email(),
    role: z.string(),
})

// Type basé sur le schéma de base
export type User = z.infer<typeof UserSchema>

// Schéma pour le login
export const LoginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
})

// Schéma pour une réponse de login
export const LoginResponseSchema = z.object({
    status: z.number(),
    success: z.boolean(),
    message: z.string(),
    data: z.object({
        user: UserSchema,
        id: z.string(),
    }),
    token: z.string(),
})

// Type pour une réponse de login
export type LoginResponse = z.infer<typeof LoginResponseSchema>
// Type pour le login
export type LoginFormData = z.infer<typeof LoginSchema>

// Schéma pour le register
export const RegisterSchema = LoginSchema.extend({
    username: z.string().min(3),
    confirmPassword: z.string().min(6),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
})

// Schéma pour une réponse de register
export const RegisterResponseSchema = z.object({
    status: z.number(),
    success: z.boolean(),
    message: z.string(),
    data: z.object({
        user: UserSchema,
        id: z.string(),
    }),
    token: z.string(),
})

export type RegisterResponse = z.infer<typeof RegisterResponseSchema>
// Type pour le register
export type RegisterFormData = z.infer<typeof RegisterSchema>

// Schéma pour la mise à jour d'un utilisateur
export const UpdateUserSchema = UserSchema.partial()

// Type pour la mise à jour d'un utilisateur
export type UpdateUserFormData = z.infer<typeof UpdateUserSchema>
