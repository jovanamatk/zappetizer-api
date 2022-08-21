import * as express from "express";
import AppModule from "./app.module";

export default class AppController {
  constructor(private app: express.Application) {
    this.runServer();
    this.initializeControllers();
  }

  private runServer(): void {
    this.app.listen(process.env.PORT, () => {
      console.log(`API listening on port ${process.env.PORT}!`);
    });

    this.app.get("/", (req, res) => {
      res.send("Hello World!");
    });
  }

  private initializeControllers(): void {
    const controllers = AppModule.getControllers();

    controllers.forEach((invokeController) => invokeController(this.app));
  }
}
