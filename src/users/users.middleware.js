import { UsersServices } from "./users.services.js"

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