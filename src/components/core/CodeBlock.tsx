import { Check, Copy } from "lucide-react";
import { useCallback, useState } from "react";

import cn from "@/lib/utils";

type CodeBlockProps = {
  code: string;
  filename?: string;
  language?: string;
  className?: string;
};

/**
 * Styled code block with terminal chrome and copy button.
 */
const CodeBlock = ({ code, filename, language, className }: CodeBlockProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [code]);

  return (
    <div
      className={cn(
        "w-full overflow-hidden rounded-lg border shadow-lg",
        className,
      )}
    >
      <div className="flex items-center justify-between border-b bg-card px-4 py-3">
        <div className="flex space-x-2">
          <div className="h-3 w-3 rounded-full bg-destructive/70" />
          <div className="h-3 w-3 rounded-full bg-yellow-500/70" />
          <div className="h-3 w-3 rounded-full bg-green-500/70" />
        </div>

        {filename && (
          <span className="text-muted-foreground text-sm">{filename}</span>
        )}

        <button
          type="button"
          onClick={handleCopy}
          className="rounded-md p-1 text-muted-foreground transition-colors hover:text-foreground"
          aria-label={copied ? "Copied" : "Copy code"}
        >
          {copied ? (
            <Check className="h-4 w-4 text-green-500" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
        </button>
      </div>

      <pre className="overflow-x-auto bg-muted/50 p-4 text-left text-sm">
        <code className="text-foreground" data-language={language}>
          {code}
        </code>
      </pre>
    </div>
  );
};

export default CodeBlock;
