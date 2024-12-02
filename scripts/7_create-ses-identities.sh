#!/usr/bin/env bash

REGION=eu-west-2
ENDPOINT=http://localhost:4566

# I have to add verified senders and receivers
emails_list=(
  "john.doe@example.com"
  "jane.smith@example.com"
  "michael.johnson@example.com"
  "emily.davis@example.com"
  "william.brown@example.com"
  "olivia.jones@example.com"
  "james.miller@example.com"
  "sophia.wilson@example.com"
  "benjamin.moore@example.com"
  "isabella.taylor@example.com"
  "alexander.anderson@example.com"
  "mia.thomas@example.com"
  "daniel.jackson@example.com"
  "ava.white@example.com"
  "matthew.harris@example.com"
  "charlotte.martin@example.com"
  "david.thompson@example.com"
  "amelia.garcia@example.com"
  "joseph.martinez@example.com"
  "abigail.rodriguez@example.com"
)

for email in "${emails_list[@]}"; do
  awslocal ses verify-email-identity \
    --email-address "$email" \
    --region "$REGION" \
    --endpoint-url "$ENDPOINT"

  echo "Verified $email"
done
