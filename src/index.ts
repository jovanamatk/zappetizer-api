import "dotenv/config";
import "reflect-metadata";
import { AppDataSource } from "./data-source";
import AppController from "./modules/app.controller";
import * as express from "express";

AppDataSource.initialize()
  .then(() => {
    console.log("Initialized AppDataSource");
  })
  .catch((error) => console.log(error));

const app: express.Application = express();
new AppController(app);
