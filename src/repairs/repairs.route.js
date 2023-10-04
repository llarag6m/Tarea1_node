import { Router } from "express";
import { createRepairs, findAllRepairs, updateRepair, findOneRepair, deleteRepair } from "./repairs.controlle.js";

export const router = Router()

router.route("/").get(findAllRepairs).post(createRepairs)

router.route("/:id").get(findOneRepair).patch(updateRepair).delete(deleteRepair)