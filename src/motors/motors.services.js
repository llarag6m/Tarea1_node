import motors from "./motors.model.js";

export class MotorsServices{

    async findAllMotors(){
        return await motors.findAll({
            where:{
                status: true
            }
        })
    }

    async createUser(data){
        return await motors.create(data)
    }

    async findOneUser(id){
        return await motors.findOne({
            where:{
                id:id,
                status: true
            }
        })
    }

    async updateUser(motor,data){
        return await motor.update(data)
    }

    async deleteUser (motor){
        return await motor.update({ status: disable})
    }
     
}