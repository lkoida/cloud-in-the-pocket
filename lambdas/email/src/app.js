import { SendEmailCommand, SESClient } from "@aws-sdk/client-ses";
import { logger } from "./logger/logger.js";


const REGION = process.env.REGION;
const ENDPOINT = process.env.ENDPOINT;

const options = {
    region: REGION,
    endpoint: `http://${ENDPOINT}`,
};
const ses = new SESClient(options[0]);

/**
 *
 * @param {import("aws-lambda").SQSEvent} event
 *
 * @returns {import("aws-lambda").APIGatewayProxyResult}
 */
export const handler = async (event) => {

    const {to: {emails}, from, todoListId} = JSON.parse(event.Records[0].body);
    
    const sendCommand = new SendEmailCommand({
        Destination: {
            BccAddresses: [...emails]
        },
        Source: from,
        Message: {
            Subject: {
                Charset: "UTF-8",
                Data: "Share the todo list!"
            },
            Body: {
                Html: {
                    Charset: "UTF-8",
                    Data: `
                    <h1>Hi,I Wanted to share with all of you this tod list</h1>
                    <p>Here we can find the all points we have to finish before our event!</p>
                    <p>Here you can find a link to shared todo: <a href="http://${ENDPOINT}/todo_lists/${todoListId}/shared">Todo List name</a></p>
                    `
                }
            }
        }
    })
    const result = await ses.send(sendCommand);

    logger.info(result);
    return {
        statusCode: 200,
        body: JSON.stringify({message: "email send", result}),
    };
};
