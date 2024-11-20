#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import {LambdaStack} from "../lib/lambdas/LambdaStack";
import {ApiGatewayStack} from "../lib/gateway/ApiGatewayStack";
import {BucketStack} from "../lib/buckets/BucketStack";
import {SQSStack} from "../lib/sqs/SQSStack";

const app = new cdk.App();

new SQSStack(app, "SQSStack", {
    env: {
        region: "eu-west-2"
    }
})

new BucketStack(app, "BucketStack", {
    env: {
        region: "eu-west-2"
    }
})

new LambdaStack(app, "LambdaStack", {
    env: {
        region: "eu-west-2"
    }
});

new ApiGatewayStack(app, "ApiGatewayStack", {
    env: {
        region: "eu-west-2"
    }
})
