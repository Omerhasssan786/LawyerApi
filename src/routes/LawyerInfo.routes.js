import { Router } from "express";
import { addInfolawyer } from "../controllers/LawyerInfo.controller";



const router=Router();
router.route("/add").post(addInfolawyer)
router.route("/get").get(getLawyerinfo)
router.route("/update").update(updateInfo)
export default router