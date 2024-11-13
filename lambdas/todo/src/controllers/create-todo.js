import { sql } from "../db/connection.js";

export const createTodo = async ({todo_list_id, title, description, dueDate}) => {
    return sql`INSERT INTO todos (todo_list_id, title, description, due_date)
               VALUES (${todo_list_id}, ${title}, ${description}, ${dueDate})
               RETURNING *`;
};
