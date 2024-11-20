import {aws_apigateway, aws_lambda, aws_ssm, Stack, StackProps} from "aws-cdk-lib";
import {Construct} from "constructs";

export class ApiGatewayStack extends Stack {
    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);

        const gateway = new aws_apigateway.RestApi(this, "todo-app-rest-api", {
            restApiName: "todo-app-rest-api",
            description: "Use case for localstack work with CDK",
            cloudWatchRole: true,
            endpointTypes: [aws_apigateway.EndpointType.EDGE],
            defaultCorsPreflightOptions: {
                allowOrigins: aws_apigateway.Cors.ALL_ORIGINS, // should be a list of strings of allowed origins
                allowMethods: aws_apigateway.Cors.ALL_METHODS
            }
        });

        // TODO add attachments lambda after creation of it in the dedicated directory

        const authResource = aws_lambda.Function.fromFunctionAttributes(
            this,
            "AuthenticatorLambdaFunction",
            {
                sameEnvironment: true,
                functionArn: aws_ssm.StringParameter.fromStringParameterName(
                    this,
                    "AuthenticatorLambdaFunctionArn",
                    "/authenticator-resource-arn"
                ).stringValue
            }
        )

        const userResource = aws_lambda.Function.fromFunctionAttributes(
            this,
            "UserLambdaFunction",
            {
                sameEnvironment: true,
                functionArn: aws_ssm.StringParameter.fromStringParameterName(
                    this,
                    "UserLambdaFunctionArn",
                    "/user-resource-arn"
                ).stringValue
            }
        )

        const todoResource = aws_lambda.Function.fromFunctionAttributes(
            this,
            "TodoLambdaFunction",
            {
                sameEnvironment: true,
                functionArn: aws_ssm.StringParameter.fromStringParameterName(
                    this,
                    "TodoLambdaFunctionArn",
                    "/todo-resource-arn"
                ).stringValue
            }
        )

        // TODO should be implemented as a part of authorizer implementation

        // TODO register Request Authorizer
        const users = gateway.root.addResource("users");
        const todoLists = gateway.root.addResource("todo-lists");
        const todo = gateway.root.addResource('todos')
        const auth = gateway.root.addResource("auth");
        const attachments = gateway.root.addResource("attachments");

        auth.addResource('register').addMethod("POST", new aws_apigateway.LambdaIntegration(authResource));
        auth.addResource('login').addMethod("POST", new aws_apigateway.LambdaIntegration(authResource));

        // TODO extract the authorizer into options object

        // region USERS
        users.addMethod("GET", new aws_apigateway.LambdaIntegration(userResource));
        users.addMethod("POST", new aws_apigateway.LambdaIntegration(userResource));

        const user = users.addResource("me");
        user.addMethod("GET", new aws_apigateway.LambdaIntegration(userResource));
        //TODO add PUT method to api gateway
        user.addMethod("DELETE", new aws_apigateway.LambdaIntegration(userResource));
        // endregion

        // region TODOS
        todoLists.addMethod("GET", new aws_apigateway.LambdaIntegration(todoResource))
        todoLists.addMethod("POST", new aws_apigateway.LambdaIntegration(todoResource))

        const todoList = todoLists.addResource('{todo_list_id}')

        todoList.addResource('share')
            .addMethod("POST", new aws_apigateway.LambdaIntegration(todoResource))

        todoList.addResource('shared')
            .addMethod("GET", new aws_apigateway.LambdaIntegration(todoResource), {
                requestParameters: {
                    'integration.request.querystring.email': true,
                }
            })

        const todos = todoList.addResource('todos')
        todos.addMethod("GET", new aws_apigateway.LambdaIntegration(todoResource))
        todos.addMethod("POST", new aws_apigateway.LambdaIntegration(todoResource))

        const todoItem = todo.addResource('{todo_id}')
        todoItem.addMethod("PUT", new aws_apigateway.LambdaIntegration(todoResource))
        todoItem.addMethod("DELETE", new aws_apigateway.LambdaIntegration(todoResource))
        // endregion

        // region ATTACHMENTS
        // TODO should be implemented as a part of attachments integration
        // endregion
    }
}
