import { sql } from "../db/connection.js";

export const deleteUser = async ({id}) => {
    return sql`DELETE
               FROM users
               WHERE id = ${id}
               RETURNING id`;
};
