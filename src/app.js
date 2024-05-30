import  express  from "express";
import cors from "cors"
import { limit } from "./contants.js";
const app=express();

app.use(cors({
    origin:"*",
    credentials:true
}))


app.use(express.json({extended:true,limit}))

app.use(express.static("public"))

export {app};