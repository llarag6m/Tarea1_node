import { Router } from "express"
import { findAllUsers,createUsers,findOneUser,updateUser,deleteUser, login, register } from "./users.controller.js"
import { protect, restricTo, validateExistUsers } from "./users.middleware.js"

export const router = Router()

router.post('/login', login)
router.post('/register', register)
/*
router.patch('change_password', changePassword)
*/
router.route("/")
.get(protect,findAllUsers)
.post(createUsers)


router.use("/:id", validateExistUsers)
.route("/:id").get(findOneUser)
.patch(protect,restricTo('user'),updateUser)
.delete(protect,restricTo('user'),deleteUser) 