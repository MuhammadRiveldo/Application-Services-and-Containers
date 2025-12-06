# Panduan Deploy ke Google Cloud Platform

## Prasyarat
- Akun GCP dengan project aktif
- Google Cloud CLI (`gcloud`) sudah terinstall
- Docker sudah terinstall

## Langkah-Langkah Deploy

### 1. Setup GCP Project
```bash
# Login ke GCP
gcloud auth login

# Set project ID
gcloud config set project PROJECT_ID

# Enable required APIs
gcloud services enable run.googleapis.com
gcloud services enable cloudbuild.googleapis.com
gcloud services enable cloudsql.googleapis.com
gcloud services enable container.googleapis.com
```

### 2. Setup Cloud SQL (PostgreSQL)
```bash
# Create Cloud SQL instance
gcloud sql instances create todo-db \
  --database-version=POSTGRES_15 \
  --tier=db-f1-micro \
  --region=asia-southeast1

# Create database
gcloud sql databases create pern-todo --instance=todo-db

# Create user
gcloud sql users create postgres --instance=todo-db --password

# Set root password
gcloud sql users set-password postgres --instance=todo-db --password
```

### 3. Deploy Server ke Cloud Run
```bash
# Build dan push image
gcloud builds submit ./server --tag gcr.io/PROJECT_ID/todo-server

# Deploy ke Cloud Run
gcloud run deploy todo-server \
  --image gcr.io/PROJECT_ID/todo-server \
  --platform managed \
  --region asia-southeast1 \
  --allow-unauthenticated \
  --set-env-vars DB_HOST=CLOUDSQL_INSTANCE,DB_USER=postgres,DB_NAME=pern-todo \
  --set-secrets DB_PASSWORD=db-password:latest \
  --add-cloudsql-instances PROJECT_ID:asia-southeast1:todo-db
```

### 4. Deploy Client ke Cloud Run
```bash
# Build dan push image
gcloud builds submit ./client --tag gcr.io/PROJECT_ID/todo-client

# Deploy ke Cloud Run
gcloud run deploy todo-client \
  --image gcr.io/PROJECT_ID/todo-client \
  --platform managed \
  --region asia-southeast1 \
  --allow-unauthenticated \
  --set-env-vars REACT_APP_API_URL=https://todo-server-xxx.run.app
```

### 5. Configure Cloud SQL Connections
```bash
# Get connection name
gcloud sql instances describe todo-db --format="value(connectionName)"

# Update server environment dengan connection name
```

## Environment Variables
- `DB_HOST`: Cloud SQL connection name
- `DB_USER`: postgres
- `DB_PASSWORD`: Stored in Secret Manager
- `DB_NAME`: pern-todo
- `DB_PORT`: 5432 (default)

## Monitoring
```bash
# View logs
gcloud run logs read todo-server --region asia-southeast1

# View Cloud SQL logs
gcloud sql operations list --instance todo-db
```

## Clean Up
```bash
# Delete Cloud Run services
gcloud run services delete todo-server --region asia-southeast1
gcloud run services delete todo-client --region asia-southeast1

# Delete Cloud SQL instance
gcloud sql instances delete todo-db
```

## Notes
- Prototype ini menggunakan db-f1-micro (tier gratis terbatas)
- Cloud Run auto-scales sesuai traffic
- Untuk production, gunakan tier yang lebih tinggi dan enable backups
