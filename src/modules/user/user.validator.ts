import { z } from "zod";

const validateUser = (user: {
  name: string;
  password: string;
  email: string;
}) => {
  const schema = z.object({
    name: z
      .string()
      .max(50, "Name can't contain more than 50 characters.")
      .min(3, "Name can't contain less than 3 characters."),
    password: z
      .string()
      .min(8, "Password must contain at least 8 characters.")
      .trim(),
    email: z.string().email(),
  });

  return schema.safeParse({
    name: user.name,
    password: user.password,
    email: user.email,
  });
};

export default validateUser;
