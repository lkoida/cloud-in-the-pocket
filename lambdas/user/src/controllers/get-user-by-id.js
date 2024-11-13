import { sql } from "../db/connection.js";

export const getUserById = async ({id}) => {
    return sql`SELECT id, username, email
               FROM users
               WHERE id = (${id})::integer
               LIMIT 1`;
};
