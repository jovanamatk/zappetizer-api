import UserEntity from "./user.entity";
import { AppDataSource } from "../../data-source";
import { Repository } from "typeorm";

export default class User {
  private userRepository: Repository<UserEntity>;

  constructor() {
    this.userRepository = AppDataSource.getRepository(UserEntity);
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
    //@TODO: validate input, hash password

    const user = this.userRepository.create({
      name,
      password,
      email,
    });

    return await this.userRepository.save(user);
  }
}
