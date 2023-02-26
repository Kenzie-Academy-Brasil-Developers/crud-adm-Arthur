import { Router } from "express";
import ensureDataIsValidMiddleware from "../middlewares/ensureDataIsValid";
import ensureTokenIsValid from "../middlewares/ensureTokenIsValid";
import ensureUserExists from "../middlewares/ensureUserExists";
import ensurePermissions from "../middlewares/ensurePermissions";
import {
  createUserController,
  deleteUserController,
  listUsersController,
  patchUserController,
  reactivateUserController,
  retrieveUserController,
} from "../controllers/users";
import { createUserSchema, updateUserSchema } from "../schemas/users";
import reactivateUserService from "../services/users/reactivateUser";

const usersRoutes: Router = Router();

usersRoutes.post(
  "",
  ensureDataIsValidMiddleware(createUserSchema),
  createUserController
);

usersRoutes.get("", ensureTokenIsValid, listUsersController);
usersRoutes.get("/profile", ensureTokenIsValid, retrieveUserController);
usersRoutes.patch(
  "/:id",
  ensureUserExists,
  ensureTokenIsValid,
  ensurePermissions,
  ensureDataIsValidMiddleware(updateUserSchema),
  patchUserController
);
usersRoutes.delete(
  "/:id",
  ensureUserExists,
  ensureTokenIsValid,
  ensurePermissions,
  deleteUserController
);
usersRoutes.put(
  "/:id/recover",
  ensureUserExists,
  ensureTokenIsValid,
  ensurePermissions,
  reactivateUserController
);

export default usersRoutes;
