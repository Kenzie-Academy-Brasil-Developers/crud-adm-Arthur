import { response, Router } from "express";
import ensureDataIsValidMiddleware from "../middlewares/ensureDataIsValid";
import { createLoginSchema } from "../schemas/login";
import { createLoginController } from "../controllers/login";

const loginRoutes: Router = Router();

loginRoutes.post(
  "",
  ensureDataIsValidMiddleware(createLoginSchema),
  createLoginController
);

export default loginRoutes;
