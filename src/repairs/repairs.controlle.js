import { validatePartialRepairs } from "./repairs.schema.js"
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

export const findAllRepairs = async (req, res) =>{
    
    try {
         const repair = await repairsServices.findAllRepairs()
 
         return res.json(repair)
    } catch (error) {
         return res.status(500).json(error)
    }
 }


 export const findOneRepair = async (req, res) =>{
    try {
        const { repair } = req

        return res.status(200).json(repair)
    
    } catch (error) {
        return res.status(500).json(error)
        }
    }
    
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
    
    
    export const deleteRepair = async (req, res) =>{
        try {
            const { repair } = req
    
        
            await repairsServices.deleteRepair(repair)
        
            return res.status(204).json(null)
        } catch (error) {
            return res.status(500).json(error)
        }
    }