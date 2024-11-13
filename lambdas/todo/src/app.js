import { SendMessageCommand, SQSClient } from "@aws-sdk/client-sqs";
import * as crypto from "node:crypto";
import {
    addSharedTodo,
    createTodo,
    createTodoList,
    deleteTodo,
    getAllTodoListsByUserId,
    getSharedList,
    getTodosByListId,
    updateTodo
} from "./controllers/index.js";
import { logger } from "./logger/logger.js";

const config = {
    region: process.env.REGION,
    endpoint: process.env.AWS_ENDPOINT_URL,
    credentials: {
        accessKeyId: "test",
        secretAccessKey: "test"
    },
    apiVersion: "2012-10-17",
};

const queueUrl = process.env.QUEUE_URL || "";

const client = new SQSClient(config);

/**
 *
 * @param {import("aws-lambda").APIGatewayEvent} event
 * @param context
 *
 * @returns {Promise<import("aws-lambda").APIGatewayProxyResult>}
 */
export const handler = async (event) => {
    const method = event.httpMethod;
    const resource = event.resource;
    let token;
    let payload;
    let user_id;
    let email;

    if (event.headers.Authorization) {
        ;[, token] = event.headers.Authorization.split(" ");
        ;[, payload,] = token.split(".");
        ({id: user_id, email} = JSON.parse(Buffer.from(payload, "base64").toString("utf-8")));
    }

    const todo_list_id = event.pathParameters.todo_list_id ?? null;
    const todo_id = event.pathParameters.todo_id ?? null;

    logger.info({body: event.body, todo_list_id, user_id});

    const methodResource = `[${method}]${resource}`;

    let response;

    try {
        switch (methodResource) {
            case "[POST]/todo-lists":
                const {title, description = ""} = JSON.parse(event.body);

                response = await createTodoList({user_id, title, description});

                break;
            case "[GET]/todo-lists":
                response = await getAllTodoListsByUserId({user_id});

                break;
            case "[PUT]/todos/list/{todo_list_id}":
                response = {message: "not implemented yet"};

                break;
            case "[POST]/todo-lists/{todo_list_id}/todos":
                if (!todo_list_id) return Promise.reject("not enough params");

                response = await createTodo({todo_list_id, ...JSON.parse(event.body)});

                break;
            case "[GET]/todo-lists/{todo_list_id}/todos":
                if (!todo_list_id) return Promise.reject("not enough params");

                response = await getTodosByListId({todo_list_id});

                break;
            case "[PUT]/todos/{todo_id}":
                if (!todo_id) return Promise.reject("not enough arguments for todo update");

                response = await updateTodo({id: todo_id, user_id: user_id, ...JSON.parse(event.body)});

                break;
            case "[POST]/todo-lists/{todo_list_id}/share":
                if (!todo_list_id) return Promise.reject("not enough params for todo share");

                await addSharedTodo({todo_list_id, owner_id: user_id, emails: JSON.parse(event.body).emails});

                const command = new SendMessageCommand({
                    MessageBody: JSON.stringify({from: email, to: JSON.parse(event.body), todoListId: todo_list_id}),
                    QueueUrl: queueUrl,
                    MessageGroupId: crypto.randomUUID(),
                    MessageDeduplicationId: crypto.randomUUID()
                });

                await client.send(command);

                break;
            case "[GET]/todo-lists/{todo_list_id}/shared":
                if (!event.queryStringParameters?.["email"]) return Promise.reject("email is missing");

                response = await getSharedList({email: event.queryStringParameters?.["email"], todo_list_id});

                break;
            case "[DELETE]/todos/{todo_id}":
                if (!todo_id) return Promise.reject("not enough arguments for todo update");

                response = await deleteTodo({id: todo_id});

                break;
            default:
                logger.info(methodResource);
                response = {
                    error: "Method not allowed", event
                };
        }

        return {
            statusCode: 200,
            body: JSON.stringify(response),
        };
    } catch (e) {
        response = {
            error: e.message, event
        };

        return {
            statusCode: 400,
            body: JSON.stringify(response),
        };
    }
};
