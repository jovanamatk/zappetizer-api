import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import Category from "../category/category.entity";

@Entity()
export default class MenuItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  price: number;

  @ManyToOne(() => MenuItem, (menuItem) => menuItem.id)
  category: Category;
}
