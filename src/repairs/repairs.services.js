import { Op } from "sequelize";
import repair from "./repairs.model.js";
import motors from "../users/users.model.js";

export class RepairsServices {

    async findAllRepairs(){
        return await repair.findAll({
            where:{
                status: status
            }
        })
    }

    async findAllDataServUser(){
        return await repair.findAll({
            where:{
                status: {
                    [Op.notIn]:['cancelled']
                }
            },
            include:[
                {
                    model: motors,
                    attributes:['name','email']
                }
            ]
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