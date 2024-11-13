import jsonwebtoken from "jsonwebtoken";
import crypto from "node:crypto";
import { sql } from "./db/connection.js";
import { logger } from "./logger/logger.js";

const API_SECRET = process.env.API_SECRET;

// TODO move salt to the secrets manager
const SALT = ";:5}%(YD[M?R?gXrie9[eP4\\2o*+lqZE"; // This should be a secret for all passwords (maybe in general will move all users to the Cognito)

const saltPass = (password) => crypto.createHmac("sha512", SALT).update(password).digest("hex");


/**
 *
 * @param {import("aws-lambda").APIGatewayEvent} event
 * @param context
 *
 * @returns {import("aws-lambda").APIGatewayProxyResult}
 */
export const handler = async (event, context) => {
    logger.info(event);
    const method = event.httpMethod;
    const path = event.path;

    let queryResponse;
    let response = {statusCode: 200};

    try {
        if (method === "POST" && path === "/auth/login") {
            const {email, password} = JSON.parse(event.body);
            const saltedPassword = saltPass(password);


            queryResponse = await sql`SELECT id, email
                                      FROM users
                                 WHERE email = ${email}
                                   AND password_hash = ${saltedPassword}
                                      LIMIT 1`;


            const token = jsonwebtoken.sign({...queryResponse[0]}, API_SECRET, {algorithm: "HS256", expiresIn: "1h"});

            response["body"] = JSON.stringify({token});

            return response;
        }

        if (method === "POST" && path === "/auth/register") {

            const {name, email, password} = JSON.parse(event.body);
            const saltedPassword = saltPass(password);

            queryResponse = await sql`INSERT INTO users (username, email, password_hash)
                                      VALUES (${name}, ${email}, ${saltedPassword})
                                      RETURNING username, email`;

            response["body"] = JSON.stringify({message: `User ${queryResponse[0].username} has been successfully created.`});
        }

        return response;
    } catch (error) {
        queryResponse = {
            error: error.message
        };

        return {
            statusCode: 400, body: JSON.stringify({response: queryResponse}),
        };
    }

};
