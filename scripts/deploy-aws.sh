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

echo "==> Building minified assets..."
npx --yes esbuild styles.css --minify --outfile=styles.min.css
npx --yes esbuild script.js --minify --outfile=script.min.js

# Only these paths are published. S3 filter patterns match the full relative
# path, so a bare "*.css" or "*.svg" would also upload node_modules/, src/, etc.
# The trailing excludes are a safety net in case an include is broadened later.
NEVER_UPLOAD=(
  --exclude "node_modules/*"
  --exclude "src/*"
  --exclude "public/*"
  --exclude "scripts/*"
  --exclude ".*"
)

echo "==> Syncing static assets to S3 (Cache-Control: 1 year immutable)..."
"$AWS_BIN" s3 sync . "s3://${BUCKET}" \
  --region "$REGION" \
  --exclude "*" \
  --include "images/*" \
  --include "files/*" \
  --include "dome/*" \
  --include "styles*.css" \
  --include "script*.js" \
  --include "resume.pdf" \
  "${NEVER_UPLOAD[@]}" \
  --cache-control "public, max-age=31536000, immutable"

echo "==> Enforcing Cache-Control on all existing S3 assets..."
"$AWS_BIN" s3 cp "s3://${BUCKET}/images/" "s3://${BUCKET}/images/" \
  --region "$REGION" --recursive --metadata-directive REPLACE \
  --cache-control "public, max-age=31536000, immutable"
"$AWS_BIN" s3 cp "s3://${BUCKET}/files/" "s3://${BUCKET}/files/" \
  --region "$REGION" --recursive --metadata-directive REPLACE \
  --cache-control "public, max-age=31536000, immutable"

echo "==> Syncing HTML & root files to S3 (Cache-Control: must-revalidate)..."
"$AWS_BIN" s3 sync . "s3://${BUCKET}" \
  --region "$REGION" \
  --exclude "*" \
  --include "index.html" \
  --include "google3f2dbdb9b1728faa.html" \
  --include "robots.txt" \
  --include "sitemap.xml" \
  "${NEVER_UPLOAD[@]}" \
  --cache-control "public, max-age=0, must-revalidate"

echo "==> Creating CloudFront cache invalidation for: ${DISTRIBUTION_ID}..."
"$AWS_BIN" cloudfront create-invalidation \
  --distribution-id "$DISTRIBUTION_ID" \
  --paths "/*"

echo "==> Deployment to S3 and CloudFront completed successfully!"
