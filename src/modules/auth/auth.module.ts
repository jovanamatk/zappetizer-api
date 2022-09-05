import authController from "./auth.controller";
import PasswordService from "./services/password.service";
import AuthService from "./services/auth.service";
export default class Auth {
  public static getController(): Function {
    return authController;
  }

  public static getPasswordService(): PasswordService {
    return PasswordService;
  }

  public static getAuthService(): AuthService {
    return new AuthService();
  }
}
