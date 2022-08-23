import "dotenv/config";
import "reflect-metadata";
import { AppDataSource } from "./data-source";
import AppController from "./modules/app.controller";
import * as express from "express";
import * as bodyParser from "body-parser";

AppDataSource.initialize()
  .then(() => {
    console.log("Initialized AppDataSource");
  })
  .catch((error) => console.log(error));

const app: express.Application = express();
app.use(bodyParser.json());

new AppController(app);
