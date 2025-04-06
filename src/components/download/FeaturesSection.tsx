import { Feature } from '@/data/downloadData';
import FeatureCard from './FeatureCard';
import SectionTitle from '../common/SectionTitle';

interface FeaturesSectionProps {
  features: Feature[];
}

const FeaturesSection = ({ features }: FeaturesSectionProps) => {
  return (
    <section className="py-24 relative" id="features">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <SectionTitle
          title="Transform Your Audio Experience"
          description="JyvDesktop brings powerful audio processing technology to your device, enhancing clarity, removing background noise, and creating immersive sound environments."
          badge={{ text: "Powerful features" }}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection; 