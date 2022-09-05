import UserModule from "./user.module";
import auth from "../../middleware";

const userController = (app) => {
  const userService = UserModule.getUserService();
  const PATH = "/user";

  app.get(PATH, auth, (req, res) => {
    res.send("Hello User!");
  });

  app.get(`${PATH}/:id`, auth, (req, res) => {
    res.send(`Hello User ${req.params.id}!`);
  });
};

export default userController;
