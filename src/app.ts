import express, { Application } from "express";
import "express-async-errors";
import { handleErrors } from "./errors";

import loginRoutes from "./routes/login";
import usersRoutes from "./routes/users";

const app: Application = express();
app.use(express.json());

app.use("/login", loginRoutes);
app.use("/users", usersRoutes);

app.use(handleErrors);

export default app;
