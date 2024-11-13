export const userEmails = [
    "john.doe@example.com",
    "jane.smith@example.com",
    "michael.johnson@example.com",
    "emily.davis@example.com",
    "william.brown@example.com",
    "olivia.jones@example.com",
    "james.miller@example.com",
    "sophia.wilson@example.com",
    "benjamin.moore@example.com",
    "isabella.taylor@example.com",
    "alexander.anderson@example.com",
    "mia.thomas@example.com",
    "daniel.jackson@example.com",
    "ava.white@example.com",
    "matthew.harris@example.com",
    "charlotte.martin@example.com",
    "david.thompson@example.com",
    "amelia.garcia@example.com",
    "joseph.martinez@example.com",
    "abigail.rodriguez@example.com",
];

export const preRegister = () => {
    return userEmails.map((email) => {
        const [user,] = email.split("@");
        return {
            name: user.split(".").join(" "),
            email,
            password: user
        };
    });
};


export const createNewTodoInList = () => {
    const now = new Date();
    const due = 7;
    return new Date(now.setDate(now.getDate() + due)).toISOString();
};
