import UserEntity from "./user.entity";
import UserService from "./user.service";
import userController from "./user.controller";

export default class User {
  public static getUserService(): UserService {
    return new UserService();
  }

  public static getEntity(): Function {
    return UserEntity;
  }

  public static getController(): Function {
    return userController;
  }
}
