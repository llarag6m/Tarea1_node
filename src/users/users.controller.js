
import generateJWT from "../config/plugins/generate-jwt.plugin.js"
import { catchAsync } from "../errors/index.js"
import { validateLogin, validatePartialUsers, validateUsers } from "./users.schema.js"
import { UsersServices } from "./users.services.js"

const motorsServices = new UsersServices()

export const login = catchAsync(async(req, res, next) =>{
    const {hasError, errorMessages, usersData}  = validateLogin(req.body)

    if (hasError) {
        return res.status(422).json({
            status: 'error',
            message: errorMessages
        })
    }

    
})

export const register = catchAsync(async(req, res, next) =>{
    const { hasError, errorMessages, usersData} = validateUsers(req.body)

    if (hasError) {
        return res.status(422).json({
            status: 'error',
            message: errorMessages
        })
    }

    const user = await motorsServices.createUser(usersData)
    return res.status(201).json(user)
})



export const findAllUsers = async (req, res) =>{

   try {
        const users = await motorsServices.findAllUser()

        return res.json(users)
   } catch (error) {
        console.log(error)
        return res.status(500).json(error)
   }
}

export const createUsers = async (req, res) =>{
    try {
        const users = await motorsServices.createUser(req.body)

        const token = await generateJWT(users.id)

        return res.status(201).json({
            token,
            users:{
                id: users.id,
                name: users.name,
                email: users.email,
                role: users.role
            }
        })
    } catch (error) {
        return res.status(500).json(error)
    }
}

export const findOneUser = async (req, res) =>{
try {
    const { user } = req

    return res.status(200).json(user)

} catch (error) {
    return res.status(500).json(error)
    }
}

export const updateUser = async (req, res) =>{
    try {
        
        const { hasError, errorMessages, usersData} = validatePartialUsers(req.body)

        if (hasError) {
            return res.status(422).json({
                status: 'error',
                message: errorMessages
            })
        }
     
        const {id} = req.params

        const user = await motorsServices.findOneUser(id)
    
        if (!user) {
            return res.status(404).json({
                status: 'error',
                message: "id no encontrado"
            })
        }

        const updateUser = await motorsServices.updateUser(user, usersData)
     
        return res.json(updateUser)
    } catch (error) {
        return res.status(500).json(error)
    }
}



export const deleteUser = async (req, res) =>{
    try {
        const { user } = req

        await motorsServices.deleteUser(user)
    
        return res.status(204).json(null)
    } catch (error) {
        return res.status(500).json(error)
    }
}