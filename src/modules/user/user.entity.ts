import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import Category from "../category/category.entity";

@Entity()
export default class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Category, (category) => category?.user)
  categories: Category[];
}
