import jwt from "jsonwebtoken"
import { AppError } from "../errors/appError.js"
import { catchAsync } from "../errors/catchAsync.js"
import { UsersServices } from "./users.services.js"
import { envs } from "../config/enviroments/enviroments.js"
import { promisify } from 'util'

const usersService = new UsersServices()

export const validateExistUsers = async(req, res, next) =>{
    const { id } = req.params

    const user = await usersService.findOneUser(id)

    if (!user) {
        return res.status(404).json({
            status: "error",
            menssage:`Pasajero con el id ${id} no fue encontrado`
        })
    }
    req.user = user
    next()
}

export const protect = catchAsync(async(req, res, next) =>{
    let token

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1]
    }

    if (!token) {
        return next(new AppError('No estas logeado inicia sesion antes'))
    }

    const decoded = await promisify(jwt.verify)(token, envs.SECRET_JWT_SEED,)

    const user = await usersService.findOneUser(decoded.id)

    if (!user) {
        return next(
            new AppError('El token no esta disponible',401)
        )
    }

    if (user.changePasswordAt) {
        const changedTimeStamp = parseInt(
            user.changePasswordAt.getTime() / 1000, 
            10
        )
    }

    if (decoded.iat < changedTimeStamp) {
        return next(
            new AppError("Contraseña cambiada actualmente logeate de nuevo")
        )
    }

 req.sessionUser = user;
 next()


})

export const restricTo = (...roles) =>{
    return (req, res, next) =>{
        if (!roles.includes(req.sessionUser.role)) {
            return next(new AppError('NO tiene permisos para realizar esta accion', 403))
        }
        next()
    }
}