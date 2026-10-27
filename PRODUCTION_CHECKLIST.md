# Remotion Cloud Run Cost Optimization & Production Checklist

This checklist outlines best practices to ensure optimal cost efficiency (leveraging GCP Free Tier and $300 trial credits) and high performance when deploying Remotion video rendering automation on Google Cloud Run.

---

## 1. Zero-Idle-Cost Configuration

Google Cloud Run charges for compute instances based on active duration. To ensure zero costs when no videos are rendering:

### Set Minimum Instances (`minInstances = 0`)
- **Requirement**: Ensure `minInstances` is set to `0`.
- **Reason**: Setting `minInstances = 0` allows Cloud Run instances to scale down to zero when idle, avoiding continuous compute charges.
- **Implementation**:
  - When deploying via `@remotion/cloudrun` CLI or API:
    ```bash
    npx remotion cloudrun services deploy --min-instances=0
    ```
  - Or via Google Cloud CLI (`gcloud`):
    ```bash
    gcloud run services update <SERVICE_NAME> \
      --region=<GCP_REGION> \
      --min-instances=0
    ```
  - Or via Terraform / GCP Console under **Service Details > Configuration > Autoscaling**.

---

## 2. Google Cloud Storage Lifecycle Rules (Automatic File Cleanup)

Remotion uploads rendered video chunks and final output files to Google Cloud Storage (GCS) buckets. To prevent storage accumulation and keep costs within the GCP Free Tier (5 GB-months of Standard Storage):

### Configure Lifecycle Rule for Temporary Output Files
- **Requirement**: Set an Object Lifecycle Management rule to automatically delete temporary files after a few days (e.g., 1–7 days).
- **Implementation via `gcloud`**:
  1. Create a `lifecycle.json` file:
     ```json
     {
       "rule": [
         {
           "action": { "type": "Delete" },
           "condition": {
             "age": 3,
             "matchesPrefix": ["renders/", "tmp/"]
           }
         }
       ]
     }
     ```
  2. Apply the rule to your Remotion output bucket:
     ```bash
     gcloud storage buckets update gs://<REMOTION_BUCKET_NAME> --lifecycle-file=lifecycle.json
     ```
- **Implementation via GCP Console**:
  1. Go to **Cloud Storage > Buckets** and select your Remotion bucket.
  2. Click the **Lifecycle** tab and click **Add a rule**.
  3. Select Action: **Delete object**.
  4. Select Condition: **Age** is `3` days (or your desired retention period).
  5. Save the rule.

---

## 3. GCP Free Tier & Credit Efficiency Checklist

### Instance Sizing & Compute Allocation
- **CPU Allocation**: Use `cpu-throttling` (CPU is only allocated during request processing) or `no-cpu-throttling` only during active renders.
- **CPU & Memory**: Allocate appropriate resources per render container (e.g. 2 vCPU and 2 GiB or 4 GiB memory) based on video resolution and complexity.
- **Concurrency**: Fine-tune concurrency parameters in Remotion Cloud Run configuration to maximize CPU utilization without exceeding memory limits.

### Region Selection
- Choose GCP Free Tier eligible regions (such as `us-central1`, `us-east1`, `us-west1`) to take advantage of free compute tier allocations (180,000 vCPU-seconds and 360,000 GiB-seconds per month).

### Access & Security
- Keep storage buckets private or use standard signed URLs / IAM permissions where applicable.
- Secure environment variables (`GCP_PROJECT_ID`, `GCP_REGION`, etc.) in `.env` files or secret manager.
