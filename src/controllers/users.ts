import { Request, Response } from "express";
import { IUserRequest } from "../interfaces/users";
import createUsersService from "../services/users/createUser";
import retrieveUserService from "../services/users/retrieveUser";
import deleteUserService from "../services/users/deleteUser";
import listUsersService from "../services/users/listUsers";
import patchUserService from "../services/users/patchUser";
import reactivateUserService from "../services/users/reactivateUser";

const createUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userData: IUserRequest = req.body;

  const newUser = await createUsersService(userData);

  return res.status(201).json(newUser);
};

const retrieveUserController = async (
  req: Request | any,
  res: Response
): Promise<Response> => {
  const userId = req.user.id;

  const user = await retrieveUserService(userId);

  return res.json(user);
};

const deleteUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userId: number = +req.params.id;

  await deleteUserService(userId);

  return res.status(204).send();
};

const reactivateUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userId: number = +req.params.id;

  await reactivateUserService(userId);

  return res.status(200).send();
};

const patchUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const id = +req.params.id;
  const patches = req.body;

  const patchedUser = await patchUserService(id, patches);

  return res.status(200).json(patchedUser);
};

const listUsersController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const users = await listUsersService();

  return res.json(users);
};

export {
  createUserController,
  retrieveUserController,
  deleteUserController,
  listUsersController,
  patchUserController,
  reactivateUserController,
};
