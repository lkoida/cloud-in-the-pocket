#!/usr/bin/env bash

ENDPOINT=http://localhost:4566
REGION=eu-west-2

# create API ID with name api
# we will refer to it al the time during the following steps
awslocal apigateway create-rest-api \
  --region "$REGION" \
  --endpoint-url="$ENDPOINT" \
  --name api-v1


