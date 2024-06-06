import React from "react";
import { Button } from "./button";
import { copyToClipboard } from "@/lib/utils";

interface copyButtonProps {
  textToCopy: string;
}

export default function CopyButton({ textToCopy }: copyButtonProps) {
  const [isCopied, setIsCopied] = React.useState(false);

  const handleCopyClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    copyToClipboard(textToCopy)
      .then(() => {
        setIsCopied(true);
        setTimeout(() => {
          setIsCopied(false);
        }, 1000);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Button
      className="flex px-2 border-none font-light hover:underline"
      variant={"outline"}
      onClick={handleCopyClick}
    >
      {isCopied ? "Copied" : textToCopy}
    </Button>
  );
}
