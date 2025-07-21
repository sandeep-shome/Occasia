import React from "react";
import { AuroraText } from "./magicui/aurora-text";
import Link from "next/link";
import { Button } from "./ui/button";

const HeroSection = () => {
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
              Occasia uses advanced AI to craft powerful, personalized speeches for any occasion—weddings, events, keynotes, or toasts—saving you hours of writing and stress.
            </p>

            <div className="mt-4 flex justify-center gap-4 sm:mt-6">
              <Link href={"/dashboard"}>
                <Button className="" size={"lg"}>
                  Get started
                </Button>
              </Link>
              <Button className="" size={"lg"} variant={"link"}>
                Learn more
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;
