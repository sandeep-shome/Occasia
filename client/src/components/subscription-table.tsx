import React, { useEffect } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useSubscription } from "@/hooks/use-subscription";
import { useUser } from "@clerk/nextjs";
import { Skeleton } from "./ui/skeleton";
import { toast } from "sonner";

const SubscriptionTable = () => {
  const { pending, error, getSubscriptions, data } = useSubscription();
  const user = useUser();
  const handleGetSubscriptions = async () => {
    await getSubscriptions(user.user?.id!);
  };

  useEffect(() => {
    toast.error(error?.message);
  }, [error]);

  useEffect(() => {
    handleGetSubscriptions();
  }, []);
  return (
    <>
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Invoice</TableHead>
            <TableHead>Tokens</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {pending
            ? Array(4)
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
            : data?.map((invoice, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{invoice.id}</TableCell>
                  <TableCell>{invoice.tokens}</TableCell>
                  <TableCell>
                    {invoice.successful ? "Success" : "Failed"}
                  </TableCell>
                  <TableCell>{invoice.createdAt.toDateString()}</TableCell>
                  <TableCell className="text-right">{invoice.amount}</TableCell>
                </TableRow>
              ))}
        </TableBody>
      </Table>
    </>
  );
};

export default SubscriptionTable;
