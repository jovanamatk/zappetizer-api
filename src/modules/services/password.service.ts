import * as bcrypt from "bcrypt";

export class PasswordService {
  public static async hashPassword(password: string) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  }
}
