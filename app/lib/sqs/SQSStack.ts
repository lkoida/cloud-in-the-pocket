import {aws_sqs, aws_ssm, Stack, StackProps} from "aws-cdk-lib";
import {Construct} from "constructs";

export class SQSStack extends Stack {
    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);

        const todoListSqs = new aws_sqs.Queue(this, "todo-list-share-queue.fifo", {
            fifo: true,
            queueName: "todo-list-share-queue.fifo",
            contentBasedDeduplication: true
        })

        new aws_ssm.StringParameter(this, `todo-list-share-queue-arn`, {
            parameterName: `/todo-list-share-queue-resource-arn`,
            stringValue: todoListSqs.queueArn,
        })
    }
}
