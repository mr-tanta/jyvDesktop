const fs = require('fs');
const { exec } = require('child_process');
const path = require('path');

// Create the output directory if it doesn't exist
const outputDir = path.join(__dirname, '../public/assets/audio');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Function to copy the existing audio files to our sample files
function createSampleAudioFiles() {
  const existingAudioFiles = [
    'cleaned-demo.wav',
    'noisy.m4a'
  ];

  const targetFiles = [
    'videocall-sample.mp3',
    'music-sample.mp3',
    'browser-sample.mp3',
    'notification-sample.mp3',
    'game-sample.mp3',
    'default-sample.mp3'
  ];

  // Create symbolic links or copies of the existing files to our sample files
  const promises = targetFiles.map((targetFile, index) => {
    const sourceFile = existingAudioFiles[index % existingAudioFiles.length];
    
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
    console.log('Generating audio sample files...');
    await createSampleAudioFiles();
    console.log('Audio sample files generated successfully!');
  } catch (error) {
    console.error('Error generating audio samples:', error);
    process.exit(1);
  }
}

main(); 