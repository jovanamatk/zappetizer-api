import "reflect-metadata";
import { AppDataSource } from "./data-source";

AppDataSource.initialize()
  .then(() => {
    console.log("Initialized AppDataSource");
  })
  .catch((error) => console.log(error));
