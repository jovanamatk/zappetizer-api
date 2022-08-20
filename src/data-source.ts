import { DataSource } from "typeorm";
import Category from "./modules/category/category.entity";
import MenuItem from "./modules/menu-item/menu-item.entity";
import User from "./modules/user/user.entity";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "host.docker.internal",
  port: 5432,
  username: "postgres",
  password: "111",
  database: "db",
  synchronize: true,
  logging: true,
  entities: [User, Category, MenuItem],
  subscribers: [],
  migrations: [],
});