import * as express from "express";
import userController from "./user/user.controller";
import menuItemController from "./menu-item/menu-item.controller";
import categoryController from "./category/category.controller";

const appController = () => {
  const app = express();

  app.listen(process.env.PORT, () => {
    console.log(`API listening on port ${process.env.PORT}!`);
  });

  app.get("/", (req, res) => {
    res.send("Hello World!");
  });

  userController(app);
  menuItemController(app);
  categoryController(app);
};

export default appController;
