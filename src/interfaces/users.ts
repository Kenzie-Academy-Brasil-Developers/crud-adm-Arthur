import { QueryResult } from "pg";
import {
  createUserSchema,
  returnUserSchema,
  allUsersSchema,
  updateUserSchema
} from "../schemas/users";
import { z } from "zod";

type IUserRequest = z.infer<typeof createUserSchema>;
type IUser = z.infer<typeof returnUserSchema>;
type IPatch = z.infer<typeof updateUserSchema>

type IUserWithoutPassword = Omit<IUser, "password">;
type IUserResult = QueryResult<IUserWithoutPassword>;
type IUserResultWithPassword = QueryResult<IUser>;
type IAllUsersReturn = z.infer<typeof allUsersSchema>;

export {
  IUserRequest,
  IUser,
  IUserWithoutPassword,
  IUserResult,
  IAllUsersReturn,
  IUserResultWithPassword,
  IPatch
};
