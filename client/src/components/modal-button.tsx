"use client";

import React, { ButtonHTMLAttributes, useEffect, useState } from "react";
import { Button, buttonVariants } from "./ui/button";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalTrigger,
} from "@/components/animated-modal";
import languages from "@/data/languages.json";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Slider } from "./ui/slider";
import { Input } from "./ui/input";
import { Dices } from "lucide-react";
import { useAutoName } from "@/hooks/use-autoname";
import { useUser } from "@clerk/nextjs";
import { useGenerateSpeechId } from "@/hooks/use-generate-speech-id";
import { ISpeechGenerateIdPayload } from "@/types";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import LoadingSpinner from "./loading-spinner";
import axios from "axios";

type speech = {
  name: string;
  public_prompt: string;
  internal_prompt: string;
};

interface ModalButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  speech: speech;
}

function ModalButton({ speech, ...props }: ModalButtonProps) {
  const [name, setName] = useState<string>("ex. wedding speech");
  const [prompt, setPrompt] = useState<string>(speech.public_prompt);
  const [lang, setLang] = useState<string>("english");
  const [duration, setDuration] = useState<number>(5);

  const { generateName } = useAutoName();
  const user = useUser();
  const router = useRouter();

  const { generateId, error, pending } = useGenerateSpeechId();
  const handleGenerateSpeechId = async () => {
    const payload: ISpeechGenerateIdPayload = {
      userId: user.user?.id || "",
      generalPrompt: prompt,
      internalPrompt: speech.internal_prompt,
      duration,
      name,
      lang: lang,
    };
    const res = await generateId(payload);
    if (error) toast(error);
    if (res) router.push(`/dashboard/arena/${res.data.id}`);
  };

  return (
    <>
      <Modal>
        <ModalTrigger
          className={buttonVariants({
            variant: "outline",
            size: "sm",
            className: "text-xs",
          })}
          {...props}
        >
          {speech.name}
        </ModalTrigger>
        <ModalBody>
          <ModalContent>
            <h4 className="text-lg md:text-2xl text-neutral-600 dark:text-neutral-100 font-bold text-center mb-8">
              Generate{" "}
              <span className="px-1 py-0.5 rounded-md bg-gray-100 dark:bg-neutral-800 dark:border-neutral-700 border border-gray-200">
                Speech
              </span>{" "}
              now! ✈️
            </h4>
            <div className="space-y-4">
              <div className="w-full flex items-center gap-2">
                <Label>Speech Name</Label>
                <Input
                  value={name}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setName(e.target.value)
                  }
                  className="w-68"
                />
                <Button
                  variant={"outline"}
                  size={"icon"}
                  onClick={() => setName(generateName())}
                >
                  <Dices className="size-4 text-neutral-600" />
                </Button>
              </div>
              <div className="w-full space-y-3">
                <Label>Prompt</Label>
                <Textarea
                  value={prompt}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                    setPrompt(e.target.value)
                  }
                  className="h-28 resize-none"
                />
              </div>
              <div className="space-y-3">
                <Label>Speech language</Label>
                <div className="w-full flex items-center gap-2 flex-wrap">
                  {languages.map((language) => (
                    <Button
                      variant={
                        lang === language.toLowerCase() ? "default" : "outline"
                      }
                      size={"sm"}
                      key={language}
                      onClick={() => setLang(language.toLowerCase())}
                    >
                      {language}
                    </Button>
                  ))}
                </div>
              </div>
              <div className="space-y-3">
                <Label>Duration</Label>
                <div className="w-full flex items-center gap-2 justify-between">
                  <Slider
                    max={20}
                    defaultValue={[duration]}
                    onValueChange={(e) => setDuration(e[0])}
                  />
                  <p className="text-sm flex items-center gap-0.5">
                    <span>{duration}</span> Min
                  </p>
                </div>
              </div>
            </div>
          </ModalContent>
          <ModalFooter className="gap-2">
            <Button variant={"outline"}>Cancel</Button>
            <Button onClick={handleGenerateSpeechId} className="min-w-24">
              {pending ? <LoadingSpinner className="size-4" /> : "Generate"}
              {/* generate */}
            </Button>
          </ModalFooter>
        </ModalBody>
      </Modal>
    </>
  );
}

export default ModalButton;
