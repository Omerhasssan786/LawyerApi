import { User } from "../models/user.model";
import { asyncHandler } from "../utils/asyncHandler";


export const veriftJWT = asyncHandler(async (req, _, next) => {
    try {
        const token = req.cookies ?. accessToken || req.header("Authorization")?.replace("Bearer", "")
if (!token) {
            return res.status(401).json(
                new apiResponse(401, "Unathorized Request")
            )
        }
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        const user = await User.findById(decodedToken?._id).select("-password ")
        if(!user)
            {
                new apiResponse(401, "Invalid Access Token")
            }
            req.user=user;
            next()
    } catch (error) {
        return res.status(401).json(
            new apiResponse(401, error?.message||"Unathorized Request")
        )
    }
})