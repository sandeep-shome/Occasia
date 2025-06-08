import React from "react";
import { Button } from "./ui/button";
import { Download } from "lucide-react";
import { jsPDF } from "jspdf";

const DownloadButton = ({
  message,
  name,
}: {
  message: string;
  name: string;
}) => {
  const handleDownloadSpeech = () => {
    const doc = new jsPDF();

    const margin = 15;
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const maxLineWidth = pageWidth - margin * 2;
    const lineHeight = 8;
    let y = margin;

    doc.setFontSize(12);

    // Split the text into lines that fit the width
    const lines = doc.splitTextToSize(message, maxLineWidth);

    for (let i = 0; i < lines.length; i++) {
      if (y + lineHeight > pageHeight - margin) {
        doc.addPage();
        y = margin;
      }
      doc.text(lines[i], margin, y);
      y += lineHeight;
    }

    doc.save(`${name}.pdf`);
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
