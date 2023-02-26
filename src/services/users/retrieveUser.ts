import { QueryConfig } from "pg";
import {
  IUserResult,
  IUser,
  IUserWithoutPassword,
} from "../../interfaces/users";
import { client } from "../../database";
import { AppError } from "../../errors";
import { returnUserSchemaWithoutPassword } from "../../schemas/users";

const retrieveUserService = async (
  userId: number
): Promise<IUserWithoutPassword> => {
  const queryString: string = `
        SELECT
            *
        FROM
            users
        WHERE
            id = $1;
    `;

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [userId],
  };

  const queryResult: IUserResult = await client.query(queryConfig);

  const parsedUser = returnUserSchemaWithoutPassword.parse(queryResult.rows[0]);

  return parsedUser;
};

export default retrieveUserService;
