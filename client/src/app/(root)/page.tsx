import React from "react";
import { AuroraText } from "@/components/magicui/aurora-text";
import { Button } from "@/components/ui/button";
import HeroVideoDialog from "@/components/magicui/hero-video-dialog";
import TestimonialsSction from "@/components/testimonials-section";
import PricingSection from "@/components/pricing-section";

function page() {
  return (
    <>
      <section className="lg:grid lg:place-content-center">
        <div className="mx-auto w-screen max-w-screen-xl px-4 py-28 sm:px-6 lg:px-8">
          <div className="mx-auto w-full lg:max-w-3/5 text-center">
            <h1 className="text-4xl font-bold tracking-tighter text-center md:text-5xl lg:text-6xl">
              Write Powerful <AuroraText>Speeches </AuroraText> <br /> in
              Seconds with <AuroraText>AI </AuroraText>
            </h1>

            <p className="mt-4 text-base text-pretty text-gray-700 sm:text-lg/relaxed">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque,
              nisi. Natus, provident accusamus impedit minima harum corporis
              iusto.
            </p>

            <div className="mt-4 flex justify-center gap-4 sm:mt-6">
              <Button className="" size={"lg"}>
                Get started
              </Button>
              <Button className="" size={"lg"} variant={"link"}>
                Learn more
              </Button>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full">
        <div className="max-w-4/5 mx-auto">
          <HeroVideoDialog
            className="block dark:hidden"
            animationStyle="from-center"
            videoSrc="https://www.youtube.com/embed/qh3NGpYRG3I?si=4rb-zSdDkVK9qxxb"
            thumbnailSrc="https://startup-template-sage.vercel.app/hero-light.png"
            thumbnailAlt="Hero Video"
          />
          <HeroVideoDialog
            className="hidden dark:block"
            animationStyle="from-center"
            videoSrc="https://www.youtube.com/embed/qh3NGpYRG3I?si=4rb-zSdDkVK9qxxb"
            thumbnailSrc="https://startup-template-sage.vercel.app/hero-dark.png"
            thumbnailAlt="Hero Video"
          />
        </div>
      </section>
      <PricingSection />
      <TestimonialsSction />
    </>
  );
}

export default page;
