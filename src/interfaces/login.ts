import { createLoginSchema } from "../schemas/login";
import { z } from "zod";

type ILoginRequest = z.infer<typeof createLoginSchema>;

export { ILoginRequest };
