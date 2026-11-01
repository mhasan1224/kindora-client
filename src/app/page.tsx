import HeroSection from "@/components/Hero/HeroSection";
import FeaturesSection from "@/components/Home/FeaturesSection";
import GallerySection from "@/components/Home/GallerySection";
import HowItWorksSection from "@/components/Home/HowItWorksSection";
import RecentEventsSection from "@/components/Home/RecentEventsSection";


export default function Home() {
  return (
    <div>
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <RecentEventsSection />
      <GallerySection />
    </div>
  );
}