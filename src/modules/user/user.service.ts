import UserEntity from "./user.entity";
import { AppDataSource } from "../../data-source";
import { Repository } from "typeorm";
import validate from "./user.validator";
import { PasswordService } from "../services/password.service";

export default class User {
  private userRepository: Repository<UserEntity>;
  private validate: typeof validate;
  private passwordService: typeof PasswordService;

  constructor() {
    this.userRepository = AppDataSource.getRepository(UserEntity);
    this.validate = validate;
    this.passwordService = PasswordService;
  }

  async findByEmail(email: string) {
    return this.userRepository.findOne({ where: { email } });
  }

  async create({
    name,
    password,
    email,
  }: {
    name: string;
    password: string;
    email: string;
  }) {
    if (await this.findByEmail(email)) {
      throw new Error("User already exists");
    }

    const validation = this.validate({
      name,
      password,
      email,
    });

    if (validation.success === false) {
      throw new Error(validation.error.issues[0].message);
    }

    const hashedPassword: string = await this.passwordService.hashPassword(
      validation.data.password
    );

    const user = this.userRepository.create({
      name: validation.data.name,
      password: hashedPassword,
      email: validation.data.email,
    });
    return await this.userRepository.save(user);
  }
}
