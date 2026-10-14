#!/usr/bin/env bash
set -e

BUCKET="cebause-site-my-084362065057"
REGION="ap-southeast-5"
DISTRIBUTION_ID="E1WS23SL7K4YBT"
AWS_BIN="${HOME}/.local/share/aws-cli/aws"

if ! command -v "$AWS_BIN" &> /dev/null; then
  if command -v aws &> /dev/null; then
    AWS_BIN="aws"
  else
    echo "Error: AWS CLI not found."
    exit 1
  fi
fi

echo "==> Syncing files to S3 bucket: s3://${BUCKET} (Region: ${REGION})..."
"$AWS_BIN" s3 sync . "s3://${BUCKET}" \
  --region "$REGION" \
  --exclude ".git/*" \
  --exclude ".agents/*" \
  --exclude ".gemini/*" \
  --exclude "node_modules/*" \
  --exclude "src/*" \
  --exclude "scripts/*" \
  --exclude "*.ts" \
  --exclude "*.json" \
  --exclude "*.js" \
  --exclude ".env*" \
  --exclude ".*" \
  --include "script*.js" \
  --include "dome/*"

echo "==> Creating CloudFront cache invalidation for: ${DISTRIBUTION_ID}..."
"$AWS_BIN" cloudfront create-invalidation \
  --distribution-id "$DISTRIBUTION_ID" \
  --paths "/*"

echo "==> Deployment to S3 and CloudFront completed successfully!"
