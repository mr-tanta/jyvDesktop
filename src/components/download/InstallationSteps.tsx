import { motion } from 'framer-motion';
import Image from 'next/image';
import { Platform } from '@/data/downloadData';
import SectionTitle from '../common/SectionTitle';

interface InstallationStepsProps {
  platform: Platform;
}

const InstallationSteps = ({ platform }: InstallationStepsProps) => {
  return (
    <section className="py-16 bg-gray-900/30">
      <div className="container mx-auto px-4">
        <SectionTitle 
          title={`Installing JyvDesktop on ${platform.name}`}
          description="Follow these simple steps to get started with JyvDesktop"
        />
        
        <div className="mt-12">
          {/* Timeline style installation steps */}
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-green-500/50 to-green-500/10 transform md:translate-x-[-50%]"></div>
            
            {/* Steps */}
            <div className="space-y-12 md:space-y-24 relative">
              {platform.installSteps.map((step, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-8 relative`}
                >
                  {/* Step number */}
                  <div className="absolute left-[-12px] md:left-1/2 md:transform md:translate-x-[-50%] w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-black font-bold text-sm z-10">
                    {index + 1}
                  </div>
                  
                  {/* Image */}
                  <div className="w-full md:w-1/2 flex justify-center md:justify-end">
                    <div className="relative w-full max-w-md h-64 rounded-xl overflow-hidden border border-gray-700 shadow-lg">
                      <Image 
                        src={step.image} 
                        alt={step.title} 
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <h3 className="text-xl font-bold text-white">{step.title}</h3>
                      </div>
                    </div>
                  </div>
                  
                  {/* Description */}
                  <div className="w-full md:w-1/2 p-6 bg-black/30 backdrop-blur-sm rounded-xl border border-gray-800">
                    <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                    <p className="text-gray-300">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InstallationSteps;