# Google Cloud Text-to-Speech Setup Guide

This guide will help you set up Google Cloud credentials to use the Text-to-Speech API.

## Prerequisites

- A Google Cloud account (create one at https://cloud.google.com/)
- Node.js installed on your system

## Step 1: Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click "Select a project" at the top
3. Click "New Project"
4. Enter a project name and click "Create"

## Step 2: Enable Text-to-Speech API

1. In the Google Cloud Console, navigate to "APIs & Services" > "Library"
2. Search for "Cloud Text-to-Speech API"
3. Click on it and then click "Enable"

## Step 3: Create Service Account Credentials

1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "Service Account"
3. Enter a service account name (e.g., "tts-service-account")
4. Click "Create and Continue"
5. For the role, select "Cloud Text-to-Speech User" or "Project > Owner"
6. Click "Continue" and then "Done"

## Step 4: Download Credentials JSON

1. In the "Credentials" page, find your service account under "Service Accounts"
2. Click on the service account email
3. Go to the "Keys" tab
4. Click "Add Key" > "Create new key"
5. Select "JSON" and click "Create"
6. A JSON file will download - **keep this file secure!**

## Step 5: Set Up Environment Variable

Save the downloaded JSON file to a secure location on your computer (e.g., `~/google-cloud-credentials/tts-key.json`).

### On macOS/Linux:

Add this to your `~/.zshrc` or `~/.bashrc`:

```bash
export GOOGLE_APPLICATION_CREDENTIALS="/path/to/your/tts-key.json"
```

Then run:
```bash
source ~/.zshrc  # or source ~/.bashrc
```

### On Windows (PowerShell):

```powershell
$env:GOOGLE_APPLICATION_CREDENTIALS="C:\path\to\your\tts-key.json"
```

Or set it permanently in System Environment Variables.

## Step 6: Verify Setup

You can verify your credentials are set up correctly by running:

```bash
echo $GOOGLE_APPLICATION_CREDENTIALS  # macOS/Linux
echo $env:GOOGLE_APPLICATION_CREDENTIALS  # Windows PowerShell
```

## Step 7: Install Dependencies and Run

```bash
npm install
npm run dev
```

## Troubleshooting

### Error: "Could not load the default credentials"

This means the `GOOGLE_APPLICATION_CREDENTIALS` environment variable is not set correctly. Make sure:
- The path to your JSON file is correct
- The JSON file exists and is readable
- You've restarted your terminal after setting the environment variable

### Error: "Permission denied" or "API not enabled"

Make sure you've enabled the Cloud Text-to-Speech API in your Google Cloud project.

### Billing Issues

Google Cloud requires a billing account to be set up, even though Text-to-Speech has a free tier (1 million characters per month for standard voices, 4 million for WaveNet voices).

## Free Tier Limits

- Standard voices: 1 million characters/month free
- Neural2 voices: 1 million characters/month free (first year only)
- After free tier: ~$4 per 1 million characters

For more information, see: https://cloud.google.com/text-to-speech/pricing

