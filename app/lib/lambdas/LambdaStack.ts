import {aws_lambda as Lambda, aws_s3, aws_s3 as S3, aws_sqs, aws_ssm, SecretValue, Stack, StackProps} from "aws-cdk-lib"
import {SqsEventSource} from 'aws-cdk-lib/aws-lambda-event-sources';

import {Construct} from "constructs";
import * as path from "node:path";
import {bucketName, lambdas} from "../helpers";

export class LambdaStack extends Stack {
    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);

        const HOST = SecretValue.secretsManager('DB_CREDENTIALS', {jsonField: 'HOST'}).unsafeUnwrap().toString();
        const PORT = SecretValue.secretsManager('DB_CREDENTIALS', {jsonField: 'PORT'}).unsafeUnwrap().toString();
        const USER = SecretValue.secretsManager('DB_CREDENTIALS', {jsonField: 'USER'}).unsafeUnwrap().toString();
        const DATABASE = SecretValue.secretsManager('DB_CREDENTIALS', {jsonField: 'DATABASE'}).unsafeUnwrap().toString();
        const PASSWORD = SecretValue.secretsManager('DB_CREDENTIALS', {jsonField: 'PASSWORD'}).unsafeUnwrap().toString();

        const API_SECRET = SecretValue.secretsManager('API_SECRET').unsafeUnwrap().toString();
        const REGION = SecretValue.secretsManager('REGION').unsafeUnwrap().toString();
        const ENDPOINT = SecretValue.secretsManager('ENDPOINT').unsafeUnwrap().toString();
        // const BUCKET = SecretValue.secretsManager('BUCKET').unsafeUnwrap().toString();

        const queue = aws_sqs
            .Queue
            .fromQueueArn(
                this,
                'todo-sqs',
                aws_ssm.StringParameter.fromStringParameterName(
                    this,
                    'todo-queue-attributes',
                    '/todo-list-share-queue-resource-arn')
                    .stringValue
            )

        const mediaBucket = aws_s3.Bucket.fromBucketName(this, 'media-todo-attachments-bucket', bucketName)

        for (const lambdaName of lambdas) {
            const lambda = new Lambda.Function(this, lambdaName, {
                functionName: `localstack-use-case-${lambdaName}-endpoint`,
                runtime: Lambda.Runtime.NODEJS_20_X,
                handler: "app.handler",
                code: Lambda.Code.fromBucket(
                    S3.Bucket.fromBucketName(this, `hot-reloading-buket-${lambdaName}`, 'hot-reload'),
                    path.join(__dirname, `../../../lambdas/${lambdaName}/dist`)
                ),
                environment: {
                    HOST,
                    PORT,
                    USER,
                    PASSWORD,
                    REGION,
                    DATABASE,
                    ...(['authenticator', 'api-gateway-auth'].includes(lambdaName) && {API_SECRET}),
                    ...(lambdaName === 'todo' && {QUEUE_URL: queue.queueUrl}),
                    ...(["email", "attachment", "todo"].includes(lambdaName) && {ENDPOINT}),
                    // ...(lambdaName === "attachment" && {BUCKET}),
                }
            });

            if (lambdaName === "todo") {
                queue.grantSendMessages(lambda)
            }

            if (lambdaName === "email") {
                const eventSource = new SqsEventSource(queue)
                lambda.addEventSource(eventSource)
            }

            // if (lambdaName === "attachment") {
            //     mediaBucket.grantRead(lambda)
            //     mediaBucket.grantWrite(lambda)
            // }

            new aws_ssm.StringParameter(this, `${lambdaName}-arn`, {
                parameterName: `/${lambdaName}-resource-arn`,
                stringValue: lambda.functionArn,
            })
        }
    }
}
