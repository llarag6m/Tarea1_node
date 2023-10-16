import { DataTypes } from "sequelize";
import sequelize from "../config/database/database.js";

const motors = sequelize.define("users",{
    id:{
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        type: DataTypes.INTEGER,
        field: "user_id"
    },
    name:{
        type: DataTypes.STRING(100),
        allowNull: false
    },
    email:{
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
    },
    password:{
        type: DataTypes.STRING(100),
        allowNull: false
    },
    role:{
        type: DataTypes.STRING(100),
        allowNull: false
    },
    status:{
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
})


export default motors