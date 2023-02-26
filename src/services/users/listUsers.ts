import { IAllUsersReturn } from "../../interfaces/users";
import { returnUserSchemaWithoutPassword } from "../../schemas/users";
import { client } from "../../database";

const listUsersService = async (): Promise<IAllUsersReturn> => {
  const queryString: string = `
        SELECT
            *
        FROM
            users;
    `;

  const queryResult = await client.query(queryString);

  const parsedUsers = queryResult.rows.map((user) =>
    returnUserSchemaWithoutPassword.parse(user)
  );

  return parsedUsers;
};

export default listUsersService;
