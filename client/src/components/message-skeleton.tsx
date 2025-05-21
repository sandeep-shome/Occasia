import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "./ui/skeleton";

const MessageSkeleton = () => {
  return (
    <>
      <Card className="w-full lg:w-[60%]">
        <CardHeader>
          <CardTitle>
            <Skeleton className="w-28 h-4" />
          </CardTitle>
          <CardDescription>
            <Skeleton className="w-38 h-4" />
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="space-y-2">
            <Skeleton className="w-28 h-4" />
            <Skeleton className="w-24 h-4" />
            <Skeleton className="w-20 h-4" />
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default MessageSkeleton;
