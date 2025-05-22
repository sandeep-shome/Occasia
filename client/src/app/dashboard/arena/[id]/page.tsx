"use client";

import MessageSkeleton from "@/components/message-skeleton";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useGenerate } from "@/hooks/use-generate";
import { deductToken } from "@/store/features/token-slice";
import { useAppDispatch } from "@/store/store";
import { AxiosResponse } from "axios";
import {
  Clipboard,
  Download,
  Pen,
  RotateCcw,
  ThumbsDown,
  ThumbsUp,
} from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

function page() {
  const params = useParams<{ id: string }>();
  const { pending, error, generateSpeech, retryToGenerateSpeech } =
    useGenerate();
  const dispatch = useAppDispatch();

  const [speechData, setSpeechData] = useState<AxiosResponse | null>();

  const handleGenerateSpeech = async () => {
    const data = await generateSpeech(params.id);
    setSpeechData(data);
  };

  const handleRetryToGenerateSpeech = async () => {
    const data = await retryToGenerateSpeech(params.id);
    setSpeechData(data);
  };

  useEffect(() => {
    if (error) {
      toast.error(error.message);
    }
  }, [error]);

  useEffect(() => {
    if (speechData) {
      if (speechData.status === 201) dispatch(deductToken());
    }
  }, [speechData]);

  useEffect(() => {
    handleGenerateSpeech();
  }, []);

  return (
    <>
      <section className="w-full flex items-center justify-center">
        {pending ? (
          <MessageSkeleton />
        ) : error != null && error.status === 418 ? (
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
              Sorry! Sometimes there may happen multiple internal server errors
              or other issues, please be patients and try to regenerate. No
              tokens will be deducted for this failed message{" "}
            </CardContent>
            <CardFooter>
              <Button
                variant={"outline"}
                size={"icon"}
                onClick={handleRetryToGenerateSpeech}
              >
                <RotateCcw className="size-4 text-neutral-600" />
              </Button>
            </CardFooter>
          </Card>
        ) : (
          <Card className="w-full lg:w-[60%]">
            <CardHeader>
              <CardTitle>{speechData?.data.name}</CardTitle>
              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Button variant={"outline"} size={"icon"}>
                    <Pen className="size-4 text-neutral-600" />
                  </Button>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant={"outline"} size={"icon"}>
                    <Clipboard className="size-4 text-neutral-600" />
                  </Button>
                  <Button variant={"outline"} size={"icon"}>
                    <RotateCcw className="size-4 text-neutral-600" />
                  </Button>
                  <Button variant={"outline"} size={"icon"}>
                    <Download className="size-4 text-neutral-600" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-5">
              {<div className="">{speechData?.data.result}</div>}
            </CardContent>
            <CardFooter>
              <div className="flex items-center gap-2">
                <Button variant={"outline"} size={"icon"}>
                  <ThumbsUp className="size-4 text-neutral-600" />
                </Button>
                <Button variant={"outline"} size={"icon"}>
                  <ThumbsDown className="size-4 text-neutral-600" />
                </Button>
              </div>
            </CardFooter>
          </Card>
        )}
      </section>
    </>
  );
}

export default page;
