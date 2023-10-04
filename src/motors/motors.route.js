import { Router } from "express"
import { findAllUsers,createUsers,findOneUser,updateUser,deleteUser } from "./motors.controller.js"

export const router = Router()


router.route("/").get(findAllUsers).post(createUsers)

router.route("/:id").get(findOneUser).patch(updateUser).delete(deleteUser)

