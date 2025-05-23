import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { RotateCcw } from "lucide-react";
import { Button, buttonVariants } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Slider } from "./ui/slider";

interface RegenerateDialog {
  suggestions: string;
  setSuggestions: (param: any) => void;
  duration: number;
  setDuration: (param: any) => void;
  handleGeneration: () => void;
}

const RegenerateDialog: React.FC<RegenerateDialog> = ({
  suggestions,
  setSuggestions,
  duration,
  setDuration,
  handleGeneration,
}) => {
  return (
    <Dialog>
      <DialogTrigger
        className={buttonVariants({ variant: "ghost", size: "icon" })}
      >
        <RotateCcw className="size-4 text-neutral-600" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-3">
            <Label htmlFor="suggestion" className="text-right">
              Suggestions
            </Label>
            <Textarea
              id="suggestion"
              value={suggestions}
              placeholder="Enter on which part you want to improvement"
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                setSuggestions(e.target.value)
              }
              className="col-span-3 h-32 resize-none"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="suggestion" className="text-right">
              Duration
            </Label>
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
        <DialogFooter>
          <Button onClick={handleGeneration}>Regenerate</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RegenerateDialog;
