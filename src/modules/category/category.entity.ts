import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import MenuItem from "../menu-item/menu-item.entity";
import User from "../user/user.entity";

@Entity()
export default class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Category, (category) => category.id)
  user: User;

  @OneToMany(() => Category, (category) => category.id)
  menuItem: MenuItem[];
}
