import repair from "../../repairs/repairs.model.js";
import motors from "../../users/users.model.js";

export const relationship = () =>{

    motors.hasMany(repair, {foreignKey: 'user_id', as: 'motorshasRepair'})
    repair.belongsTo(motors, {foreignKey: 'user_id'})


}