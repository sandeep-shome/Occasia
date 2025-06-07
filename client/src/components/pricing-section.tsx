import React from "react";
import { ShinyButton } from "./magicui/shiny-button";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { Check } from "lucide-react";

const PricingSection = () => {
  return (
    <>
      <section className="w-full mt-28" id="pricing">
        <div className="w-[90%] md:w-2/5 mx-auto">
          <h3 className="text-black/75 dark:text-white/75 font-bold text-2xl md:text-4xl text-center">
            Simple no-tricks pricing
          </h3>
          <p className="text-center text-wrap mt-4 text-black/55 dark:text-white/45">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Beatae
            officia ab voluptatem odit laborum voluptatum?
          </p>
        </div>

        <div className="w-[90%] mx-auto mt-10 border rounded-2xl p-2 flex items-center justify-between gap-4 flex-col-reverse md:flex-row">
          <div className="flex-4/5 p-8">
            <h4 className="text-3xl font-bold">Pay as you go</h4>
            <p className="text-neutral-500 mt-4">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut,
              reiciendis? Lorem ipsum dolor, sit amet consectetur adipisicing
              elit. Id necessitatibus commodi amet?
            </p>
            <div className="w-full flex items-center justify-center gap-4 mt-6">
              <span className="">What's included</span>
              <Separator orientation="horizontal" className="flex-1 mt-1" />
            </div>
            <div className="w-full grid grid-col-1 md:grid-cols-2 gap-2 mt-4">
              <div className="h-10 flex items-center justify-start gap-4">
                <Check className="size-5 text-indigo-600" />
                <span>AI Generation</span>
              </div>
              <div className="h-10 flex items-center justify-start gap-4">
                <Check className="size-5 text-indigo-600" />
                <span>Unlimited Modifications</span>
              </div>
              <div className="h-10 flex items-center justify-start gap-4">
                <Check className="size-5 text-indigo-600" />
                <span>Natural Humanastic Models</span>
              </div>
              <div className="h-10 flex items-center justify-start gap-4">
                <Check className="size-5 text-indigo-600" />
                <span>Unlimited Downloads</span>
              </div>
            </div>
          </div>
          <div className="flex-2/5 border border-gray-950/[.1] bg-gray-950/[.01] rounded-2xl p-10 flex items-center flex-col gap-6 dark:border-gray-50/[.1] dark:bg-gray-50/[.10]">
            <h5 className="text-xl font-semibold ">Pay once, own it forever</h5>
            <h4>
              <strong className="text-4xl font-bold">$0.14</strong> / Speech
            </h4>
            <Button className="mt-4 w-full">Get started</Button>
            <span className="text-center text-sm text-neutral-500 dark:text-white/40">
              Lorem ipsum dolor sit amet consectetur. Lorem, ipsum dolor.
            </span>
          </div>
        </div>
      </section>
    </>
  );
};

export default PricingSection;
