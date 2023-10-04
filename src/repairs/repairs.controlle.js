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
        const {id} = req.params
    
        const repair = await repairsServices.findOneRepair(id)
    
        if (!repair) {
            return res.status(404).json({
                status: "error",
                menssage:`Motocicleta con el id ${id} no encontrado`
            })
        }
    
        return res.json(repair)
    
    } catch (error) {
        return res.status(500).json(error)
        }
    }
    
    export const updateRepair = async (req, res) =>{
        try {
            const { id } = req.params
    
            const repair = await repairsServices.findOneRepair(id)
         
            if (!repair) {
                 return res.status(404).json({
                     status: "error",
                     menssage:`Motocicleta con el id ${id} no encontrado`
                 })
            }
         
            const updateRepair = await repairsServices.updateRepair(repair, req.body)
         
            return res.json(updateRepair)
        } catch (error) {
            return res.status(500).json(error)
        }
    }
    
    
    
    export const deleteRepair = async (req, res) =>{
        try {
            const { id } = req.params
    
            const repair = await repairsServices.findOneRepair(id)
        
            if (!repair) {
                return res.status(404).json({
                    status: "error",
                    menssage:`Motocicleta con el id ${id} no encontrado`
                })
            }
        
            await repairsServices.deleteRepair(repair)
        
            return res.status(204).json(null)
        } catch (error) {
            return res.status(500).json(error)
        }
    }