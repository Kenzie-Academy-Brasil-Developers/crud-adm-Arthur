import { Request, Response } from "express";
import createLoginService from "../services/login/createLogin";

const createLoginController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const token = await createLoginService(req.body);

  return res.json({
    token: token,
  });
};

export { createLoginController };
