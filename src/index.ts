import * as readline from 'readline';
import textToSpeech from '@google-cloud/text-to-speech';
import * as fs from 'fs';
import * as path from 'path';
import { promisify } from 'util';

const writeFile = promisify(fs.writeFile);

// Create readline interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Initialize the Text-to-Speech client
const ttsClient = new textToSpeech.TextToSpeechClient();

// Array of different voices to rotate through - PREMIUM QUALITY (Studio & Journey voices)!
const voices = [
  // === JOURNEY VOICES (Ultra-realistic, conversational) ===
  { languageCode: 'en-US', name: 'en-US-Journey-D', ssmlGender: 'MALE' as const, accent: 'US Male (Journey)' },
  { languageCode: 'en-US', name: 'en-US-Journey-F', ssmlGender: 'FEMALE' as const, accent: 'US Female (Journey)' },
  
  // === STUDIO VOICES (Premium quality) ===
  // American English Studio
  { languageCode: 'en-US', name: 'en-US-Studio-O', ssmlGender: 'FEMALE' as const, accent: 'US Female (Studio)' },
  { languageCode: 'en-US', name: 'en-US-Studio-Q', ssmlGender: 'MALE' as const, accent: 'US Male (Studio)' },
  
  // === NEURAL2 VOICES (High quality) ===
  /*
  // American English
  { languageCode: 'en-US', name: 'en-US-Neural2-A', ssmlGender: 'MALE' as const, accent: 'US Male' },
  { languageCode: 'en-US', name: 'en-US-Neural2-C', ssmlGender: 'FEMALE' as const, accent: 'US Female' },
  { languageCode: 'en-US', name: 'en-US-Neural2-D', ssmlGender: 'MALE' as const, accent: 'US Male 2' },
  { languageCode: 'en-US', name: 'en-US-Neural2-E', ssmlGender: 'FEMALE' as const, accent: 'US Female 2' },
  { languageCode: 'en-US', name: 'en-US-Neural2-F', ssmlGender: 'FEMALE' as const, accent: 'US Female 3' },
  { languageCode: 'en-US', name: 'en-US-Neural2-H', ssmlGender: 'FEMALE' as const, accent: 'US Female 4' },
  { languageCode: 'en-US', name: 'en-US-Neural2-I', ssmlGender: 'MALE' as const, accent: 'US Male 3' },
  { languageCode: 'en-US', name: 'en-US-Neural2-J', ssmlGender: 'MALE' as const, accent: 'US Male 4' },
  
  // British English
  { languageCode: 'en-GB', name: 'en-GB-Neural2-A', ssmlGender: 'FEMALE' as const, accent: 'British Female' },
  { languageCode: 'en-GB', name: 'en-GB-Neural2-B', ssmlGender: 'MALE' as const, accent: 'British Male' },
  { languageCode: 'en-GB', name: 'en-GB-Neural2-C', ssmlGender: 'FEMALE' as const, accent: 'British Female 2' },
  { languageCode: 'en-GB', name: 'en-GB-Neural2-D', ssmlGender: 'MALE' as const, accent: 'British Male 2' },
  { languageCode: 'en-GB', name: 'en-GB-Neural2-F', ssmlGender: 'FEMALE' as const, accent: 'British Female 3' },
  
  // Australian English
  { languageCode: 'en-AU', name: 'en-AU-Neural2-A', ssmlGender: 'FEMALE' as const, accent: 'Australian Female' },
  { languageCode: 'en-AU', name: 'en-AU-Neural2-B', ssmlGender: 'MALE' as const, accent: 'Australian Male' },
  { languageCode: 'en-AU', name: 'en-AU-Neural2-C', ssmlGender: 'FEMALE' as const, accent: 'Australian Female 2' },
  { languageCode: 'en-AU', name: 'en-AU-Neural2-D', ssmlGender: 'MALE' as const, accent: 'Australian Male 2' },
  
  // Indian English
  { languageCode: 'en-IN', name: 'en-IN-Neural2-A', ssmlGender: 'FEMALE' as const, accent: 'Indian Female' },
  { languageCode: 'en-IN', name: 'en-IN-Neural2-B', ssmlGender: 'MALE' as const, accent: 'Indian Male' },
  { languageCode: 'en-IN', name: 'en-IN-Neural2-C', ssmlGender: 'MALE' as const, accent: 'Indian Male 2' },
  { languageCode: 'en-IN', name: 'en-IN-Neural2-D', ssmlGender: 'FEMALE' as const, accent: 'Indian Female 2' },
  
  // For fun - bilingual voices (will have accents when speaking English)
  { languageCode: 'fr-FR', name: 'fr-FR-Neural2-A', ssmlGender: 'FEMALE' as const, accent: 'French Female' },
  { languageCode: 'fr-FR', name: 'fr-FR-Neural2-B', ssmlGender: 'MALE' as const, accent: 'French Male' },
  { languageCode: 'de-DE', name: 'de-DE-Neural2-A', ssmlGender: 'FEMALE' as const, accent: 'German Female' },
  { languageCode: 'de-DE', name: 'de-DE-Neural2-B', ssmlGender: 'MALE' as const, accent: 'German Male' },
  { languageCode: 'es-ES', name: 'es-ES-Neural2-A', ssmlGender: 'FEMALE' as const, accent: 'Spanish Female' },
  { languageCode: 'es-ES', name: 'es-ES-Neural2-B', ssmlGender: 'MALE' as const, accent: 'Spanish Male' },
  { languageCode: 'it-IT', name: 'it-IT-Neural2-A', ssmlGender: 'FEMALE' as const, accent: 'Italian Female' },
  { languageCode: 'it-IT', name: 'it-IT-Neural2-C', ssmlGender: 'MALE' as const, accent: 'Italian Male' },
  { languageCode: 'ja-JP', name: 'ja-JP-Neural2-B', ssmlGender: 'FEMALE' as const, accent: 'Japanese Female' },
  { languageCode: 'ja-JP', name: 'ja-JP-Neural2-C', ssmlGender: 'MALE' as const, accent: 'Japanese Male' },
   */
];

