#!/bin/bash
set -e

# Load environment variables
if [ -f .env ]; then
  source .env
elif [ -f .env.example ]; then
  source .env.example
fi

echo "=== STEP 1: Deploying Remotion Cloud Run Service ==="
npx remotion cloudrun services deploy

echo "=== STEP 2: Binding User-Managed Service Account (Fixes 404 Token Refresh Error) ==="
gcloud run services update $REMOTION_SERVICE_NAME \
  --service-account=remotion-sa@${GCP_PROJECT_ID}.iam.gserviceaccount.com \
  --region=$REMOTION_APP_REGION

echo "=== STEP 3: Deploying Site Bundle to Google Cloud Storage ==="
npx remotion cloudrun sites create src/index.ts --site-name=$REMOTION_SITE_NAME

echo "=== STEP 4: Validating Permission Setup ==="
GOOGLE_APPLICATION_CREDENTIALS="./gcp-key.json" npx remotion cloudrun permissions

echo "=== DEPLOYMENT COMPLETE SUCCESSFUL ==="
