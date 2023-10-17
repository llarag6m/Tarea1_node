import { Sequelize } from "sequelize";
import { envs } from "../enviroments/enviroments.js";


const sequelize = new Sequelize(envs.DB_URI, {
    logging: false
})

export async function authenticate() {
    try {
        await sequelize.authenticate()
        console.log("Conexion ha sido establecida correctamente 😊")
    } catch (error) {
        throw new Error("Error al autenticar la conexion 😢", error)
    }
}

export async function syncUp(){
    try {
        await sequelize.sync()
        console.log("Conexion sincronizada correctamente 😊")
    } catch (error) {
        throw new Error("Error al sincronizar la base de datos 😢", error)
    }
}


export default sequelize