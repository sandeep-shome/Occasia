"use client";

import LoadingSpinner from "@/components/loading-spinner";
import SubscriptionTable from "@/components/subscription-table";
import { Button } from "@/components/ui/button";
import { usePayment } from "@/hooks/use-payment";
import { addToken } from "@/store/features/token-slice";
import { useAppDispatch } from "@/store/store";
import { useUser } from "@clerk/nextjs";
import React, { useEffect } from "react";
import { toast } from "sonner";

const Page = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.append(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const tokens: number = 20;
  const user = useUser();
  const dispatch = useAppDispatch();
  const { pending, error, data, payment } = usePayment();

  useEffect(() => {
    if (error) {
      toast.error(error.message);
    }
  }, [error]);

  useEffect(() => {
    if (data && data.tokens > 0) {
      dispatch(addToken({ tokens: data.tokens }));
      toast(data.message);
    }
  }, [data]);

  const handlePurchase = async () => {
    await payment(tokens, user.user?.id || "");
  };

  return (
    <>
      <div className="w-full flex items-center justify-between mb-10">
        <h3 className="text-sm font-semibold text-neutral-700">Subscription</h3>
        <Button
          onClick={handlePurchase}
          disabled={pending}
          className="min-w-36"
        >
          {pending ? (
            <LoadingSpinner className="size-4" />
          ) : (
            "  Purchase tokens"
          )}
        </Button>
      </div>
      {/* <div className="w-full h-96 flex items-center justify-center">
        <span className="text-neutral-400">No Subscriptions</span>
      </div> */}
      <SubscriptionTable />
    </>
  );
};

export default Page;
