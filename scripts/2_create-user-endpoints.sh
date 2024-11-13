#!/usr/bin/env bash

echo -e "\033[0;32m ENDPOINTS FOR USER \033[0m"

ENDPOINT=http://localhost:4566

REGION=eu-west-2

URI=arn:aws:apigateway:"$REGION":lambda:path/2015-03-31/functions/arn:aws:lambda:"$REGION":000000000000:function:users/invocations

#retrieve previously created api_id
API_ID=$(
  awslocal apigateway get-rest-apis \
    --region "$REGION" \
    --output text \
    --query "items[?name==\`api-v1\`].id"
)

ROOT_ENDPOINT=$(
  awslocal apigateway get-resources \
    --region "$REGION" \
    --rest-api-id "$API_ID" \
    --query "items[?path=='/'].id" \
    --output text
)


# create resources (aka endpoints)
# this one will reflect the path /users
awslocal apigateway create-resource \
  --region "$REGION" \
  --rest-api-id "$API_ID" \
  --endpoint-url="$ENDPOINT" \
  --parent-id "$ROOT_ENDPOINT" \
  --path-part "users"

USERS_ENDPOINT_ID=$(
  awslocal apigateway get-resources \
    --rest-api-id "$API_ID" \
    --region "$REGION" \
    --query "items[?path=='/users'].id" \
    --output text
)


# create resources to retrieve one user
awslocal apigateway create-resource \
  --region "$REGION" \
  --rest-api-id "$API_ID" \
  --endpoint-url="$ENDPOINT" \
  --parent-id "$USERS_ENDPOINT_ID" \
  --path-part "{user_id}"

SINGLE_USER_ENDPOINT_ID=$(
  awslocal apigateway get-resources \
    --rest-api-id "$API_ID" \
    --region "$REGION" \
    --query "items[?path=='/users/{user_id}'].id" \
    --output text)

  # add the METHOD(VERB) to get/post users
awslocal apigateway put-method \
  --region "$REGION" \
  --rest-api-id "$API_ID" \
  --resource-id "$USERS_ENDPOINT_ID" \
  --http-method "GET" \
  --request-parameters method.request.path.users=true \
  --authorization-type "NONE"

awslocal apigateway put-method \
  --region "$REGION" \
  --rest-api-id "$API_ID" \
  --resource-id "$USERS_ENDPOINT_ID" \
  --http-method "POST" \
  --request-parameters method.request.path.users=true \
  --authorization-type "NONE"

# add the METHOD(VERB) to get/put/delete single user

awslocal apigateway put-method \
  --region "$REGION" \
  --rest-api-id "$API_ID" \
  --resource-id "$SINGLE_USER_ENDPOINT_ID" \
  --http-method "GET" \
  --request-parameters method.request.path.user_id=true \
  --authorization-type "NONE"

awslocal apigateway put-method \
   --region "$REGION" \
    --rest-api-id "$API_ID" \
    --resource-id "$SINGLE_USER_ENDPOINT_ID" \
    --http-method "PUT" \
    --request-parameters method.request.path.user_id=true \
    --authorization-type "NONE"

awslocal apigateway put-method \
    --region "$REGION" \
    --rest-api-id "$API_ID" \
    --resource-id "$SINGLE_USER_ENDPOINT_ID" \
    --http-method "DELETE" \
    --request-parameters method.request.path.user_id=true \
    --authorization-type "NONE"

# integrate the endpoint with the lambda function

awslocal apigateway put-integration \
  --region "$REGION" \
  --rest-api-id "$API_ID" \
  --resource-id "$USERS_ENDPOINT_ID" \
  --http-method "GET" \
  --type "AWS_PROXY" \
  --integration-http-method "POST" \
  --uri "$URI" \
  --passthrough-behavior "WHEN_NO_MATCH"

awslocal apigateway put-integration \
  --region "$REGION" \
  --rest-api-id "$API_ID" \
  --resource-id "$USERS_ENDPOINT_ID" \
  --http-method "POST" \
  --type "AWS_PROXY" \
  --integration-http-method "POST" \
  --uri "$URI" \
  --passthrough-behavior "WHEN_NO_MATCH"



awslocal apigateway put-integration \
  --region "$REGION" \
  --rest-api-id "$API_ID" \
  --resource-id "$SINGLE_USER_ENDPOINT_ID" \
  --http-method "GET" \
  --type "AWS_PROXY" \
  --integration-http-method "POST" \
  --uri "$URI" \
  --passthrough-behavior "WHEN_NO_MATCH"

awslocal apigateway put-integration \
  --region "$REGION" \
  --rest-api-id "$API_ID" \
  --resource-id "$SINGLE_USER_ENDPOINT_ID" \
  --http-method "PUT" \
  --type "AWS_PROXY" \
  --integration-http-method "POST" \
  --uri "$URI" \
  --passthrough-behavior "WHEN_NO_MATCH"

awslocal apigateway put-integration \
  --region "$REGION" \
  --rest-api-id "$API_ID" \
  --resource-id "$SINGLE_USER_ENDPOINT_ID" \
  --http-method "DELETE" \
  --type "AWS_PROXY" \
  --integration-http-method "POST" \
  --uri "$URI" \
  --passthrough-behavior "WHEN_NO_MATCH"
