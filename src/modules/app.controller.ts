import * as express from "express";
import AppModule from "./app.module";

export default class AppController {
  constructor(private app: express.Application) {
    this.runServer(app);
    this.initializeControllers(app);
  }

  private runServer(app): void {
    app.listen(process.env.PORT, () => {
      console.log(`API listening on port ${process.env.PORT}!`);
    });

    app.get("/", (req, res) => {
      res.send("Hello World!");
    });
  }

  private initializeControllers(app: express.Application): void {
    const controllers = AppModule.getControllers();

    controllers.forEach((invokeController) => invokeController(app));
  }
}
