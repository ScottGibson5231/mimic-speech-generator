# CLI Input Project with Text-to-Speech

A TypeScript command-line application that takes user input, splits it into random chunks, and converts each chunk to speech using different Google Cloud Text-to-Speech voices, then combines them into a single audio file.

## Features

- Interactive command-line interface
- Random text chunking (1-10 words per chunk)
- Multiple voice rotation (uses 5 different Neural2 voices)
- Automatic audio combining
- Saves output as WAV file

## Prerequisites

- Node.js (v16 or higher)
- Google Cloud account with Text-to-Speech API enabled
- Google Cloud credentials (service account JSON key)

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Google Cloud Credentials

**Important:** You must set up Google Cloud Text-to-Speech API before running this project.

See [SETUP.md](SETUP.md) for detailed instructions on:
- Creating a Google Cloud project
- Enabling the Text-to-Speech API
- Creating service account credentials
- Setting up environment variables

### Quick Setup:

1. Download your Google Cloud service account JSON key
2. Set the environment variable:

```bash
export GOOGLE_APPLICATION_CREDENTIALS="/path/to/your/key.json"
```

## Usage

### Development Mode (with ts-node)

Run directly without building:

```bash
npm run dev
```

### Production Mode

Build the TypeScript code:

```bash
npm run build
```

Then run the compiled JavaScript:

```bash
npm start
```

## How It Works

1. The program prompts you to enter a string of text
2. It splits the text into words
3. It randomly groups words into chunks (1-10 words per chunk)
4. Each chunk is converted to speech using a different voice from Google Cloud
5. All audio segments are combined into one file
6. The final audio is saved to `output/combined_audio_[timestamp].wav`

## Example

```bash
$ npm run dev

Welcome to the CLI Input Project!
Please enter a string of text: Hello world this is a test of the text to speech system

You entered: Hello world this is a test of the text to speech system
Length: 59
...

--- Starting Text-to-Speech conversion ---

Converting "Hello world this" to speech with voice: en-US-Neural2-A
Converting "is a test of" to speech with voice: en-US-Neural2-C
Converting "the text to speech system" to speech with voice: en-US-Neural2-D

--- Combining audio files ---

✅ Combined audio saved to: output/combined_audio_1702123456789.wav
Total segments: 3
Voices used: 3
```

## Project Structure

- `src/` - TypeScript source files
  - `index.ts` - Main application with TTS integration
- `output/` - Generated audio files (created automatically)
- `dist/` - Compiled JavaScript files (generated after build)
- `tsconfig.json` - TypeScript configuration
- `package.json` - Project dependencies and scripts
- `SETUP.md` - Google Cloud setup instructions

## Voices Used

The application rotates through these Google Cloud Neural2 voices:

1. `en-US-Neural2-A` (Male)
2. `en-US-Neural2-C` (Female)
3. `en-US-Neural2-D` (Male)
4. `en-US-Neural2-E` (Female)
5. `en-US-Neural2-F` (Female)

## Troubleshooting

- **"Could not load the default credentials"**: Make sure `GOOGLE_APPLICATION_CREDENTIALS` is set correctly
- **API not enabled**: Enable the Cloud Text-to-Speech API in Google Cloud Console
- **Billing errors**: Set up a billing account (Text-to-Speech has a generous free tier)

See [SETUP.md](SETUP.md) for more troubleshooting tips.

## Cost Information

Google Cloud Text-to-Speech pricing:
- First 1 million characters/month: FREE (Neural2 voices)
- After that: ~$4 per 1 million characters

For most personal projects, you'll stay within the free tier.


