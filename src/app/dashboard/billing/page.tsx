"use client";

import LoadingSpinner from "@/components/loading-spinner";
import SubscriptionTable from "@/components/subscription-table";
import { Button } from "@/components/ui/button";
import { usePayment } from "@/hooks/use-payment";
import { addToSubscription } from "@/store/features/subscription-slice";
import { addToken } from "@/store/features/token-slice";
import { useAppDispatch } from "@/store/store";
import { useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.append(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const user = useUser();
  const dispatch = useAppDispatch();
  const { pending, error, data, payment } = usePayment();
  const [tokens, setTokens] = useState<number>(20);

  useEffect(() => {
    if (error) {
      toast.error(error.message);
    }
  }, [error]);

  useEffect(() => {
    if (data && data.tokens > 0) {
      router.push("/dashboard");
      dispatch(addToken({ tokens: data.tokens }));
      dispatch(addToSubscription({ data: data.subscriptionData }));
      toast(data.message);
    }
  }, [data]);

  const handlePurchase = async () => {
    await payment(tokens, user.user?.id || "");
  };

  return (
    <>
      <div className="w-full flex items-center justify-between mb-10">
        <h3 className="text-sm font-semibold text-muted-foreground">
          Subscription
        </h3>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="min-w-32">Purchase tokens</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add Tokens</DialogTitle>
              <DialogDescription>
                Make changes to your profile here. Click save when you're done.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-right">
                  Tokens
                </Label>
                <div className="flex items-center justify-between gap-2">
                  <Slider
                    defaultValue={[tokens]}
                    max={100}
                    min={10}
                    step={1}
                    onValueChange={(e) => setTokens(e[0])}
                  />
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-neutral-600">{tokens}</span>
                    <Separator orientation="vertical" />
                    <p className="text-sm text-neutral-600 flex items-center">
                      <span>₹</span> {tokens * 12}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handlePurchase} className="min-w-32">
                {pending ? (
                  <LoadingSpinner className="size-4" />
                ) : (
                  "Purchase token"
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <SubscriptionTable />
    </>
  );
};

export default Page;
