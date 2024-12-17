#!/usr/bin/env bash

#IMPORTANT:
#IMPORTANT - This secret manager values used like this just for presentation purpose
#IMPORTANT -  Don't do this in real environment!!! In real env the secret values should be
#IMPORTANT - generated and put directly in AWS Console, and consumed by secrets-manager service

awslocal secretsmanager create-secret \
  --name "DB_CREDENTIALS" \
  --region "eu-west-2" \
  --secret-string "{\"HOST\": \"postgres\",\"USER\": \"postgres\",\"PASSWORD\": \"postgres\",\"DATABASE\": \"service_db\",\"PORT\": \"5432\"}"

awslocal secretsmanager create-secret \
  --name "API_SECRET" \
  --region "eu-west-2" \
  --secret-string "supersecret"

awslocal secretsmanager create-secret \
  --name "REGION" \
  --region "eu-west-2" \
  --secret-string "eu-west-2"

awslocal secretsmanager create-secret \
  --name "ENDPOINT" \
  --region "eu-west-2" \
  --secret-string "localhost.localstack.cloud:4566"

awslocal secretsmanager create-secret \
  --name "BUCKET" \
  --region "eu-west-2" \
  --secret-string "todo-app-bucket"

awslocal secretsmanager create-secret \
  --name "SALT" \
  --region "eu-west-2" \
  --secret-string ";:5}%(YD[M?R?gXrie9[eP4\\2o*+lqZE"
