import { Router } from "express"
import { findAllUsers,createUsers,findOneUser,updateUser,deleteUser, login, register } from "./users.controller.js"
import { validateExistUsers } from "./users.middleware.js"

export const router = Router()

router.post('/login', login)
router.post('/register', register)


router.route("/").get(findAllUsers).post(createUsers)


router.use("/:id", validateExistUsers).route("/:id").get(findOneUser).patch(updateUser).delete(deleteUser)

 