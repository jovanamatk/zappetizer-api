import UserEntity from "./user.entity";
import userController from "./user.controller";

export default class User {
  public static getEntity(): Function {
    return UserEntity;
  }

  public static getController(): Function {
    return userController;
  }
}
