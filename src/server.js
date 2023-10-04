import { envs } from "./config/enviroments/enviroments.js";
import app from "./app.js";
import { authenticate, syncUp } from "./config/database/database.js";

async function main(){
    try {
        await authenticate()
        await syncUp()
    } catch (error) {
        console.error(error)
    }
}

main()

//Servidor 5050
app.listen(envs.PORT, () =>{
    console.log(`Servidor corriendo en el puerto ${envs.PORT} 😁 yupi`)
})