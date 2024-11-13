import { sql } from "../db/connection.js";

export const users = async (limit = 10) => {
    return sql`SELECT id, username, email
               FROM users
               LIMIT ${limit}`;
};
