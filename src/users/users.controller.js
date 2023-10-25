
import { encryptedPassword, verifyPassword } from "../config/plugins/encripted-password.plugin.js"
import generateJWT from "../config/plugins/generate-jwt.plugin.js"
import { AppError, catchAsync } from "../errors/index.js"
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

    const users = await motorsServices.findByEmail(usersData.email) 
   
    if (!users) {
        return next(new AppError("la cuenta no existe",404))
    }
    
    const passwordVerify = await verifyPassword(
        usersData.password,
        users.password
    )

    if (!passwordVerify) {
        return next(new AppError("Contraseña incorrecta",401))
    }

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

export const changePassword = catchAsync(async(req, res, next) =>{
    const {sessionUser} = req


    const { currentPassword, newPassword } = req.body

    if (currentPassword = newPassword) {
        return next(AppError("La contraseña no pude ser igual",400))
    }

    const isCorrectPassword = await verifyPassword(
        currentPassword,
        sessionUser.password
    )

    if (!isCorrectPassword) {
        return next(new AppError('El email o la contraseña son incorrectos',401))
    }

    const hashedNewPassword = await encryptedPassword(newPassword)
    await motorsServices.updateUser(sessionUser, {
        password: hashedNewPassword,

    })
}) 


export const findOneUser = (async (req, res, next) =>{
    const { id } = req.params;

    const user = await motorsServices.findOneUser(id)

    if (!user) {
        return next(new AppError(`Usaurio con el id: ${id} no encontrado`, 404))
    }
    return res.json(user)
})

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



export const deleteUser = catchAsync( async (req, res) =>{
    const { id } = req.params;
  
    const user = await motorsServices.findOneUser(id)

    if (!user) {
        return res.status(404).json({
            status: 'error',
            message: `Uusario con el id ${id} no fue encontrado`
        })
    }
    await motorsServices.deleteUser(user)
    return res.status(204).json(null)
})