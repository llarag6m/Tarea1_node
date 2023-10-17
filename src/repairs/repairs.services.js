import repair from "./repairs.model.js";

export class RepairsServices {

    async findAllRepairs(){
        return await repair.findAll({
            where:{
                status: 'pending'
            }
        })
    }

    async createRepair(data){
        return await repair.create(data)
    }

    async findOneRepair(id){
        return await repair.findOne({
            where:{
                id:id,
               /* status: true */
            }
        })
    }

    async updateRepair(repairs,data){
        return await repairs.update(data)
    }

    async deleteRepair(repairs){
        return await repairs.update({ status: 'cancelled'})
    }
}