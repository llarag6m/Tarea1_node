import { AppError } from "../errors/appError.js"
import { catchAsync } from "../errors/catchAsync.js"
import { validatePartialRepairs, validateRepairs } from "./repairs.schema.js"
import { RepairsServices } from "./repairs.services.js"

const repairsServices = new RepairsServices()


export const createRepairs = async(req, res) =>{

try {
    const repair = await repairsServices.createRepair(req.body)

    return res.status(201).json(repair)
} catch (error) {
    return res.status(500).json(error)
    }
}

export const findAllRepairs =  async (req, res) =>{
    
    try {
         const repair = await repairsServices.findAllDataServUser()
 
         return res.json(repair)
    } catch (error) {
         return res.status(500).json(error)
    }
 }


    export const findOneRepair =catchAsync( async (req, res, next) =>{
    const { id } = req.params;
 
    const repair = await repairsServices.findOneRepair(id)

    if (!repair) {
        return next(new AppError(`Motocicleta con el id: ${id} no encontrado`, 404))
    }
    return res.json(repair)
})   
    


    export const updateRepair = async (req, res) =>{
        
        try {
            const { repair } = req

            const { hasError, errorMessages, repairsData} = validatePartialRepairs(req.body)
         
            if (hasError) {
                return res.status(422).json({
                    status: 'error',
                    message: errorMessages
                })
            }

            const updateRepair = await repairsServices.updateRepair(repair, repairsData)
         
            return res.json(updateRepair)
        } catch (error) {
            return res.status(500).json(error)
        }
    }
    
    
    export const deleteRepair = catchAsync( async (req, res) =>{
        const { id } = req.params;

        const motor = await repairsServices.findOneRepair(id)

        if(!motor){
            return res.status(404).json({
              status: 'error',
              message: `Motocicleta con el id ${id} no fue encontrado`
            })
          }
          await repairsServices.deleteRepair(motor)
          return res.status(204).json(null)
    })