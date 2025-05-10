import React, { ButtonHTMLAttributes } from "react";
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

type speech = {
  name: string;
  public_prompt: string;
  internal_prompt: string;
};

interface ModalButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  speech: speech;
}

function ModalButton({ speech, ...props }: ModalButtonProps) {
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
              <div className="w-full space-y-3">
                <Label>Prompt</Label>
                <Textarea
                  value={speech.public_prompt}
                  className="h-28 resize-none"
                />
              </div>
              <div className="space-y-3">
                <Label>Speech language</Label>
                <div className="w-full flex items-center gap-2 flex-wrap">
                  {languages.map((language) => (
                    <Button variant={"outline"} size={"sm"} key={language}>
                      {language}
                    </Button>
                  ))}
                </div>
              </div>
              <div className="space-y-3">
                <Label>Duration</Label>
                <div className="w-full flex items-center gap-2 justify-between">
                  <Slider max={20} defaultValue={[5]} />
                  <p className="text-sm flex items-center">
                    <span>5</span> Min
                  </p>
                </div>
              </div>
            </div>
          </ModalContent>
          <ModalFooter className="gap-4">
            <Button variant={"outline"}>Cancle</Button>
            <Button>Generate</Button>
          </ModalFooter>
        </ModalBody>
      </Modal>
    </>
  );
}

export default ModalButton;
