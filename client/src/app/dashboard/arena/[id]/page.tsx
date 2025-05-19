"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useGenerate } from "@/hooks/use-generate";
import { SpeechData } from "@/types";
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
  const { pending, error, getSpeech } = useGenerate();
  const [speechData, setSpeechData] = useState<SpeechData>();

  const handleGenerateSpeech = async () => {
    const data = await getSpeech(params.id);
    if (error) toast.warning(error);
    if (data) setSpeechData(data);
  };

  useEffect(() => {
    handleGenerateSpeech();
  }, []);

  return (
    <>
      <section className="w-full flex items-center justify-center">
        <Card className="w-full lg:w-[60%]">
          <CardHeader>
            <CardTitle>
              {pending ? <Skeleton className="w-28 h-4" /> : speechData?.name}
            </CardTitle>
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
            {pending ? (
              <div className="space-y-2">
                <Skeleton className="w-28 h-4" />
                <Skeleton className="w-24 h-4" />
                <Skeleton className="w-20 h-4" />
              </div>
            ) : (
              <div className="">{speechData?.result}</div>
            )}
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
      </section>
    </>
  );
}

export default page;
