import { Router } from "express";
import { router as usersRouter } from "../motors/motors.route.js"
import { router as repairsRouter } from "../repairs/repairs.route.js"

export const router = Router()

router.use("/motors", usersRouter)
router.use("/repairs", repairsRouter)