// Function to convert text to speech with a specific voice
async function textToSpeechWithVoice(text: string, voiceIndex: number): Promise<Buffer> {
  const voice = voices[voiceIndex % voices.length];
  
  const request = {
    input: { text },
    voice: {
      languageCode: voice.languageCode,
      name: voice.name,
      ssmlGender: voice.ssmlGender,
    },
    audioConfig: {
      audioEncoding: 'LINEAR16' as const,
      sampleRateHertz: 24000,
    },
  };

  console.log(`Converting "${text}" to speech with voice: ${voice.name} (${voice.accent})`);
  
  const [response] = await ttsClient.synthesizeSpeech(request);
  const audioBuffer = response.audioContent as Buffer;
  
  console.log(`  -> Generated ${audioBuffer.length} bytes of audio`);
  
  return audioBuffer;
}

// Function to combine audio buffers into a proper WAV file
function combineAudioBuffers(audioBuffers: Buffer[]): Buffer {
  // Each buffer from Google TTS is a complete LINEAR16 PCM audio
  // We need to extract just the audio data and create a new WAV file
  
  const sampleRate = 24000;
  const numChannels = 1; // Mono
  const bitsPerSample = 16;
  const bytesPerSample = bitsPerSample / 8;
  
  // Concatenate all audio data
  const combinedAudioData = Buffer.concat(audioBuffers);
  const dataSize = combinedAudioData.length;
  
  // Create WAV header
  const header = Buffer.alloc(44);
  
  // RIFF header
  header.write('RIFF', 0);
  header.writeUInt32LE(36 + dataSize, 4); // File size - 8
  header.write('WAVE', 8);
  
  // fmt subchunk
  header.write('fmt ', 12);
  header.writeUInt32LE(16, 16); // Subchunk size
  header.writeUInt16LE(1, 20); // Audio format (1 = PCM)
  header.writeUInt16LE(numChannels, 22);
  header.writeUInt32LE(sampleRate, 24);
  header.writeUInt32LE(sampleRate * numChannels * bytesPerSample, 28); // Byte rate
  header.writeUInt16LE(numChannels * bytesPerSample, 32); // Block align
  header.writeUInt16LE(bitsPerSample, 34);
  
  // data subchunk
  header.write('data', 36);
  header.writeUInt32LE(dataSize, 40);
  
  return Buffer.concat([header, combinedAudioData]);
}

// Function to prompt user for input
async function promptUser(): Promise<void> {
  rl.question('Please enter a string of text: ', async (userInput: string) => {
    console.log('\nYou entered:', userInput);
    
    // You can add your logic here to process the input
    // For example:
    console.log('Length:', userInput.length);
    console.log('Uppercase:', userInput.toUpperCase());

    let userInputWordArray = userInput.split(' ');

    let resultArray: string[][] = [];

    while(userInputWordArray.length > 0) {
      // Generate a random number between 1 and 10 (inclusive)
      const randomNumber = Math.floor(Math.random() * 10) + 1;
      console.log('Random number:', randomNumber);

      let subArray = userInputWordArray.splice(0, randomNumber);

      //add the subarray to a result array, which will contain all the subarrays
      resultArray.push(subArray);
    }

    console.log('Result array:', resultArray);

    //Join each subarray with a space between elements. the result should be an array of strings, where each string is the concatenation of the elements of the subarray.
    let resultStringArray: string[] = resultArray.map(subArray => subArray.join(' '));
    console.log('Result string array:', resultStringArray);

    try {
      console.log('\n--- Starting Text-to-Speech conversion ---\n');
      
      // Generate audio for each string with a different voice
      const audioBuffers: Buffer[] = [];
      
      for (let i = 0; i < resultStringArray.length; i++) {
        const audioBuffer = await textToSpeechWithVoice(resultStringArray[i], i);
        audioBuffers.push(audioBuffer);
      }
      
      console.log('\n--- Combining audio files ---\n');
      
      // Combine all audio buffers into one
      const combinedAudio = combineAudioBuffers(audioBuffers);
      
      console.log(`Combined audio size: ${combinedAudio.length} bytes`);
      console.log(`Total audio buffers: ${audioBuffers.length}`);
      
      // Create output directory if it doesn't exist
      const outputDir = path.join(process.cwd(), 'output');
      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir);
      }
      
      // Save the combined audio file
      const outputPath = path.join(outputDir, `combined_audio_${Date.now()}.wav`);
      await writeFile(outputPath, combinedAudio);
      
      console.log(`\n✅ Combined audio saved to: ${outputPath}`);
      console.log(`Total segments: ${resultStringArray.length}`);
      console.log(`Voices used: ${Math.min(resultStringArray.length, voices.length)}`);
      
    } catch (error) {
      console.error('Error generating audio:', error);
    }

    //Close the readline interface
    rl.close();
  });
}

// Start the program
console.log('Welcome to the CLI Input Project!');
promptUser();
