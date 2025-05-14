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

  useEffect(() => {
    console.log(lang);
  }, [lang]);

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
                        lang.toLowerCase() === language.toLowerCase()
                          ? "default"
                          : "outline"
                      }
                      size={"sm"}
                      key={language}
                      onClick={() => setLang(language)}
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
            <Button>Generate</Button>
          </ModalFooter>
        </ModalBody>
      </Modal>
    </>
  );
}

export default ModalButton;
