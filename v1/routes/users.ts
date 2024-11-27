import express, { Router } from "express"
import * as controller from "../../controller/user.controller"
import {requireAuth} from "../../middleware/auth.middleware"
const router: Router = express()
router.post("/register", controller.register)
router.post("/login", controller.login)
router.get("/detail", requireAuth, controller.detail)
export default router

