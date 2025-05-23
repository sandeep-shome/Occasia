import React from "react";
import { Button } from "./ui/button";
import { Download } from "lucide-react";
import { jsPDF } from "jspdf";

const DownloadButton = ({ message }: { message: string }) => {
  const handleDownloadSpeech = () => {
    const doc = new jsPDF();
    doc.text(message, 10, 10);
    doc.save();
  };
  return (
    <>
      <Button variant={"ghost"} size={"icon"} onClick={handleDownloadSpeech}>
        <Download className="size-4 text-neutral-600" />
      </Button>
    </>
  );
};

export default DownloadButton;
