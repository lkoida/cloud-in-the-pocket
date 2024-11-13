import { sql } from "../db/connection.js";

export const getTodosByUserId = async ({userId}) => {
    return sql`SELECT *
               FROM todos
               WHERE user_id = ${userId}`;
};
