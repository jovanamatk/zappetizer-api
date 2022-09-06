import UserEntity from "./user.entity";
import { AppDataSource } from "../../data-source";
import { Repository } from "typeorm";
import validate from "./user.validator";
import AuthModule from "../auth/auth.module";
import { Roles } from "./enums/roles.enum";
import { IUser } from "./interfaces/user.interface";

export default class User {
  private userRepository: Repository<UserEntity>;
  private validate: typeof validate;
  private passwordService;

  constructor() {
    this.userRepository = AppDataSource.getRepository(UserEntity);
    this.passwordService = AuthModule.getPasswordService();
    this.validate = validate;
  }

  async findById(id: number) {
    return this.userRepository.findOne({ where: { id } });
  }

  async findByEmail(email: string) {
    return await this.userRepository.findOne({ where: { email } });
  }

  async create({ name, password, email, role }: IUser) {
    if (await this.findByEmail(email)) {
      throw new Error("User already exists");
    }

    const validation = this.validate({
      name,
      password,
      email,
      role,
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
      role: role || Roles.RESTAURANT,
    });
    return await this.userRepository.save(user);
  }

  async update(id: number, data: IUser) {
    const user = await this.findById(id);
    if (!user) {
      throw new Error("User not found");
    }

    const validation = this.validate(data);

    if (validation.success === false) {
      throw new Error(validation.error.issues[0].message);
    }

    const updatedUser = this.userRepository.merge(user, {
      name: validation.data.name,
      email: validation.data.email,
      role: validation.data.role,
    });

    return await this.userRepository.save(updatedUser);
  }

  async delete(id: number) {
    return await this.userRepository.delete({ id });
  }
}
