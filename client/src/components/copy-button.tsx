"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";
import { Clipboard, ClipboardCheck } from "lucide-react";

const CopyButton = ({ data }: { data: string }) => {
  const [copied, setCopied] = useState<boolean>(false);
  const handleCopy = () => {
    setCopied(true);
    window.navigator.clipboard.writeText(data);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Button variant={"outline"} size={"icon"} onClick={handleCopy}>
      {copied ? (
        <ClipboardCheck className="size-4 text-neutral-600" />
      ) : (
        <Clipboard className="size-4 text-neutral-600" />
      )}
    </Button>
  );
};

export default CopyButton;
