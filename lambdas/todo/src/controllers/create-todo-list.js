import { sql } from "../db/connection.js";
import { logger } from "../logger/logger.js";

export const createTodoList = async ({user_id, title, description = ""}) => {
    logger.info({user_id, title, description});
    return sql`
        INSERT INTO todo_lists
            (user_id, title, description)
        VALUES ((${user_id})::integer, ${title}, ${description})
        RETURNING id, user_id, title, description;
    `;
};

