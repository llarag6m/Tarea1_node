import { RepairsServices } from "./repairs.services.js"

const repairService = new RepairsServices()

export const validateExistRepairs = async(req, res, next) =>{
    const { id } = req.params

    const repair = await repairService.findOneRepair(id)

    if (!repair) {
        return res.status(404).json({
            status: "error",
            menssage:`Motocicleta con el id ${id} no fue encontrado`
        })
    }
    req.repair = repair
    next()
}