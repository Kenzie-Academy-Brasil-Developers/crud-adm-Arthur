import { hashSync } from "bcryptjs";
import { z } from "zod";

const createUserSchema = z.object({
  name: z.string().min(3).max(45),
  email: z.string().email(),
  password: z.string().transform((pass) => {
    return hashSync(pass, 10);
  }),
  admin: z.boolean().default(false),
  active: z.boolean().default(true),
});

const returnUserSchema = createUserSchema.extend({
  id: z.number(),
});

const returnUserSchemaWithoutPassword = returnUserSchema.omit({
  password: true,
});

const updateUserSchema = returnUserSchemaWithoutPassword.partial()

const allUsersSchema = z.array(returnUserSchemaWithoutPassword);

export {
  createUserSchema,
  returnUserSchema,
  returnUserSchemaWithoutPassword,
  allUsersSchema,
  updateUserSchema
};
