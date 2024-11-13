import { sql } from "../db/connection.js";
import { logger } from "../logger/logger.js";

export const getAllTodoListsByUserId = async ({user_id}) => {
    logger.info({user_id});
    return sql`
        SELECT *
        FROM todo_lists
        WHERE user_id = (${user_id})::integer;
    `;
};
