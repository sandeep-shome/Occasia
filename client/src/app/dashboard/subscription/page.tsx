import { Button } from "@/components/ui/button";
import React from "react";

const page = () => {
  return (
    <>
      <div className="w-full flex items-center justify-between">
        <h3 className="text-sm font-semibold text-neutral-700">Subscription</h3>
        <Button>Purchase tokens</Button>
      </div>
      <div className="w-full h-96 flex items-center justify-center">
        <span className="text-neutral-400">No Subscriptions</span>
      </div>
    </>
  );
};

export default page;
