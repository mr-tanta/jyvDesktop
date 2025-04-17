const fs = require('fs');
const path = require('path');

// Create the output directory if it doesn't exist
const outputDir = path.join(__dirname, '../public/assets/audio');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Function to copy the existing audio files to our enhancement demo files
function createEnhancementAudioFiles() {
  const existingAudioFiles = [
    'cleaned-demo.wav', // This will be the "after" enhancement file (good quality)
    'noisy.m4a'        // This will be the "before" enhancement file (poor quality)
  ];

  // All the files needed for the audio enhancement demo
  const enhancementFiles = [
    'demo-before.mp3',      // Default demo files
    'demo-after.mp3',
    'noise-before.mp3',     // Noise suppression 
    'noise-after.mp3',
    'voice-before.mp3',     // Voice enhancement
    'voice-after.mp3',
    'dynamics-before.mp3',  // Dynamic processing
    'dynamics-after.mp3',
    'eq-before.mp3',        // Equalizer
    'eq-after.mp3',
    'clarity-before.mp3',   // Clarity enhancer
    'clarity-after.mp3',
    'neural-before.mp3',    // Neural processing
    'neural-after.mp3',
    'speaker-before.mp3',   // Speaker optimizer
    'speaker-after.mp3'
  ];

  // Create copies of the existing files to our enhancement demo files
  const promises = enhancementFiles.map((targetFile, index) => {
    // Use noisy.m4a for all "before" files and cleaned-demo.wav for all "after" files
    const sourceFile = targetFile.includes('before') ? 
      existingAudioFiles[1] : existingAudioFiles[0];
    
    return new Promise((resolve, reject) => {
      const sourcePath = path.join(outputDir, sourceFile);
      const targetPath = path.join(outputDir, targetFile);
      
      if (fs.existsSync(sourcePath)) {
        fs.copyFile(sourcePath, targetPath, (err) => {
          if (err) {
            console.error(`Error copying ${sourceFile} to ${targetFile}:`, err);
            reject(err);
          } else {
            console.log(`✅ Created ${targetFile} from ${sourceFile}`);
            resolve();
          }
        });
      } else {
        console.error(`Source file does not exist: ${sourcePath}`);
        // Still resolve, don't block the process
        resolve();
      }
    });
  });

  return Promise.all(promises);
}

// Main function
async function main() {
  try {
    console.log('Generating audio enhancement sample files...');
    await createEnhancementAudioFiles();
    console.log('Audio enhancement sample files generated successfully!');
  } catch (error) {
    console.error('Error generating audio enhancement samples:', error);
    process.exit(1);
  }
}

main(); 