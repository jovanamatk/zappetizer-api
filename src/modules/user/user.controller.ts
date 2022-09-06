import UserModule from "./user.module";
import auth from "../../middleware";
import { Roles } from "./enums/roles.enum";

const userController = (app) => {
  const userService = UserModule.getUserService();
  const PATH = "/user";

  app.get(PATH, auth, async (req, res) => {
    try {
      const user = await userService.findById(req.userData.id);
      if (!user) {
        throw new Error("User not found");
      }

      const { password: _, ...rest } = user;
      res.status(200).send(rest);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

  app.put(`${PATH}/:id`, auth, async (req, res) => {
    try {
      const { name, email, role } = req.body;

      if (role && req.userData.role !== Roles.ADMIN) {
        throw new Error("You are not authorized to change role");
      }

      if (req.userData.role !== Roles.ADMIN) {
        if (req.userData.id !== +req.params.id) {
          throw new Error("You are not authorized to change this user");
        }
      }

      const user = await userService.update(req.params.id, {
        name,
        email,
        role,
      });
      const { password: _, ...rest } = user;
      res.status(200).send(rest);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

  app.delete(`${PATH}/:id`, auth, async (req, res) => {
    try {
      const userId = +req.params.id;
      const currentUser = await userService.findById(req.userData.id);

      if (userId !== req.userData.id && currentUser.role !== "admin") {
        throw new Error("You are not allowed to delete this user");
      }

      const result = await userService.delete(userId);
      if (result.affected === 0) {
        throw new Error("User not found");
      }
      res.status(200).send(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
};

export default userController;
