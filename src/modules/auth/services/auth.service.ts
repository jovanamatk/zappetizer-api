import AuthModule from "../auth.module";
import UserModule from "../../user/user.module";

export default class Auth {
  private passwordService;
  private userService;

  constructor() {
    this.userService = UserModule.getUserService();
    this.passwordService = AuthModule.getPasswordService();
  }

  public async login(email: string, password: string) {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new Error("There is no user with this email.");
    }

    const isPasswordValid = await this.passwordService.comparePassword(
      password,
      user.password
    );
    if (!isPasswordValid) {
      throw new Error("Invalid password.");
    }
    return "AuthToken";
  }

  public async register(name: string, password: string, email: string) {
    const { id } = await this.userService.create({ name, password, email });
    return { id, email };
  }
}
