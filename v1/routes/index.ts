import tasks from "./tasks"
export = (app) => {
    const version = "/api/v1"
    app.use(version + "/tasks", tasks)
}