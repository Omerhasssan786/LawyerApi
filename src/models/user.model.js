import mongoose, { Schema } from "mongoose";
const userSchema = new Schema(
    {
        Name: {
            type: String,
            required: true
        },
        Email: {
            type: String,
            required: true
        },
        Password: {
            type: String,
            required: true
        }, Phone: {
            type: Number,
            required: true
        }, userType:
        {
            type: String,
            enum: ["Lawyer", "Client"],
            required: true
        },
        Location: {
            type: String,
            required: true
        }
    })

    export const User=mongoose.model("User",userSchema);