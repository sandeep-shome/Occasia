"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";
import { Clipboard, ClipboardCheck } from "lucide-react";
import { toast } from "sonner";

const CopyButton = ({ data }: { data: string }) => {
  const [copied, setCopied] = useState<boolean>(false);
  const handleCopy = () => {
    setCopied(true);
    toast.info("Copied");
    window.navigator.clipboard.writeText(data);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Button variant={"ghost"} size={"icon"} onClick={handleCopy}>
      {copied ? (
        <ClipboardCheck className="size-4 text-neutral-600" />
      ) : (
        <Clipboard className="size-4 text-neutral-600" />
      )}
    </Button>
  );
};

export default CopyButton;
