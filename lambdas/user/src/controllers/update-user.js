import { sql } from "../db/connection.js";

export const updateUser = async ({id, name, email}) => {
    return sql`
        UPDATE users
        SET username = COALESCE(${name ?? null}, username),
            email = COALESCE(${email ?? null}, email)
        WHERE id = (${id})::integer
        RETURNING id, username, email`;
};
