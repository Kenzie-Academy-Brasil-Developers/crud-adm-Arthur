import {
  IUserRequest,
  IUserResult,
  IUserWithoutPassword,
} from "../../interfaces/users";
import { returnUserSchemaWithoutPassword } from "../../schemas/users";
import { client } from "../../database";
import format from "pg-format";
import { QueryConfig, QueryResult } from "pg";
import { AppError } from "../../errors";

const createUsersService = async (
  userData: IUserRequest
): Promise<IUserWithoutPassword> => {
  const queryStringUserExist: string = `
        SELECT
          *
        FROM
          users
        WHERE
          email = $1;
    `;

  const queryConfigUserExists: QueryConfig = {
    text: queryStringUserExist,
    values: [userData.email],
  };

  const queryResultUserExists: QueryResult = await client.query(
    queryConfigUserExists
  );

  if (queryResultUserExists.rowCount > 0) {
    throw new AppError("Esse email já está em uso", 409);
  }

  const queryString: string = format(
    `
        INSERT INTO
            users(%I)
        VALUES(%L)
          RETURNING *;
        `,
    Object.keys(userData),
    Object.values(userData)
  );

  const queryResult: IUserResult = await client.query(queryString);

  const newUser = returnUserSchemaWithoutPassword.parse(queryResult.rows[0]);

  return newUser;
};

export default createUsersService;
