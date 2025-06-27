import Button from "../Button/Button";
import { useState, useEffect } from "react";
import "./CopyToClipboard.css";

export default function CopyToClipboard({ text }) {
  const [copied, setCopied] = useState(false);

  const handleCopyClick = async () => {
    try {
      //Function execution pauses at the await until the text is copied to the clipboard
      await navigator.clipboard.writeText(text);
      //Successful copy? Update state to true
      setCopied(true);
    } catch (error) {
      console.error("Failed to copy", error);
    }
  };

  useEffect(() => {
    //If nothing is copied, do nothing (escape useEffect)
    if (!copied) return;
    //Copied true? Set timer and reset it back to false in 3 seconds
    const timer = setTimeout(() => setCopied(false), 3000);
    //Clean up function: Cancel the timeout if "copied" changes or the component unmounts
    return () => clearTimeout(timer);
  }, [copied]);

  return (
    <>
      {copied ? (
        <div className="copy-confirmation">Copied to clipboard!</div>
      ) : (
        <Button
          variant="copy"
          onClick={handleCopyClick}
          ariaLabel={`Copy ${text} to clipboard`}
        >
          Copy
        </Button>
      )}
    </>
  );
}
