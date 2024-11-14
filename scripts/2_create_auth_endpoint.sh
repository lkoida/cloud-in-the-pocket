#!/usr/bin/env bash

echo -e "\033[0;32m ENDPOINTS FOR AUTHENTICATOR \033[0m"

ENDPOINT=http://localhost:4566

REGION=eu-west-2

URI=arn:aws:apigateway:"$REGION":lambda:path/2015-03-31/functions/arn:aws:lambda:"$REGION":000000000000:function:authenticator/invocations

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

#main /auth endpoint
awslocal apigateway create-resource \
  --region "$REGION" \
  --rest-api-id "$API_ID" \
  --endpoint-url="$ENDPOINT" \
  --parent-id "$ROOT_ENDPOINT" \
  --path-part "auth"

AUTH_ENDPOINT_ID=$(
  awslocal apigateway get-resources \
    --rest-api-id "$API_ID" \
    --region "$REGION" \
    --query "items[?path=='/auth'].id" \
    --output text
)

# create resources to /register user
awslocal apigateway create-resource \
  --region "$REGION" \
  --rest-api-id "$API_ID" \
  --endpoint-url="$ENDPOINT" \
  --parent-id "$AUTH_ENDPOINT_ID" \
  --path-part "register"

# create resources to /login user
awslocal apigateway create-resource \
  --region "$REGION" \
  --rest-api-id "$API_ID" \
  --endpoint-url="$ENDPOINT" \
  --parent-id "$AUTH_ENDPOINT_ID" \
  --path-part "login"

REGISTER_ENDPOINT_ID=$(
  awslocal apigateway get-resources \
    --rest-api-id "$API_ID" \
    --region "$REGION" \
    --query "items[?path=='/auth/register'].id" \
    --output text
)

LOGIN_ENDPOINT_ID=$(
  awslocal apigateway get-resources \
    --rest-api-id "$API_ID" \
    --region "$REGION" \
    --query "items[?path=='/auth/login'].id" \
    --output text
)

awslocal apigateway put-method \
  --region "$REGION" \
  --rest-api-id "$API_ID" \
  --resource-id "$REGISTER_ENDPOINT_ID" \
  --http-method "POST" \
  --request-parameters method.request.path.register=true \
  --authorization-type "NONE"

awslocal apigateway put-method \
  --region "$REGION" \
  --rest-api-id "$API_ID" \
  --resource-id "$LOGIN_ENDPOINT_ID" \
  --http-method "POST" \
  --request-parameters method.request.path.login=true \
  --authorization-type "NONE"

awslocal apigateway put-integration \
  --region "$REGION" \
  --rest-api-id "$API_ID" \
  --resource-id "$REGISTER_ENDPOINT_ID" \
  --http-method "POST" \
  --type "AWS_PROXY" \
  --integration-http-method "POST" \
  --uri "$URI" \
  --passthrough-behavior "WHEN_NO_MATCH"

awslocal apigateway put-integration \
  --region "$REGION" \
  --rest-api-id "$API_ID" \
  --resource-id "$LOGIN_ENDPOINT_ID" \
  --http-method "POST" \
  --type "AWS_PROXY" \
  --integration-http-method "POST" \
  --uri "$URI" \
  --passthrough-behavior "WHEN_NO_MATCH"
