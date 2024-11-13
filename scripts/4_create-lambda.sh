#!/usr/bin/env bash

DB_HOST=$(awslocal secretsmanager get-secret-value --secret-id HOST --query SecretString --output text)
DB_USER=$(awslocal secretsmanager get-secret-value --secret-id USER --query SecretString --output text)
DB_PORT=$(awslocal secretsmanager get-secret-value --secret-id PORT --query SecretString --output text)
DB_PASSWORD=$(awslocal secretsmanager get-secret-value --secret-id PASSWORD --query SecretString --output text)
DB_DATABASE=$(awslocal secretsmanager get-secret-value --secret-id DATABASE --query SecretString --output text)
API_SECRET=$(awslocal secretsmanager get-secret-value --secret-id API_SECRET --query SecretString --output text)

# other lambdas should not know about API_SECRET this check should be done on the gateway level
awslocal lambda create-function \
  --function-name "users" \
  --handler app.handler \
  --runtime nodejs20.x \
  --region eu-west-2 \
  --environment Variables="{HOST=${DB_HOST},USER=${DB_USER},PORT=${DB_PORT},DATABASE=${DB_DATABASE},PASSWORD=${DB_PASSWORD}}" \
  --code S3Bucket='hot-reload',S3Key="${PWD}/lambdas/user/dist" \
  --role arn:aws:iam::000000000000:role/lambda-role \
  --query 'FunctionName' \
  --output text

awslocal lambda create-function \
  --function-name "todos" \
  --handler app.handler \
  --runtime nodejs20.x \
  --region eu-west-2 \
  --environment Variables="{HOST=${DB_HOST},USER=${DB_USER},PORT=${DB_PORT},DATABASE=${DB_DATABASE},PASSWORD=${DB_PASSWORD}}" \
  --code S3Bucket='hot-reload',S3Key="${PWD}/lambdas/todo/dist" \
  --role arn:aws:iam::000000000000:role/lambda-role \
  --query 'FunctionName' \
  --output text

awslocal lambda create-function \
  --function-name "emails" \
  --handler app.handler \
  --runtime nodejs20.x \
  --region eu-west-2 \
  --environment Variables="{HOST=${DB_HOST},USER=${DB_USER},PORT=${DB_PORT},DATABASE=${DB_DATABASE},PASSWORD=${DB_PASSWORD}}" \
  --code S3Bucket='hot-reload',S3Key="${PWD}/lambdas/email/dist" \
  --role arn:aws:iam::000000000000:role/lambda-role \
  --query 'FunctionName' \
  --output text

# authenticator lambda should know about API_SECRET to create a token on login or register action
awslocal lambda create-function \
  --function-name "authenticator" \
  --handler app.handler \
  --runtime nodejs20.x \
  --region eu-west-2 \
  --environment Variables="{HOST=${DB_HOST},USER=${DB_USER},PORT=${DB_PORT},DATABASE=${DB_DATABASE},PASSWORD=${DB_PASSWORD},API_SECRET=${API_SECRET}}" \
  --code S3Bucket='hot-reload',S3Key="${PWD}/lambdas/user/dist" \
  --role arn:aws:iam::000000000000:role/lambda-role \
  --query 'FunctionName' \
  --output text

awslocal lambda create-function \
  --function-name "api-gateway-auth" \
  --handler app.handler \
  --runtime nodejs20.x \
  --region eu-west-2 \
  --environment Variables="{HOST=${DB_HOST},USER=${DB_USER},PORT=${DB_PORT},DATABASE=${DB_DATABASE},PASSWORD=${DB_PASSWORD},API_SECRET=${API_SECRET}}" \
  --code S3Bucket='hot-reload',S3Key="${PWD}/lambdas/api-gateway-auth/dist" \
  --role arn:aws:iam::000000000000:role/lambda-role \
  --query 'FunctionName' \
  --output text
