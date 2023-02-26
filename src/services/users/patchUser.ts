import {
  IPatch,
  IUserRequest,
  IUserResult,
  IUserWithoutPassword,
} from "../../interfaces/users";
import { returnUserSchemaWithoutPassword } from "../../schemas/users";
import { client } from "../../database";
import format from "pg-format";
import { QueryConfig, QueryResult } from "pg";
import { AppError } from "../../errors";

const patchUserService = async (
  id: number,
  userData: IPatch
): Promise<IUserWithoutPassword> => {
  if (userData.email) {
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
  }

  const tbColumns = Object.keys(userData);
  const tbValues = Object.values(userData);

  if (tbColumns.length == 0) {
    throw new AppError(
      "É necessário informar pelo menos um campo a ser alterado",
      400
    );
  }

  const queryTeamplate = `
    UPDATE users
    SET(%I) = ROW(%L)
    WHERE id = $1
    RETURNING *;
  `;

  const queryFormat: string = format(queryTeamplate, tbColumns, tbValues);

  const queryResult: IUserResult = await client.query(queryFormat, [id]);

  const patchedUser = returnUserSchemaWithoutPassword.parse(
    queryResult.rows[0]
  );

  return patchedUser;
};

export default patchUserService;
