import { sql } from "../db/connection.js";

export const deleteTodo = async ({id}) => {
    return sql`DELETE
               FROM todos
               WHERE id = ${id}
               RETURNING id`;
};
