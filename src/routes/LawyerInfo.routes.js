import { Router } from "express";
import{addInfolawyer, updateInfo,getLawyerinfo }from "../controllers/LawyerInfo.controller.js";



const router=Router();
router.route("/add").post(addInfolawyer)
router.route("/get").get(getLawyerinfo)
router.route("/update").put(updateInfo)
export default router