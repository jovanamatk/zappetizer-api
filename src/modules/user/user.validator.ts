import { z } from "zod";
import { Roles } from "./enums/roles.enum";
import { IUser } from "./interfaces/user.interface";

const validateUser = (user: IUser) => {
  const schema = z.object({
    name: z
      .string()
      .max(50, "Name can't contain more than 50 characters.")
      .min(3, "Name can't contain less than 3 characters.")
      .optional(),
    password: z
      .string()
      .min(8, "Password must contain at least 8 characters.")
      .trim()
      .optional(),
    email: z.string().email().optional(),
    role: z.enum([Roles.RESTAURANT, Roles.ADMIN]).optional(),
  });

  return schema.safeParse({
    name: user.name,
    password: user.password,
    email: user.email,
    role: user.role,
  });
};

export default validateUser;
