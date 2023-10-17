import motors from "./users.model.js";

export class UsersServices{

    async findAllUser(){
        return await motors.findAll({
            where:{
                status: 'available'
            }
        })
    }

    async createUser(data){
        return await motors.create(data)
    }

    async findOneUser(id){
        return await motors.findOne({
            where:{
                id
            }
        })
    }

    async updateUser(motor,data){
        return await motor.update(data)
    }

    async deleteUser (motor){
        return await motor.update({ status: 'disable'})
    }
     
}