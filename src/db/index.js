import  mongoose from 'mongoose';
import { dbName } from '../contants.js';
const connectDB=async()=>{
try{
    const connectionDB=await mongoose.connect(`${process.env.monogobd_URI}/${dbName}`)
    console.log("Data Base Successfully connected",connectionDB.connection.host )
}
catch(error)
{
     console.log("DataBase Unable to Conect Level 0", error)
     process.exit(1)
}
}
export default connectDB;