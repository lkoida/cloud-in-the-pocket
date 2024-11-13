import { sql } from "../db/connection.js";

/**
 *
 * @param {String} todo_list_id
 * @param {String} owner_id
 * @param {String[]} emails
 *
 * @returns {Promise<void>}
 */
export const addSharedTodo = async ({todo_list_id, owner_id, emails}) => {
    for (const email of emails) {
        await sql`
            INSERT INTO shared_todos
                (todo_list_id, owner_id, shared_with)
            VALUES ((${todo_list_id})::integer, (${owner_id})::integer, ${email});
        `;
    }
};
