import authController from "./auth.controller";

export default class Auth {
  public static getController(): Function {
    return authController;
  }
}
