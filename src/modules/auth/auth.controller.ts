import UserModule from "../user/user.module";
import AuthModule from "./auth.module";

const authController = (app) => {
  const authService = AuthModule.getAuthService();
  const PATH = "/auth";

  app.post(PATH + "/login", async (req, res) => {
    try {
      const { email, password } = req.body;

      const authToken = await authService.login(email, password);
      return res.status(200).json({ authToken });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  });
  app.post(`${PATH}/register`, async (req, res) => {
    try {
      const { name, password, email, role } = req.body;

      const { id } = await authService.register(name, password, email, role);
      return res.status(201).json({ id, email });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  });
};

export default authController;
