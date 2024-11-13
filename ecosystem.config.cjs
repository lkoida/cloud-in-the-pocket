module.exports = {
    apps: [
        {
            name: "authenticator",
            cwd: './lambdas/authenticator',
            script: "npm",
            args: "run dev"
        },
        {
            name: "email",
            cwd: './lambdas/email',
            script: "npm",
            args: "run dev"
        },
        {
            name: "todo",
            cwd: './lambdas/todo',
            script: "npm",
            args: "run dev"
        },
        {
            name: "user",
            cwd: './lambdas/user',
            script: "npm",
            args: "run dev"
        }
    ]
};
