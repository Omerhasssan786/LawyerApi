import  express  from "express";
import cors from "cors"
import { limit } from "./contants.js";
import cookieParser from "cookie-parser"
const app=express();

app.use(cors({
    origin:"*",
    credentials:true
}))


app.use(express.json({limit}));
console.log(express.json())
app.use(express.urlencoded({extended:true ,limit}))
// app.use(express.json({ limit: '10mb' }));
// app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser())
app.use(express.static("public"));
//routes import 
import userRouter from "./routes/user.routes.js"
import lawyerInfoRouter from "./routes/LawyerInfo.routes.js"
app.use("/api/v1/user" ,userRouter)
app.use("/api/v1/LawyerInfo" ,lawyerInfoRouter)
export {app};