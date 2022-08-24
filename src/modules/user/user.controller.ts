import UserModule from "./user.module";

const userController = (app) => {
  const userService = UserModule.getUserService();
  const PATH = "/user";

  app.get(PATH, (req, res) => {
    res.send("Hello User!");
  });

  app.get(`${PATH}/:id`, (req, res) => {
    res.send(`Hello User ${req.params.id}!`);
  });
};

export default userController;
