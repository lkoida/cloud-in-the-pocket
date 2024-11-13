export const authResponse = (jsonPath) => {
    const token = jsonPath(response.body, "$.token");
    client.test("Token should not be empty", () => {
        client.assert(token !== "" && token !== "", "Token is empty");
    });

    client.global.set("auth", `Bearer ${token}`);
};

export const setTodoId = (jsonPath) => {
    const todoID = jsonPath(response.body, "$[0].id");

    client.global.set("todo_id", todoID);
};
