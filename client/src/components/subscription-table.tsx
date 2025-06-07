"use client";

import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useSubscription } from "@/hooks/use-subscription";
import { useUser } from "@clerk/nextjs";
import { Skeleton } from "./ui/skeleton";
import { toast } from "sonner";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { setInitialSubscriptionState } from "@/store/features/subscription-slice";

interface Subscription {
  id: String;
  tokens: number;
  userId: String;
  amount: number;
  successful: Boolean;
  createdAt: Date;
}

const SubscriptionTable = () => {
  const { pending, error, getSubscriptions } = useSubscription();
  const user = useUser();
  const dispatch = useAppDispatch();

  const [data, setData] = useState<Subscription[] | null>(null);
  const subscriptionState = useAppSelector((state) => state.subscription);

  const handleGetSubscriptions = async () => {
    const res = await getSubscriptions(user.user?.id!);
    if (res) {
      console.log(res);
      setData(res.data.data);
    }
  };

  useEffect(() => {
    if (data) {
      dispatch(setInitialSubscriptionState({ data }));
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      toast.error(error?.message);
    }
  }, [error]);

  useEffect(() => {
    if (user.isLoaded) {
      handleGetSubscriptions();
    }
  }, [user.isLoaded]);
  return (
    <>
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="">Invoice</TableHead>
            <TableHead>Tokens</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {pending ? (
            Array(4)
              .fill(true)
              .map((_, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Skeleton className="w-32 h-4" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="w-32 h-4" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="w-32 h-4" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="w-32 h-4" />
                  </TableCell>
                  <TableCell className="text-right">
                    <Skeleton className="w-32 h-4" />
                  </TableCell>
                </TableRow>
              ))
          ) : subscriptionState.data && subscriptionState.data.length > 0 ? (
            subscriptionState.data.map((invoice, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{invoice.id}</TableCell>
                <TableCell>{invoice.tokens}</TableCell>
                <TableCell>
                  {invoice.successful ? "Success" : "Failed"}
                </TableCell>
                <TableCell>
                  {invoice.createdAt.toString().split("T")[0]}
                </TableCell>
                <TableCell className="text-right">{invoice.amount}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableCell colSpan={5} className="text-center py-10">
              No Subscriptions
            </TableCell>
          )}
        </TableBody>
      </Table>
    </>
  );
};

export default SubscriptionTable;
