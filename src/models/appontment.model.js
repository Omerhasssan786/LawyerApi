import mongoose, { Schema } from "mongoose";
const appointmentSchema = new Schema(
    {
        Nmae: {
            type: String,
            required: true
        },
        Email: {
            type: String,
            required: true
        },
        Numnber: {
            type: Number,
            required: true
        },
        Accepted:{
            type:Boolean,
             required:true
        },  Location:{
            type:String,
             required:true
        },  CaseDetails:{
            type:String,
             required:true
        },
        CaseDetails:{
            type:String,
             required:true
        }
        ,
        Budget:{
            type:Number,
             required:true
        },    Client: {
            type: Schema.Types.ObjectId,
            ref: "User"
        },    Lawyer: {
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    
    })

    
    export const Appointment=mongoose.model("Appointment",appointmentSchema);