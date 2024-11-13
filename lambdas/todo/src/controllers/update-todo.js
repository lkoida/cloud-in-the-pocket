import { sql } from "../db/connection.js";

export const updateTodo = async ({id, title, description, due_date}) => {
    const [todo] = await sql`
        SELECT *
        FROM todos
        WHERE id = ${id};
    `;

    return sql`UPDATE todos
               SET title = ${title ?? todo.title},
                   description = ${description ?? todo.description},
                   due_date = ${due_date ?? todo.due_date}
               WHERE id = ${id}
               RETURNING *`;
};
