import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import  jwt  from "jsonwebtoken";


const generateAccessAndRefereshTokens = async(userId) =>{
    try {
        const user = await User.findById(userId)
        // const accessToken = user.generateAccessToken()
       
        return jwt.sign(
            {
                _id: user._id,
                Email: user.Email,
                
                Name: user.Name
            },
            process.env.ACCESS_TOKEN_SECRET,
            {
                expiresIn: process.env.ACCESS_TOKEN_EXPIRY
            }
        )
       
       
       


    } catch (error) {
        throw new apiError(500, "Something went wrong while generating referesh and access token")
    }
}


// -------------------------------------------------------

// |----------------------SignUP---------------------------|

// --------------------------------------------------------

const SignupUser = asyncHandler(async (req , res) => {
    let { Name, Email, Password, Phone, DOB, userType, specification, Location } = req.body
    Phone=parseInt( Phone)
    console.log("typr", typeof Phone)
    console.log("phone", Name, Email, Password, Phone, DOB, userType, specification, Location)
    console.log("0")
    if (Name.trim() === "") {
        throw new apiError(400, "Name field is required");
        // return res.status(201).json(
        //     new apiResponse(200 , userCreated ,"User Registered")
    } else if (Email.trim() === "") {
        throw new apiError(400, "Email field is required");
    } else if (Password.trim() === "") {
        throw new apiError(400, "Password field is required");
    } else if (userType.trim() === "") {
        throw new apiError(400, "User Type field is required");
    }  else if (Location.trim() === "") {
        throw new apiError(400, "Location field is required");
    } else if (DOB.trim() === "") {
        throw new apiError(400, "Date of Birth field is required");
    }
    else if (Phone==null) {
        throw new apiError(400, "Number is required")
    }
    const existedUser = await User.findOne({ Email });

    // const existedUser=await User.findOne(
    //     {Email}
    // )
    console.log("1")
    //   if(userType==="lawyer")
    //     {
    //         if (specification === "") {
    //             throw new apiError(400, "Specification field is required");
    //         } 

    //     }
        

      if(existedUser)
        {
            throw new apiError(400, "User Aldready exist")
        }
        console.log("dataase 1")
const user=await User.create({
    Name, Email, Password, Phone, DOB, userType, specification, Location
})
console.log("dataase 2")
const userCreated=await User.findById(user._id).select(
    "-Password"
)
if(! userCreated)
    {
        throw new apiError(500 ,"Unable to created User in Database")
    }
    return res.status(201).json(
        new apiResponse(200 , userCreated ,"User Registered")
    )
})
const loginUser = asyncHandler(async (req, res) =>{
    // req body -> data
    // username or email
    //find the user
    //password check
    //access and referesh token
    //send cookie

    const {Email, password} = req.body
    console.log(Email);

    if (!Email) {
        throw new apiError(400, "email is required")
    }
    
    // Here is an alternative of above code based on logic discussed in video:
    // if (!(username || email)) {
    //     throw new ApiError(400, "username or email is required")
        
    // }

    const user = await User.findOne( {Email}
    )

    if (!user) {
        throw new apiError(404, "User does not exist")
    }

//    const isPasswordValid = await user.isPa(password)

//    if (!isPasswordValid) {
//     throw new apiError(401, "Invalid user credentials")
//     }

   const accessToken= await generateAccessAndRefereshTokens(user._id)

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    // .cookie("refreshToken", refreshToken, options)
    .json(
        new apiResponse(
            200, 
            {
                user: loggedInUser, accessToken
            },
            "User logged In Successfully"
        )
    )

})
export  {SignupUser, loginUser }