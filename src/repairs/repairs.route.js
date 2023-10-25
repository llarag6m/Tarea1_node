import { Router } from "express";
import { createRepairs, findAllRepairs, updateRepair, findOneRepair, deleteRepair } from "./repairs.controlle.js";
import { validateExistRepairs } from "./repairs.middleware.js";
import { protect, restricTo } from "../users/users.middleware.js";


export const router = Router()

router.route("/")
.get( findAllRepairs)
.post(createRepairs)


router.use("/:id", validateExistRepairs)
.route("/:id")
.get(findOneRepair)
.patch(protect,restricTo('user'),updateRepair)
.delete(protect,restricTo('user'),deleteRepair)