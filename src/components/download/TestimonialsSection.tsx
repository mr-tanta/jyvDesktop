import { Testimonial } from '@/data/downloadData';
import SectionTitle from '../common/SectionTitle';
import TestimonialCard from './TestimonialCard';
import { Star } from 'lucide-react';

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
}

const TestimonialsSection = ({ testimonials }: TestimonialsSectionProps) => {
  return (
    <section className="py-24 relative" id="testimonials">
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-green-500/20 to-transparent"></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <SectionTitle
          title="Loved by audio enthusiasts"
          description="Join thousands of satisfied users who have transformed their audio experience with JyvDesktop"
          badge={{ text: "User stories", icon: <Star size={14} className="text-green-400" /> }}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} testimonial={testimonial} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection; 