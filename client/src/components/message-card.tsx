"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { SpeechData } from "@/types";
import { Download, EllipsisVertical, Pen, RotateCcw, Save } from "lucide-react";
import CopyButton from "./copy-button";
import { cn } from "@/lib/utils";
import { useSpeechUpdate } from "@/hooks/use-speech-update";
import { toast } from "sonner";
import LoadingSpinner from "./loading-spinner";
import RegenerateDialog from "./regenerate-dialog";

interface MessageCardProps {
  speechData: SpeechData;
  handleRegeneration: (
    suggestions: string,
    duration: number,
    currentMessage: string
  ) => void;
}

const MessageCard: React.FC<MessageCardProps> = ({
  speechData,
  handleRegeneration,
}) => {
  const [speechResult, setSpeechResult] = useState<string>(speechData?.result);
  const [editable, setEditable] = useState<boolean>(false);
  const [suggestions, setSuggestions] = useState<string>("");
  const [duration, setDuration] = useState<number>(5);

  const regenerationHandler = () => {
    handleRegeneration(suggestions, duration, speechResult);
  };

  const { pending, error, updateMessage } = useSpeechUpdate();

  const handleUpdateMessage = async () => {
    const res = await updateMessage(speechData.id, speechResult);
    if (res) {
      setEditable(false);
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(error.message);
    }
  }, [error]);

  return (
    <Card className="w-full lg:w-[60%]">
      <CardHeader>
        <CardTitle>{speechData?.name}</CardTitle>
        <CardDescription className="flex items-center">
          {speechData?.lang.toUpperCase()}
        </CardDescription>
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {editable ? (
              <Button
                variant={"ghost"}
                size={"icon"}
                onClick={handleUpdateMessage}
                className=""
              >
                {pending ? (
                  <LoadingSpinner className="size-4" />
                ) : (
                  <Save className="size-4 text-neutral-600" />
                )}
              </Button>
            ) : (
              <Button
                variant={"ghost"}
                size={"icon"}
                onClick={() => setEditable((prev) => !prev)}
              >
                <Pen className="size-4 text-neutral-600" />
              </Button>
            )}
          </div>
          <div className="flex items-center gap-0.5">
            <CopyButton data={speechResult} />
            <RegenerateDialog
              suggestions={suggestions}
              duration={duration}
              setSuggestions={setSuggestions}
              setDuration={setDuration}
              handleGeneration={regenerationHandler}
              regenerationCount={speechData?.regenerationCount}
            />
            <Button variant={"ghost"} size={"icon"}>
              <Download className="size-4 text-neutral-600" />
            </Button>
            <Button variant={"ghost"} size={"icon"}>
              <EllipsisVertical className="size-4 text-neutral-600" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-5">
        <Textarea
          value={speechResult}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setSpeechResult(e.target.value)
          }
          className={cn(
            "border-none outline-none  resize-none",
            editable ? "pointer-events-auto" : "pointer-events-none"
          )}
          disabled={pending}
        />
      </CardContent>
    </Card>
  );
};

export default MessageCard;
