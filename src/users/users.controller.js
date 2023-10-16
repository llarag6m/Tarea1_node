import { MotorsServices } from "./users.services.js"

const motorsServices = new MotorsServices()

export const findAllUsers = async (req, res) =>{

   try {
        const users = await motorsServices.findAllMotors()

        return res.json(users)
   } catch (error) {
        return res.status(500).json(error)
   }
}

export const createUsers = async (req, res) =>{
    try {
        const users = await motorsServices.createUser(req.body)

        return res.status(201).json(users)
    } catch (error) {
        return res.status(500).json(error)
    }
}

export const findOneUser = async (req, res) =>{
try {
    const {id} = req.params

    const user = await motorsServices.findOneUser(id)

    if (!user) {
        return res.status(404).json({
            status: "error",
            menssage:`Pasajero con el id ${id} no encontrado`
        })
    }

    return res.json(user)

} catch (error) {
    return res.status(500).json(error)
    }
}

export const updateUser = async (req, res) =>{
    try {
        const { id } = req.params

        const user = await motorsServices.findOneUser(id)
     
        if (!user) {
             return res.status(404).json({
                 status: "error",
                 menssage:`Cliente con el id ${id} no encontrado`
             })
        }
     
        const updateUser = await motorsServices.updateUser(user, req.body)
     
        return res.json(updateUser)
    } catch (error) {
        return res.status(500).json(error)
    }
}



export const deleteUser = async (req, res) =>{
    try {
        const { id } = req.params

        const user = await motorsServices.findOneUser(id)
    
        if (!user) {
            return res.status(404).json({
                status: "error",
                menssage:`Cliente con el id ${id} no encontrado`
            })
        }
    
        await motorsServices.deleteUser(user)
    
        return res.status(204).json(null)
    } catch (error) {
        return res.status(500).json(error)
    }
}