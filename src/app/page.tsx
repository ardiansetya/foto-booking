import BookingSteps from "@/components/home/BookingSteps";
import BrandStatement from "@/components/home/BrandStatement";
import FinalCTA from "@/components/home/FinalCTA";
import Hero from "@/components/home/Hero";
import SelectedWorks from "@/components/home/SelectedWorks";
import Services from "@/components/home/Services";
import Testimonials from "@/components/home/Testimonials";

export default function Home() {
  return (
    <>
      <Hero />
      <SelectedWorks />
      <BrandStatement />
      <Services />
      <Testimonials />
      <BookingSteps />
      <FinalCTA />
    </>
  );
}
