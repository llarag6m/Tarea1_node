import z from 'zod'
import { extractValidationData } from '../common/utils/extractErrorData.js'


export const repairsSchema = z.object({
    name: z.string().min(5).max(10),
    date: z.date(),
    motorsNumber: z.number().int().positive(),
    description: z.string().min(50).max(100),
    status: z.enum(['pending','inProgress','done','cancelled','delayed']),
    userId: z.number().int().positive(),
})

export function validateRepairs(data){
    const result = repairsSchema.safeParse(data)

    const {
        hasError,
        errorMessages,
        data: repairsData 
    } = extractValidationData(result)

    return{
        hasError,
        errorMessages,
        repairsData 
    }
}


export function validatePartialRepairs(data){
    const result = repairsSchema.partial().safeParse(data)

    const {
        hasError,
        errorMessages,
        data: repairsData 
    } = extractValidationData(result)

    return{
        hasError,
        errorMessages,
        repairsData 
    }
}
