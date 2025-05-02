import { Feature } from '@/data/downloadData';
import { motion } from 'framer-motion';
import { trackFeatureInteraction, EventAction } from '@/lib/analytics';

interface FeatureCardProps {
  feature: Feature;
  index: number;
}

const FeatureCard = ({ feature, index }: FeatureCardProps) => {
  // Handle feature card click
  const handleFeatureClick = () => {
    trackFeatureInteraction(feature.title, EventAction.Click);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ 
        y: -5,
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" 
      }}
      onClick={handleFeatureClick}
      className="bg-gradient-to-b from-gray-900 to-black border border-gray-800 rounded-2xl p-6 hover:border-green-500/30 transition-all cursor-pointer"
    >
      <div className="bg-green-500/10 p-3 rounded-xl w-12 h-12 flex items-center justify-center mb-6">
        {feature.icon}
      </div>
      <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
      <p className="text-gray-400">{feature.description}</p>
    </motion.div>
  );
};

export default FeatureCard; 
