import tasks from "./tasks"
import users from "./users"
import {requireAuth} from "../../middleware/auth.middleware"
export = (app) => {
    const version = "/api/v1"
    app.use(version + "/tasks", requireAuth, tasks)
    app.use(version + "/users", users)
}