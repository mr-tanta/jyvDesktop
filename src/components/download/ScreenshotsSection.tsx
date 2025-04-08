import ScreenshotGallery from './ScreenshotGallery';
import SectionTitle from '../common/SectionTitle';

const ScreenshotsSection = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <SectionTitle
          title="Professional Audio Control at Your Fingertips"
          description="JyvDesktop brings studio-quality audio enhancement to your desktop with an intuitive, powerful interface designed for both professionals and everyday users."
        />
        
        <ScreenshotGallery />
      </div>
    </section>
  );
};

export default ScreenshotsSection; 