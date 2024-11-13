import { sql } from "../db/connection.js";

export const createUser = async ({name, email, password}) => {
    return sql`INSERT INTO users (username, email, password_hash)
               VALUES (${name}, ${email}, ${password})
               ON CONFLICT DO NOTHING
               RETURNING id, username, email`;
};
