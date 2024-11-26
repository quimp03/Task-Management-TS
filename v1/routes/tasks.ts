import express, { Router } from "express"
import * as controller from "../../controller/task.controller"
import validate from "../../validate/task.valiadte"
const router: Router = express()
router.get("/", controller.tasks)
router.get("/detail/:id", controller.detail)
router.patch("/change-status/:id", controller.changeStatusPatch)
router.patch("/change-multi", controller.changeMultiPatch)
router.post("/create",validate, controller.create)
router.patch("/edit/:id",controller.editPatch)
router.delete("/delete/:id", controller.deletePatch)
router.delete("/delete-multi", controller.deleteMultiPatch)
export default router