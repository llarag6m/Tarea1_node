import { Router } from "express"
import { findAllUsers,createMotors,findOneUser,updateUser,deleteUser } from "./motors.controller.js"

export const router = Router()


router.route("/").get(findAllUsers).post(createMotors)

router.route("/:id").get(findOneUser).patch(updateUser).delete(deleteUser)

