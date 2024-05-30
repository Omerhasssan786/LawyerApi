import dotenv from "dotenv"
import { app } from "./src/app.js"
import connectDB from "./src/db/index.js"


dotenv.config(
    {
        path:".env"
    }
)
try{
    connectDB()
    console.log("Hello")
    app.listen(process.env.Port||7000,()=>{

        console.log("Server is listening at Port",process.env.Port||7000)
    })
}catch(err)
{
   console.log("Unable to Listen ", err)
}