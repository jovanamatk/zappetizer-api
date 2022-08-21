import "dotenv/config";
import "reflect-metadata";
import { AppDataSource } from "./data-source";
import appController from "./modules/app.controller";

AppDataSource.initialize()
  .then(() => {
    console.log("Initialized AppDataSource");
  })
  .catch((error) => console.log(error));

appController();
