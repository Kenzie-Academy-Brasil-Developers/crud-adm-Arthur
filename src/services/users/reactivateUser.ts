import { QueryConfig, QueryResult } from "pg";
import { client } from "../../database";
import { AppError } from "../../errors";

const reactivateUserService = async (userId: number): Promise<void> => {
  const queryString: string = `
        UPDATE
            users
        SET
            "active" = true
        WHERE
            id = $1;
    `;

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [userId],
  };

  await client.query(queryConfig);
};

export default reactivateUserService;
