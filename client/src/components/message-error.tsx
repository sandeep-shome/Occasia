import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "./ui/button";
import { RotateCcw } from "lucide-react";

const MessageError = ({ retryHandler }: { retryHandler: () => void }) => {
  return (
    <>
      <Card className="border-destructive w-full lg:w-[60%]">
        <CardHeader>
          <CardTitle className="text-destructive">
            Something went wrong! 😭
          </CardTitle>
          <CardDescription className="text-destructive">
            Don't worry no token will be deducted for a failure message
          </CardDescription>
        </CardHeader>
        <CardContent className="text-destructive text-sm">
          Sorry! Sometimes there may happen multiple internal server errors or
          other issues, please be patients and try to regenerate. No tokens will
          be deducted for this failed message{" "}
        </CardContent>
        <CardFooter>
          <Button variant={"outline"} size={"icon"} onClick={retryHandler}>
            <RotateCcw className="size-4 text-neutral-600" />
          </Button>
        </CardFooter>
      </Card>
    </>
  );
};

export default MessageError;
