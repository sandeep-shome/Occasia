import React from "react";
import TestimonialsSction from "@/components/testimonials-section";
import PricingSection from "@/components/pricing-section";
import HeroSection from "@/components/hero-section";
import HeroVideoSection from "@/components/hero-video-section";

function page() {
  return (
    <>
      <HeroSection />
      <HeroVideoSection />
      <PricingSection />
      <TestimonialsSction />
    </>
  );
}

export default page;
