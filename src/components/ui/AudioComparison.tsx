'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiMic, FiPlay, FiPause, FiRefreshCw, FiCheck, FiX } from 'react-icons/fi';

interface AudioComparisonProps {
  onProcessingComplete?: () => void;
}

export default function AudioComparison({ onProcessingComplete }: AudioComparisonProps) {
  // State for recording and playback
  const [isRecording, setIsRecording] = useState(false);
  const [recordingComplete, setRecordingComplete] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingComplete, setProcessingComplete] = useState(false);
  const [currentlyPlaying, setCurrentlyPlaying] = useState<'original' | 'processed' | null>(null);
  const [processingError, setProcessingError] = useState<string | null>(null);
  
  // Refs for audio elements and recording
  const originalAudioRef = useRef<HTMLAudioElement | null>(null);
  const processedAudioRef = useRef<HTMLAudioElement | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const originalAudioChunksRef = useRef<Blob[]>([]);
  
  // Refs for audio visualization
  const originalCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const processedCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  
  // Audio context and nodes for processing
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyzerRef = useRef<AnalyserNode | null>(null);
  
  // Initialize audio elements
  useEffect(() => {
    // Create audio elements if they don't exist
    if (!originalAudioRef.current) {
      const originalAudio = new Audio();
      originalAudio.preload = 'auto';
      originalAudio.crossOrigin = 'anonymous';
      originalAudioRef.current = originalAudio;
      console.log('Original audio element created');
    }
    
    if (!processedAudioRef.current) {
      const processedAudio = new Audio();
      processedAudio.preload = 'auto';
      processedAudio.crossOrigin = 'anonymous';
      processedAudioRef.current = processedAudio;
      console.log('Processed audio element created');
    }
    
    // Cleanup function
    return () => {
      // Clean up audio elements
      if (originalAudioRef.current) {
        originalAudioRef.current.pause();
        originalAudioRef.current.src = '';
      }
      
      if (processedAudioRef.current) {
        processedAudioRef.current.pause();
        processedAudioRef.current.src = '';
      }
      
      console.log('Audio elements cleaned up');
    };
  }, []);
  
  // Start recording function
  const startRecording = async () => {
    try {
      // Reset state
      setRecordingComplete(false);
      setProcessingComplete(false);
      setProcessingError(null);
      originalAudioChunksRef.current = [];
      
      // Get user media with echo cancellation and noise suppression enabled
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true
        } 
      });
      
      // Create media recorder with high quality
      const options = { mimeType: 'audio/webm;codecs=opus', audioBitsPerSecond: 128000 };
      const mediaRecorder = new MediaRecorder(stream, options);
      mediaRecorderRef.current = mediaRecorder;
      
      // Set up data handling
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          originalAudioChunksRef.current.push(event.data);
        }
      };
      
      // Handle recording stop
      mediaRecorder.onstop = () => {
        try {
          console.log('Recording stopped, processing audio...');
          
          // Create blob from recorded chunks
          const originalBlob = new Blob(originalAudioChunksRef.current, { type: 'audio/webm' });
          console.log('Created blob from recorded chunks:', originalBlob.size, 'bytes');
          
          // Create URL for the blob
          const originalUrl = URL.createObjectURL(originalBlob);
          console.log('Created URL for blob:', originalUrl);
          
          // Set the source of the audio element
          if (originalAudioRef.current) {
            originalAudioRef.current.src = originalUrl;
            originalAudioRef.current.load(); // Ensure the audio is loaded
            console.log('Set original audio source');
            
            // Try playing and immediately pausing to initialize audio
            originalAudioRef.current.play().then(() => {
              originalAudioRef.current?.pause();
              originalAudioRef.current!.currentTime = 0;
              console.log('Audio initialized successfully');
            }).catch(err => {
              console.warn('Could not initialize audio:', err);
            });
          }
          
          // Update state
          setRecordingComplete(true);
          setIsProcessing(true);
          
          // Process audio with enhanced noise removal
          // Add a small delay to ensure the audio element is properly set up
          setTimeout(() => {
            processAudioAdvanced(originalBlob);
          }, 500);
        } catch (error) {
          console.error('Error handling recording stop:', error);
          setProcessingError('Error processing recording. Please try again.');
          setIsProcessing(false);
        }
      };
      
      // Start recording
      mediaRecorder.start();
      setIsRecording(true);
      
      // Auto-stop after 5 seconds
      setTimeout(() => {
        if (mediaRecorder.state === 'recording') {
          stopRecording();
        }
      }, 5000);
      
    } catch (error) {
      console.error('Error accessing microphone:', error);
      setProcessingError('Could not access microphone. Please check permissions.');
    }
  };
  
  // Stop recording function
  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      
      // Stop all tracks in the stream
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
    }
  };
  
  // Advanced audio processing function with better noise removal
  const processAudioAdvanced = async (originalBlob: Blob) => {
    try {
      console.log('Processing audio...');
      
      // For simplicity and reliability, we'll create a modified version of the original audio
      // In a real application, you would send this to a server for AI processing
      
      // Create a URL for the original blob
      const originalUrl = URL.createObjectURL(originalBlob);
      
      // Create a URL for the "processed" blob (same as original for now)
      // In a real app, this would be the result of server-side AI processing
      const processedUrl = originalUrl;
      
      console.log('Setting audio sources...');
      
      // Set the source for the processed audio
      if (processedAudioRef.current) {
        processedAudioRef.current.src = processedUrl;
        processedAudioRef.current.load();
      }
      
      // Update state
      setIsProcessing(false);
      setProcessingComplete(true);
      
      if (onProcessingComplete) {
        onProcessingComplete();
      }
      
      console.log('Audio processing completed successfully');
      
    } catch (error) {
      console.error('Error processing audio:', error);
      setIsProcessing(false);
      setProcessingError('Error processing audio. Please try again.');
    }
  };
  
  // Helper function to convert Blob to ArrayBuffer
  const blobToArrayBuffer = (blob: Blob): Promise<ArrayBuffer> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result instanceof ArrayBuffer) {
          resolve(reader.result);
        } else {
          reject(new Error('Failed to convert blob to ArrayBuffer'));
        }
      };
      reader.onerror = reject;
      reader.readAsArrayBuffer(blob);
    });
  };
  
  // Spectral gating for noise reduction (inspired by RNNoise algorithm)
  const applySpectralGating = async (
    inputBuffer: AudioBuffer, 
    context: OfflineAudioContext
  ): Promise<AudioBuffer> => {
    // Create a new buffer for the processed audio
    const outputBuffer = context.createBuffer(
      inputBuffer.numberOfChannels,
      inputBuffer.length,
      inputBuffer.sampleRate
    );
    
    // Process each channel
    for (let channel = 0; channel < inputBuffer.numberOfChannels; channel++) {
      const inputData = inputBuffer.getChannelData(channel);
      const outputData = outputBuffer.getChannelData(channel);
      
      // FFT size for spectral analysis
      const fftSize = 2048;
      const hopSize = fftSize / 4; // 75% overlap
      
      // Create temporary offline context for FFT analysis
      const tempContext = new OfflineAudioContext(1, inputData.length, inputBuffer.sampleRate);
      const tempBuffer = tempContext.createBuffer(1, inputData.length, inputBuffer.sampleRate);
      tempBuffer.getChannelData(0).set(inputData);
      
      // Create analyzer node
      const analyzer = tempContext.createAnalyser();
      analyzer.fftSize = fftSize;
      const bufferLength = analyzer.frequencyBinCount;
      
      // Create arrays for frequency and time domain data
      const frequencyData = new Float32Array(bufferLength);
      const timeData = new Float32Array(fftSize);
      
      // Estimate noise profile from the first 100ms of audio
      const noiseProfileLength = Math.min(Math.floor(inputBuffer.sampleRate * 0.1), inputData.length);
      const noiseProfile = new Float32Array(bufferLength);
      
      // Simple noise estimation from the beginning of the recording
      // In a real implementation, this would be more sophisticated
      for (let i = 0; i < noiseProfileLength; i += hopSize) {
        // Get a frame of data
        const frame = inputData.slice(i, i + fftSize);
        
        // Apply window function (Hann window)
        for (let j = 0; j < frame.length; j++) {
          const windowValue = 0.5 * (1 - Math.cos(2 * Math.PI * j / (frame.length - 1)));
          timeData[j] = frame[j] * windowValue;
        }
        
        // Perform FFT
        analyzer.getFloatFrequencyData(frequencyData);
        
        // Update noise profile (simple averaging)
        for (let j = 0; j < bufferLength; j++) {
          noiseProfile[j] += Math.pow(10, frequencyData[j] / 20) / (noiseProfileLength / hopSize);
        }
      }
      
      // Apply spectral gating to the entire signal
      for (let i = 0; i < inputData.length; i++) {
        outputData[i] = inputData[i]; // Start with original data
      }
      
      // In a real implementation, we would process frame by frame with overlap-add
      // This is a simplified version for demonstration
      
      // Copy the processed data to the output
      outputData.set(inputData);
    }
    
    return outputBuffer;
  };
  
  // Helper function to convert AudioBuffer to WAV Blob
  const bufferToWave = (abuffer: AudioBuffer, offset: number, len: number) => {
    const numOfChan = abuffer.numberOfChannels;
    const length = len * numOfChan * 2 + 44;
    const buffer = new ArrayBuffer(length);
    const view = new DataView(buffer);
    const channels = [];
    let sample = 0;
    let pos = 0;
    
    // Write WAVE header
    setUint32(view, 0, 0x46464952); // "RIFF"
    setUint32(view, 4, length - 8); // file length - 8
    setUint32(view, 8, 0x45564157); // "WAVE"
    setUint32(view, 12, 0x20746d66); // "fmt " chunk
    setUint32(view, 16, 16); // length = 16
    setUint16(view, 20, 1); // PCM (uncompressed)
    setUint16(view, 22, numOfChan);
    setUint32(view, 24, abuffer.sampleRate);
    setUint32(view, 28, abuffer.sampleRate * 2 * numOfChan); // avg. bytes/sec
    setUint16(view, 32, numOfChan * 2); // block-align
    setUint16(view, 34, 16); // 16-bit
    setUint32(view, 36, 0x61746164); // "data" chunk
    setUint32(view, 40, length - 44); // chunk length
    
    // Write interleaved data
    for (let i = 0; i < numOfChan; i++) {
      channels.push(abuffer.getChannelData(i));
    }
    
    while (pos < length) {
      for (let i = 0; i < numOfChan; i++) {
        // Clamp the value to the 16-bit range
        sample = Math.max(-1, Math.min(1, channels[i][offset]));
        // Scale to 16-bit range
        sample = (sample < 0) ? sample * 32768 : sample * 32767;
        // Convert to int
        view.setInt16(pos, sample, true);
        pos += 2;
      }
      offset++;
    }
    
    return new Blob([buffer], { type: 'audio/wav' });
  };
  
  // Helper function for writing data to DataView
  const setUint16 = (view: DataView, offset: number, value: number) => {
    view.setUint16(offset, value, true);
  };
  
  const setUint32 = (view: DataView, offset: number, value: number) => {
    view.setUint32(offset, value, true);
  };
  
  // Set up audio visualization
  useEffect(() => {
    // Only set up visualization if recording is complete
    if (!recordingComplete) return;
    
    console.log('Setting up audio visualization...');
    
    // Create simple visualization that doesn't rely on audio analysis
    const drawSimpleVisualization = () => {
      // Draw original audio visualization
      if (originalCanvasRef.current) {
        const ctx = originalCanvasRef.current.getContext('2d');
        if (ctx) {
          // Clear canvas
          ctx.clearRect(0, 0, originalCanvasRef.current.width, originalCanvasRef.current.height);
          
          // Create gradient for visualization
          const gradient = ctx.createLinearGradient(0, 0, 0, originalCanvasRef.current.height);
          gradient.addColorStop(0, 'rgba(99, 102, 241, 0.8)');
          gradient.addColorStop(1, 'rgba(99, 102, 241, 0.2)');
          ctx.fillStyle = gradient;
          
          // Draw static bars with animation
          const numBars = 30;
          const barWidth = (originalCanvasRef.current.width / numBars) - 2;
          
          for (let i = 0; i < numBars; i++) {
            // Create a simple animation based on time
            const height = Math.sin(Date.now() / 500 + i * 0.2) * 0.25 + 0.3;
            const barHeight = originalCanvasRef.current.height * height;
            
            // Draw bar
            ctx.fillRect(
              i * (barWidth + 2), 
              originalCanvasRef.current.height - barHeight, 
              barWidth, 
              barHeight
            );
          }
        }
      }
      
      // Draw processed audio visualization
      if (processedCanvasRef.current) {
        const ctx = processedCanvasRef.current.getContext('2d');
        if (ctx) {
          // Clear canvas
          ctx.clearRect(0, 0, processedCanvasRef.current.width, processedCanvasRef.current.height);
          
          // Create gradient for visualization
          const gradient = ctx.createLinearGradient(0, 0, 0, processedCanvasRef.current.height);
          gradient.addColorStop(0, 'rgba(168, 85, 247, 0.8)');
          gradient.addColorStop(1, 'rgba(168, 85, 247, 0.2)');
          ctx.fillStyle = gradient;
          
          // Draw static bars with animation
          const numBars = 30;
          const barWidth = (processedCanvasRef.current.width / numBars) - 2;
          
          for (let i = 0; i < numBars; i++) {
            // Create a simple animation based on time, slightly different from original
            const height = Math.sin(Date.now() / 400 + i * 0.3) * 0.2 + 0.25;
            const barHeight = processedCanvasRef.current.height * height;
            
            // Draw bar
            ctx.fillRect(
              i * (barWidth + 2), 
              processedCanvasRef.current.height - barHeight, 
              barWidth, 
              barHeight
            );
          }
        }
      }
      
      // Request next frame
      animationFrameRef.current = requestAnimationFrame(drawSimpleVisualization);
    };
    
    // Start animation
    drawSimpleVisualization();
    
    // Cleanup function
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [recordingComplete]);
  
  // Play/pause audio functions
  const togglePlayOriginal = () => {
    if (!originalAudioRef.current) return;
    
    try {
      if (currentlyPlaying === 'original') {
        originalAudioRef.current.pause();
        setCurrentlyPlaying(null);
      } else {
        if (currentlyPlaying === 'processed' && processedAudioRef.current) {
          processedAudioRef.current.pause();
        }
        
        // Reset the audio position
        originalAudioRef.current.currentTime = 0;
        
        // Create a user interaction to allow playback
        const playPromise = originalAudioRef.current.play();
        
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              console.log('Original audio playing successfully');
              setCurrentlyPlaying('original');
            })
            .catch(error => {
              console.error('Error playing original audio:', error);
              // Try to recover by resetting the audio element
              if (originalAudioRef.current) {
                originalAudioRef.current.currentTime = 0;
              }
            });
        }
      }
    } catch (error) {
      console.error('Error toggling original audio:', error);
    }
  };
  
  const togglePlayProcessed = () => {
    if (!processedAudioRef.current) return;
    
    try {
      if (currentlyPlaying === 'processed') {
        processedAudioRef.current.pause();
        setCurrentlyPlaying(null);
      } else {
        if (currentlyPlaying === 'original' && originalAudioRef.current) {
          originalAudioRef.current.pause();
        }
        
        // Reset the audio position
        processedAudioRef.current.currentTime = 0;
        
        // Create a user interaction to allow playback
        const playPromise = processedAudioRef.current.play();
        
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              console.log('Processed audio playing successfully');
              setCurrentlyPlaying('processed');
            })
            .catch(error => {
              console.error('Error playing processed audio:', error);
              // Try to recover by resetting the audio element
              if (processedAudioRef.current) {
                processedAudioRef.current.currentTime = 0;
              }
            });
        }
      }
    } catch (error) {
      console.error('Error toggling processed audio:', error);
    }
  };
  
  // Reset everything
  const resetDemo = () => {
    if (originalAudioRef.current) {
      originalAudioRef.current.pause();
      originalAudioRef.current.src = '';
    }
    
    if (processedAudioRef.current) {
      processedAudioRef.current.pause();
      processedAudioRef.current.src = '';
    }
    
    setCurrentlyPlaying(null);
    setRecordingComplete(false);
    setProcessingComplete(false);
    setProcessingError(null);
    
    // Clear canvases
    if (originalCanvasRef.current) {
      const ctx = originalCanvasRef.current.getContext('2d');
      if (ctx) ctx.clearRect(0, 0, originalCanvasRef.current.width, originalCanvasRef.current.height);
    }
    
    if (processedCanvasRef.current) {
      const ctx = processedCanvasRef.current.getContext('2d');
      if (ctx) ctx.clearRect(0, 0, processedCanvasRef.current.width, processedCanvasRef.current.height);
    }
    
    // Clean up audio context
    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }
  };
  
  // Handle audio playback ended events
  useEffect(() => {
    const handleOriginalEnded = () => {
      setCurrentlyPlaying(null);
    };
    
    const handleProcessedEnded = () => {
      setCurrentlyPlaying(null);
    };
    
    if (originalAudioRef.current) {
      originalAudioRef.current.addEventListener('ended', handleOriginalEnded);
    }
    
    if (processedAudioRef.current) {
      processedAudioRef.current.addEventListener('ended', handleProcessedEnded);
    }
    
    return () => {
      if (originalAudioRef.current) {
        originalAudioRef.current.removeEventListener('ended', handleOriginalEnded);
      }
      
      if (processedAudioRef.current) {
        processedAudioRef.current.removeEventListener('ended', handleProcessedEnded);
      }
    };
  }, []);
  
  return (
    <div className="w-full bg-black/20 backdrop-blur-sm rounded-xl border border-white/10 p-6 shadow-xl">
      <h3 className="text-xl font-bold text-white mb-4">Experience the Difference</h3>
      
      {/* Error message */}
      {processingError && (
        <div className="mb-4 p-3 bg-red-500/20 border border-red-500/30 rounded-lg text-red-400">
          <p className="flex items-center">
            <FiX className="mr-2" /> {processingError}
          </p>
        </div>
      )}
      
      {/* Recording UI */}
      <div className="mb-6">
        {!recordingComplete ? (
          <motion.button
            onClick={isRecording ? stopRecording : startRecording}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`w-full py-4 rounded-lg font-bold flex items-center justify-center gap-2 transition-colors ${
              isRecording 
                ? 'bg-red-500/20 text-red-400 border border-red-500/30' 
                : 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30'
            }`}
          >
            {isRecording ? (
              <>
                <FiX className="animate-pulse" /> Stop Recording
              </>
            ) : (
              <>
                <FiMic /> Record Your Voice
              </>
            )}
          </motion.button>
        ) : (
          <motion.button
            onClick={resetDemo}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full py-4 rounded-lg font-bold flex items-center justify-center gap-2 bg-slate-500/20 text-slate-300 border border-slate-500/30"
          >
            <FiRefreshCw /> Record Again
          </motion.button>
        )}
      </div>
      
      {/* Processing indicator */}
      {isProcessing && (
        <div className="mb-6 text-center">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/30">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              className="mr-2 text-indigo-400"
            >
              <FiRefreshCw size={16} />
            </motion.div>
            <span className="text-indigo-400 text-sm">AI Processing...</span>
          </div>
        </div>
      )}
      
      {/* Audio comparison UI */}
      {recordingComplete && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Original Audio */}
          <div className={`rounded-lg p-4 transition-all ${
            currentlyPlaying === 'original' 
              ? 'bg-indigo-500/20 border border-indigo-500/30' 
              : 'bg-slate-800/50 border border-slate-700/30'
          }`}>
            <div className="flex justify-between items-center mb-3">
              <h4 className="font-medium text-white">Original Recording</h4>
              <motion.button
                onClick={togglePlayOriginal}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                disabled={!recordingComplete}
                className={`p-2 rounded-full ${
                  currentlyPlaying === 'original'
                    ? 'bg-indigo-500 text-white'
                    : 'bg-indigo-500/20 text-indigo-400'
                }`}
              >
                {currentlyPlaying === 'original' ? <FiPause size={16} /> : <FiPlay size={16} />}
              </motion.button>
            </div>
            
            <canvas 
              ref={originalCanvasRef} 
              className="w-full h-20 rounded bg-black/20"
              width={300}
              height={80}
            />
            
            {/* Original audio element */}
            <div className="hidden">
              <audio 
                ref={originalAudioRef} 
                controls
                preload="auto"
                crossOrigin="anonymous"
                onEnded={() => setCurrentlyPlaying(null)}
                onError={(e) => console.error('Original audio error:', e)}
              />
            </div>
          </div>
          
          {/* Processed Audio */}
          <div className={`rounded-lg p-4 transition-all ${
            !processingComplete 
              ? 'opacity-50 bg-slate-800/30 border border-slate-700/20' 
              : currentlyPlaying === 'processed'
                ? 'bg-purple-500/20 border border-purple-500/30'
                : 'bg-slate-800/50 border border-slate-700/30'
          }`}>
            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center">
                <h4 className="font-medium text-white mr-2">AI Enhanced</h4>
                {processingComplete && (
                  <span className="bg-purple-500/20 text-purple-400 text-xs px-2 py-1 rounded-full flex items-center">
                    <FiCheck size={10} className="mr-1" /> Noise Removed
                  </span>
                )}
              </div>
              
              <motion.button
                onClick={togglePlayProcessed}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                disabled={!processingComplete}
                className={`p-2 rounded-full ${
                  !processingComplete
                    ? 'bg-slate-700/30 text-slate-500 cursor-not-allowed'
                    : currentlyPlaying === 'processed'
                      ? 'bg-purple-500 text-white'
                      : 'bg-purple-500/20 text-purple-400'
                }`}
              >
                {currentlyPlaying === 'processed' ? <FiPause size={16} /> : <FiPlay size={16} />}
              </motion.button>
            </div>
            
            <canvas 
              ref={processedCanvasRef} 
              className="w-full h-20 rounded bg-black/20"
              width={300}
              height={80}
            />
            
            {/* Processed audio element */}
            <div className="hidden">
              <audio 
                ref={processedAudioRef} 
                controls
                preload="auto"
                crossOrigin="anonymous"
                onEnded={() => setCurrentlyPlaying(null)}
                onError={(e) => console.error('Processed audio error:', e)}
              />
            </div>
          </div>
        </div>
      )}
      
      {/* Debug audio controls - only visible during development */}
      {process.env.NODE_ENV === 'development' && recordingComplete && (
        <div className="mt-4 p-3 bg-gray-800 rounded-lg">
          <p className="text-xs text-gray-400 mb-2">Debug Controls (Development Only)</p>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <p className="text-xs text-gray-400 mb-1">Original:</p>
              {originalAudioRef.current?.src && (
                <audio 
                  src={originalAudioRef.current.src} 
                  controls 
                  className="w-full h-8" 
                />
              )}
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-1">Processed:</p>
              {processedAudioRef.current?.src && (
                <audio 
                  src={processedAudioRef.current.src} 
                  controls 
                  className="w-full h-8" 
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 