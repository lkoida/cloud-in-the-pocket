import { sql } from "../db/connection.js";

export const getTodosByListId = async ({todo_list_id}) => {
    return sql`SELECT *,
                      ARRAY(SELECT file_path FROM attachments WHERE todo_id = t.id) AS attachments
               FROM todos t
               WHERE todo_list_id = (${todo_list_id})::integer`;
};
