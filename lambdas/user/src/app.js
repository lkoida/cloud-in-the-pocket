import { deleteUser, getUserById, getUsers, updateUser } from "./controllers";


/**
 *
 * @param {import("aws-lambda").APIGatewayEvent} event
 * @param context
 *
 * @returns {import("aws-lambda").APIGatewayProxyResult}
 */
export const handler = async (event, context) => {
    const method = event.httpMethod;
    const resource = event.resource;

    const userId = JSON.parse(
        Buffer.from(
            event.headers.Authorization
                .split(" ")[1] // Extract the token form the 'Bearer ....' string
                .split(".")[1], "base64") // Extract the payload part from the token
            .toString("utf-8")
    ).id;

    const methodResource = `[${method}]${resource}`;

    let response;

    try {
        switch (methodResource) {
            case "[GET]/users":
                response = await getUsers();
                break;
            case "[GET]/users/me":
                response = await getUserById({id: userId});
                break;
            case "[PUT]/users/me":// TODO maybe this could be a good example of API Gateway and Lambda update
                response = await updateUser({id: userId, ...JSON.parse(event.body)});
                break;
            case "[DELETE]/users/me":
                response = await deleteUser({id: userId});
                break;
            default:
                response = {
                    error: `Method not allowed ${methodResource}`
                };

        }
    } catch (e) {
        response = {
            error: e.message
        };

        return {
            statusCode: 400,
            body: JSON.stringify({response, event}),
        };
    }

    return {
        statusCode: 200,
        body: JSON.stringify(response),
    };
};
