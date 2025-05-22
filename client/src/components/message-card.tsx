"use client";

import React, { useState } from "react";
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

interface MessageCardProps {
  speechData: SpeechData;
}

const MessageCard: React.FC<MessageCardProps> = ({ speechData }) => {
  const [speechResult, setSpeechResult] = useState<string>(speechData?.result);
  const [editable, setEditable] = useState<boolean>(false);
  return (
    <Card className="w-full lg:w-[60%]">
      <CardHeader>
        <CardTitle>{speechData?.name}</CardTitle>
        <CardDescription className="flex items-center">
          {speechData?.lang.toUpperCase()}
        </CardDescription>
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button
              variant={"ghost"}
              size={"icon"}
              onClick={() => setEditable((prev) => !prev)}
            >
              {editable ? (
                <Save className="size-4 text-neutral-600" />
              ) : (
                <Pen className="size-4 text-neutral-600" />
              )}
            </Button>
          </div>
          <div className="flex items-center gap-0.5">
            <CopyButton data={speechResult} />
            <Button variant={"ghost"} size={"icon"}>
              <RotateCcw className="size-4 text-neutral-600" />
            </Button>
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
        />
      </CardContent>
    </Card>
  );
};

export default MessageCard;
