import { DataTypes } from "sequelize";
import sequelize from "../config/database/database.js";

const repair = sequelize.define("repairs",{
    id:{
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        type: DataTypes.INTEGER,
        field: "repair_id"
    },
    date:{
        type: DataTypes.DATE,
        allowNull: false     
    },
    status:{
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
    userId:{
        primaryKey: true,
        allowNull: false,
        type: DataTypes.INTEGER,
        field: "user_id"
    }
})

export default repair