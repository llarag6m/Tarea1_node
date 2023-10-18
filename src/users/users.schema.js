import z from 'zod'
import { extractValidationData } from '../common/utils/extractErrorData.js'

export const usersSchema = z.object({
    name: z.string().min(5).max(10),
    email: z.string().email(),
    password: z.string().min(8, { message: 'Password es muy corto'}),
    role: z.string(),
    status: z.enum(['pending','inProgress','done','cancelled','delayed','available']),
})

const loginUserSchema = z.object({
    email: z.string().email({message: 'Email Invalido'}),
    password: z.string().min(7, {message: 'Password es muy corto'})
})

export function validateUsers(data){
    const result = usersSchema.safeParse(data)

    const {
        hasError,
        errorMessages,
        data: usersData 
    } = extractValidationData(result)

    return{
        hasError,
        errorMessages,
        usersData 
    }
}


export function validatePartialUsers(data){
    const result = usersSchema.partial().safeParse(data)

    const {
        hasError,
        errorMessages,
        data: usersData 
    } = extractValidationData(result)

    return{
        hasError,
        errorMessages,
        usersData 
    }
}

export const validateLogin = data =>{
    const result = loginUserSchema.safeParse(data)
    
    const {
        hasError,
        errorMessages,
        data: usersData 
    } = extractValidationData(result)

    return{
        hasError,
        errorMessages,
        usersData 
    }
}
