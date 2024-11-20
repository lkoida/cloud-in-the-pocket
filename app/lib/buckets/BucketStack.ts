import {aws_s3, Stack, StackProps} from "aws-cdk-lib";
import {Construct} from "constructs";
import {bucketName} from "../helpers/index";
import {HttpMethods} from "aws-cdk-lib/aws-s3";

export class BucketStack extends Stack {
    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);

        new aws_s3.Bucket(this, `id-${bucketName}`, {
            bucketName: bucketName,
            blockPublicAccess: aws_s3.BlockPublicAccess.BLOCK_ALL,
            accessControl: aws_s3.BucketAccessControl.BUCKET_OWNER_FULL_CONTROL,
            transferAcceleration: true,
            cors: [
                {
                    allowedOrigins: ["*"],// TODO in prod this should be as strict as possible
                    allowedHeaders: ['*'], // TODO in prod this should be as strict as possible
                    allowedMethods: [HttpMethods.DELETE, HttpMethods.HEAD, HttpMethods.POST, HttpMethods.PUT, HttpMethods.GET],
                    maxAge: 5000
                }
            ],
        })
    }
}
