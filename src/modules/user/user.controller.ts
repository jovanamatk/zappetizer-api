import UserModule from "./user.module";
import auth from "../../middleware";

const userController = (app) => {
  const userService = UserModule.getUserService();
  const PATH = "/user";

  app.get(PATH, auth, async (req, res) => {
    try {
      const user = await userService.findById(req.userData.id);
      if (!user) {
        throw new Error("User not found");
      }

      const { password, ...rest } = user;
      res.status(200).send(rest);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

  app.delete(PATH, auth, async (req, res) => {
    try {
      const result = await userService.delete(req.userData.id);
      res.status(200).send(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
};

export default userController;
