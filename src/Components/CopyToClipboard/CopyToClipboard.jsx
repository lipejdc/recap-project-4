import Button from "../Button/Button";
import { useState, useEffect } from "react";
import "./CopyToClipboard.css";

export default function CopyToClipboard({ text }) {
  const [copied, setCopied] = useState(false);

  const handleCopyClick = async () => {
    try {
      //Function execution pauses at the await while the rest of component renders
      await navigator.clipboard.writeText(text);
      //The rest only runs once the promise resolves
      setCopied(true);
    } catch (err) {
      console.error("Failed to copy", err);
    }
  };

  useEffect(() => {
    //If nothing is copied, do nothing (escape useEffect)
    if (!copied) return;
    //Set "copied" state to true and reset to "false" after 3 seconds
    const timer = setTimeout(() => setCopied(false), 3000);
    //Clean up function => Cancel the timeout if "copied" changes or the component unmounts
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
