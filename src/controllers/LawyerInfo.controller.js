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
            "User logged In Successfully"
        )
    )

})
export  {SignupUser, loginUser }