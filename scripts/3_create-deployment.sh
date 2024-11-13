#!/usr/bin/env bash

REGION=eu-west-2

API_ID=$(
  awslocal apigateway get-rest-apis \
    --region "$REGION" \
    --output text \
    --query "items[?name==\`api-v1\`].id"
)


# deploy the api gateway
awslocal apigateway create-deployment \
  --region "$REGION" \
  --rest-api-id "$API_ID" \
  --stage-name "use-case"


echo -e "\033[0;32m DEPLOYMENT CREATED! API_KEY: ${API_ID} \033[0m"
