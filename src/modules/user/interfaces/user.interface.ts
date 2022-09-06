import { Roles } from "../enums/roles.enum";

export interface IUser {
  id?: number;
  name?: string;
  password?: string;
  email?: string;
  role?: Roles;
}
