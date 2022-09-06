import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import Category from "../category/category.entity";
import { Roles } from "./enums/roles.enum";

@Entity()
export default class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({
    type: "enum",
    enum: Roles,
    enumName: "userRoleEnum",
    default: Roles.RESTAURANT,
  })
  role: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Category, (category) => category?.user)
  categories: Category[];
}
