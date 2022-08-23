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

  app.post(`${PATH}`, async (req, res) => {
    const { name, password, email } = req.body;

    try {
      const { id } = await userService.create({
        name,
        password,
        email,
      });
      return res.status(201).json({ id, email });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  });
};

export default userController;
