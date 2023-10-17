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
    motorsNumber:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    description:{
        type: DataTypes.STRING,
        allowNull: false
    },
    status:{
        type: DataTypes.ENUM(
            'pending',
            'completed',
            'cancelled',
        ),
        allowNull: false,
        defaultValue: 'pending'
    },
    userId:{
        primaryKey: true,
        allowNull: false,
        type: DataTypes.INTEGER,
        field: "user_id"
    }
})

export default repair