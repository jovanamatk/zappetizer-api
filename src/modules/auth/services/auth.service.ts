import AuthModule from "../auth.module";
import UserModule from "../../user/user.module";
import * as jwt from "jsonwebtoken";
import { Roles } from "src/modules/user/enums/roles.enum";

type TokenData = {
  email: string;
  id: string;
  iat?: number;
  exp?: number;
};

export default class Auth {
  private passwordService;
  private userService;
  private jwt;

  constructor() {
    this.userService = UserModule.getUserService();
    this.passwordService = AuthModule.getPasswordService();
    this.jwt = jwt;
  }

  public createJwt(tokenData: TokenData): string {
    const TOKEN_EXPIRES_IN = "1 day";

    return this.jwt.sign(tokenData, process.env.JWT_PRIVATE_KEY, {
      expiresIn: TOKEN_EXPIRES_IN,
    });
  }

  public async login(email: string, password: string): Promise<string | Error> {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new Error("There is no user with this email.");
    }
    const { password: hashedPassword, ...userData } = user;

    const isPasswordValid = await this.passwordService.comparePassword(
      password,
      hashedPassword
    );
    if (!isPasswordValid) {
      throw new Error("Invalid password.");
    }
    return this.createJwt(userData);
  }

  public async register(
    name: string,
    password: string,
    email: string,
    role: Roles
  ): Promise<TokenData> {
    try {
      const { id } = await this.userService.create({
        name,
        password,
        email,
        role,
      });
      return { id, email };
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
