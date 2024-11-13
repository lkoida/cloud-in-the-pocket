import { sql } from "../db/connection.js";

/**
 *
 * @param {String} email
 * @param {String} todo_list_id
 */
export const getSharedList = async ({email, todo_list_id}) => {
    return sql`
        SELECT todos.todo_list_id,
               todos.title,
               todos.description,
               todos.due_date,
               tl.id,
               tl.title,
               tl.description,
               pu.username AS owner_name
        FROM todos
                 INNER JOIN public.shared_todos st ON todos.todo_list_id = st.todo_list_id
                 INNER JOIN public.todo_lists tl ON st.todo_list_id = tl.id
                 INNER JOIN public.users pu ON st.owner_id = pu.id
        WHERE st.shared_with = ${email}
          AND st.todo_list_id = (${todo_list_id})::integer
    `;
};
