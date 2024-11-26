import express, {Express, Request, Response} from 'express';
import env from "dotenv"
import bodyParser from 'body-parser';
import {connect} from "./config/database"
import cors from "cors"
import taskRouter from "./v1/routes/index"
//config env
env.config()
const app: Express = express();
const PORT = process.env.PORT
//parse application/json
app.use(bodyParser.json())
app.use(cors())
connect()
taskRouter(app)
app.listen(3000, () => {
  console.log(`Application started on port ${PORT}!`);
});