import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors";
import "dotenv/config";

const ensurePermissions = async (
  req: Request | any,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const user = req.user;
  const id = +req.params.id;

  if (user.admin || id == user.id) {
    return next();
  }

  if (id != user.id) {
    throw new AppError("User don`t have permission", 403);
  }
};

export default ensurePermissions;
