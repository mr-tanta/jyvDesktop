'use client';

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useRef, useEffect, useState, useMemo } from 'react';
import { Color, MathUtils } from 'three';
import { OrbitControls, PerspectiveCamera, Environment, Html } from '@react-three/drei';

// Audio visualizer mesh with frequency response
const VisualizerMesh = () => {
  // Use any type for mesh ref to avoid TypeScript errors with material properties
  const meshRef = useRef<any>(null);
  const [analyser, setAnalyser] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const { camera } = useThree();
  
  // Memoize colors for better performance - updated to green brand colors
  const colors = useMemo(() => ({
    primary: new Color('#22c55e'),    // Green-500
    secondary: new Color('#16a34a'),  // Green-600
    highlight: new Color('#4ade80'),  // Green-400
    accent: new Color('#10b981')      // Emerald-500
  }), []);

  useEffect(() => {
    // Initialize audio context with proper error handling
    const setupAudio = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const audioContext = new AudioContext();
        const source = audioContext.createMediaStreamSource(stream);
        const analyserNode = audioContext.createAnalyser();
        analyserNode.fftSize = 512; // Higher resolution for better visualization
        analyserNode.smoothingTimeConstant = 0.8; // Smoother transitions

        source.connect(analyserNode);
        
        // Create a simple wrapper with getFrequencyData method
        setAnalyser({
          getFrequencyData: () => {
            const data = new Uint8Array(analyserNode.frequencyBinCount);
            analyserNode.getByteFrequencyData(data);
            return data;
          }
        });
        
        // Return cleanup function
        return () => {
          stream.getTracks().forEach(track => track.stop());
          audioContext.close();
        };
      } catch (err) {
        console.error('Audio permission denied or error:', err);
        setError('Could not access microphone');
        return undefined;
      }
    };

    // Set camera position
    camera.position.set(0, 0, 5);
    
    let cleanup: (() => void) | undefined;
    setupAudio().then(cleanupFn => {
      cleanup = cleanupFn;
    }).catch(console.error);
    
    return () => {
      if (cleanup) cleanup();
    };
  }, [camera]);

  // Animation frame update
  useFrame(() => {
    if (!analyser || !meshRef.current) return;

    try {
      const data = analyser.getFrequencyData();
      
      // Calculate different frequency bands for more interesting visuals
      const bass = data.slice(0, 20).reduce((a: number, b: number) => a + b, 0) / 20;
      const mid = data.slice(20, 60).reduce((a: number, b: number) => a + b, 0) / 40;
      const treble = data.slice(60, 120).reduce((a: number, b: number) => a + b, 0) / 60;
      
      // Normalized values (0-1)
      const bassNorm = MathUtils.clamp(bass / 200, 0, 1);
      const midNorm = MathUtils.clamp(mid / 200, 0, 1);
      const trebleNorm = MathUtils.clamp(treble / 200, 0, 1);
      
      // Apply transformations based on audio
      if (meshRef.current) {
        // Scale based on bass
        meshRef.current.scale.set(
          1 + bassNorm * 0.3,
          1 + midNorm * 0.3,
          1 + trebleNorm * 0.3
        );
        
        // Rotation based on mid frequencies
        meshRef.current.rotation.y += midNorm * 0.01;
        
        // Color based on frequency distribution
        meshRef.current.material.color.lerpColors(
          colors.primary,
          colors.accent,
          bassNorm
        );
        
        // Emissive glow based on treble
        meshRef.current.material.emissive.lerpColors(
          new Color('#000000'),
          colors.highlight,
          trebleNorm * 0.5
        );
        
        // Update material properties
        meshRef.current.material.emissiveIntensity = trebleNorm * 2;
        meshRef.current.material.roughness = 0.5 - bassNorm * 0.3;
      }
    } catch (err) {
      console.error('Error processing audio data:', err);
    }
  });

  // Display error message if microphone access failed
  if (error) {
    return (
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial color="#22c55e" />
        <Html center>
          <div className="bg-black/80 text-white p-4 rounded-lg">
            {error}
          </div>
        </Html>
      </mesh>
    );
  }

  return (
    <group>
      <mesh ref={meshRef} scale={1} castShadow receiveShadow>
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial
          metalness={0.6}
          roughness={0.3}
          color={colors.primary}
          emissive={colors.highlight}
          emissiveIntensity={0.2}
        />
      </mesh>
      
      {/* Particles around the sphere */}
      {[...Array(50)].map((_, i) => (
        <Particle 
          key={i} 
          index={i} 
          count={50} 
          analyser={analyser} 
          color={i % 2 === 0 ? colors.primary : colors.accent} 
        />
      ))}
    </group>
  );
};

// Particle component for surrounding effects
interface ParticleProps {
  index: number;
  count: number;
  analyser: any;
  color: Color;
}

const Particle = ({ index, count, analyser, color }: ParticleProps) => {
  const ref = useRef<any>(null);
  const initialPosition = useMemo(() => {
    const phi = Math.acos(-1 + (2 * index) / count);
    const theta = Math.sqrt(count * Math.PI) * phi;
    return [
      2.5 * Math.cos(theta) * Math.sin(phi),
      2.5 * Math.sin(theta) * Math.sin(phi),
      2.5 * Math.cos(phi)
    ] as [number, number, number];
  }, [index, count]);

  useFrame(() => {
    if (!ref.current || !analyser) return;
    
    try {
      const data = analyser.getFrequencyData();
      const freqIndex = Math.floor(index / count * data.length);
      const value = data[freqIndex] / 255;
      
      // Pulse based on frequency
      ref.current.scale.setScalar(0.05 + value * 0.1);
      
      // Subtle movement
      ref.current.position.x = initialPosition[0] + Math.sin(Date.now() * 0.001 + index) * 0.1;
      ref.current.position.y = initialPosition[1] + Math.cos(Date.now() * 0.001 + index) * 0.1;
      ref.current.position.z = initialPosition[2];
    } catch (err) {
      // Silent fail for particles
    }
  });

  return (
    <mesh ref={ref} position={initialPosition}>
      <sphereGeometry args={[0.05, 16, 16]} />
      <meshStandardMaterial 
        color={color} 
        emissive={color} 
        emissiveIntensity={0.5} 
        transparent 
        opacity={0.7} 
      />
    </mesh>
  );
};

export const AudioVisualizer = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!mounted) return null;

  return (
    <Canvas dpr={[1, 2]} className="w-full h-full" shadows>
      <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={45} />
      <color attach="background" args={['#000000']} />
      
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={0.6} castShadow />
      <pointLight position={[-10, -10, -5]} intensity={0.2} color="#10b981" />
      
      <VisualizerMesh />
      
      <OrbitControls 
        enableZoom={false} 
        enablePan={false}
        autoRotate 
        autoRotateSpeed={0.5} 
        minPolarAngle={Math.PI / 3} 
        maxPolarAngle={Math.PI / 1.5}
      />
      
      <Environment preset="night" />
    </Canvas>
  );
};