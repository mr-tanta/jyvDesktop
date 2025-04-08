import Image from 'next/image';
import { Sliders, Music } from 'lucide-react';

const ScreenshotGallery = () => {
  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-black to-transparent z-10"></div>
      <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-black to-transparent z-10"></div>
      
      <div className="relative overflow-hidden rounded-2xl border border-gray-800 shadow-2xl">
        <div className="h-[500px] sm:h-[600px] w-full relative">
          <Image 
            src="/assets/images/app-screenshot.webp" 
            alt="JyvDesktop interface" 
            fill
            className="object-cover object-center"
            quality={90}
          />
          
          {/* User interface overlay highlights */}
          <div className="absolute top-20 right-20 bg-green-500 bg-opacity-20 backdrop-blur-lg rounded-lg p-2 border border-green-500/30 shadow-lg shadow-green-500/10 animate-pulse" style={{ animationDuration: '4s' }}>
            <div className="h-4 w-20 bg-green-500/50 rounded-full"></div>
          </div>
          
          <div className="absolute bottom-40 left-60 bg-green-500 bg-opacity-20 backdrop-blur-lg rounded-lg p-2 border border-green-500/30 shadow-lg shadow-green-500/10 animate-pulse" style={{ animationDuration: '3s', animationDelay: '1s' }}>
            <div className="h-4 w-16 bg-green-500/50 rounded-full"></div>
          </div>
        </div>
      </div>
      
      {/* UI feature indicators */}
      <div className="hidden md:block absolute top-1/4 left-8 bg-gray-900/70 backdrop-blur-md p-4 rounded-lg border border-gray-800 max-w-xs">
        <h3 className="text-green-500 font-medium mb-2 flex items-center">
          <Sliders size={16} className="mr-2" />
          Precision Controls
        </h3>
        <p className="text-gray-300 text-sm">Fine-tune every aspect of your audio with professional-grade parameters</p>
      </div>
      
      <div className="hidden md:block absolute bottom-1/4 right-8 bg-gray-900/70 backdrop-blur-md p-4 rounded-lg border border-gray-800 max-w-xs">
        <h3 className="text-green-500 font-medium mb-2 flex items-center">
          <Music size={16} className="mr-2" />
          Audio Visualization
        </h3>
        <p className="text-gray-300 text-sm">Real-time visualization helps you monitor and perfect your audio</p>
      </div>
      
      {/* App screenshots thumbnail strip */}
      <div className="flex justify-center gap-4 mt-8 overflow-x-auto pb-4 scrollbar-hide">
        {[1, 2, 3, 4].map((img) => (
          <div key={img} className="relative w-40 h-24 flex-shrink-0 rounded-lg overflow-hidden border border-gray-800">
            <Image 
              src={`/assets/images/screenshot-${img}.webp`} 
              alt={`JyvDesktop screenshot ${img}`} 
              fill
              className="object-cover hover:scale-110 transition-transform duration-300"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScreenshotGallery; 