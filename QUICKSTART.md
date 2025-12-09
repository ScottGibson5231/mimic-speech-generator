# Quick Start Guide

## Before You Run the Project

### 1. Install Dependencies

```bash
npm install
```

This will install:
- TypeScript and ts-node
- Google Cloud Text-to-Speech SDK
- Node.js type definitions

### 2. Set Up Google Cloud (REQUIRED)

**You must complete this step before running the project!**

Follow the detailed instructions in [SETUP.md](SETUP.md), or here's the quick version:

1. Create a Google Cloud project at https://console.cloud.google.com/
2. Enable the "Cloud Text-to-Speech API"
3. Create a service account and download the JSON key
4. Set the environment variable:

```bash
export GOOGLE_APPLICATION_CREDENTIALS="/path/to/your/key.json"
```

**Important:** Add this to your `~/.zshrc` or `~/.bashrc` to make it permanent!

### 3. Run the Project

```bash
npm run dev
```

### What to Expect

1. You'll be prompted to enter text
2. The text will be split into random chunks
3. Each chunk will be converted to speech with a different voice
4. All audio will be combined into one file
5. The file will be saved in the `output/` directory

## Example Run

```bash
$ npm run dev

Welcome to the CLI Input Project!
Please enter a string of text: This is a test sentence for the text to speech system

You entered: This is a test sentence for the text to speech system
...
✅ Combined audio saved to: output/combined_audio_1702123456789.wav
```

## Troubleshooting

**"Could not load the default credentials"**
- Your `GOOGLE_APPLICATION_CREDENTIALS` environment variable is not set
- Run: `export GOOGLE_APPLICATION_CREDENTIALS="/path/to/your/key.json"`
- Make sure to restart your terminal after setting it

**"API not enabled"**
- You need to enable the Cloud Text-to-Speech API in Google Cloud Console
- See [SETUP.md](SETUP.md) for instructions

**Module not found errors**
- Run `npm install` first

## Next Steps

- Play the generated audio file in `output/`
- Modify the voices in `src/index.ts` (see the `voices` array)
- Adjust the random chunk size (currently 1-10 words)
- Add more voices or change the language

