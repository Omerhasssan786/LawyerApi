import mongoose, { Schema } from "mongoose";
const lawyerInfoSchema = new Schema(
    {
        Experience: {
            type: String,
            required: true
        },
        BioData: {
            type: String,
            required: true
        },
        Expertise: {
            type: String,
            required: true
        },
        Availability:{
            type:Boolean,
             required:true
        },  Location:{
            type:String,
             required:true
        },    user: {
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    
    })

    export const LawyerIfo=mongoose.model("LawyerInfo",lawyerInfoSchema);