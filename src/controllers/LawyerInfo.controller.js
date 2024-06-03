import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import  jwt  from "jsonwebtoken";
import { LawyerIfo } from "../models/LawyerInfo.model.js";





// -------------------------------------------------------

// |----------------------SignUP---------------------------|

// --------------------------------------------------------

const addInfolawyer = asyncHandler(async (req , res) => {
    let { Experience,BioData,Expertise,Availability,Location } = req.body
    // Phone=parseInt( Phone)
    // console.log("typr", typeof Phone)
    console.log("phone",  Experience,BioData,Expertise,Availability,Location)
    console.log("0")
    if (Experience.trim() === "") {
        throw new apiError(400, "Experience is required");
        // return res.status(201).json(
        //     new apiResponse(200 , userCreated ,"User Registered")
    } else if (BioData.trim() === "") {
        throw new apiError(400, "bioData field is required");
    } else if (Expertise.trim() === "") {
        throw new apiError(400, "expertise field is required");
    }  else if (Location.trim() === "") 
        {
        throw new apiError(400, "Location field is required");
    } 
    const user=req.user._id;
    
        console.log("dataase 1")
const ser=await LawyerIfo.create({
    Experience,BioData,Expertise,Availability,Location,user
})
console.log("dataase 2")
const userCreated=await LawyerIfo.findById(user).select(
    
)
if(! userCreated)
    {
        throw new apiError(500 ,"Unable to created in Database")
    }
    return res.status(201).json(
        new apiResponse(200 , userCreated ,"Info Taken")
    )
})
const getLawyerinfo = asyncHandler(async (req, res) =>{
    const user=req.user._id;
    const userData = await LawyerIfo.find({ user: user });

    if(! userData)
        {
            throw new apiError(400 ,"Not Found")
        }

    return res
    .status(200)
   
    

    .json(
        new apiResponse(
            200, 
            {
                userData
            },
            " Successfully Get Info"
        )
    )

})
const updateUser = asyncHandler(async (req, res) => {
    const userId = req.user._id;

    try {
        // Find the user by user ID
        const user = await LawyerIfo.findById(userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        // Update the user data
        if (req.query.Experience) user.Experience = req.query.Experience;
        if (req.query.BioData) user.BioData = req.query.BioData;
        if (req.query.Expertise) user.Expertise = req.query.Expertise;
        if (req.query.Availability) user.Availability = req.query.Availability;
        if (req.query.Location) user.Location = req.query.Location;

        // Save the updated user data
        await user.save();

        return res.status(200).json({
            success: true,
            data: user,
            message: "User updated successfully"
        });
    } catch (error) {
        console.error("Error updating user:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
});
export  {SignupUser, loginUser,getLawyerinfo }