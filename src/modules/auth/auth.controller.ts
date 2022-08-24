import UserModule from "../user/user.module";

const authController = (app) => {
  const userService = UserModule.getUserService();
  const PATH = "/auth";

  app.post(`${PATH}/register`, async (req, res) => {
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

export default authController;
