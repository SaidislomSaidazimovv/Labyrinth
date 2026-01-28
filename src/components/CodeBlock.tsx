import { useState } from "react";
import { motion } from "framer-motion";
import { Copy, Check, FileCode } from "lucide-react";

interface CodeBlockProps {
  title: string;
  language: string;
  code: string;
  description?: string;
}

const CodeBlock = ({ title, language, code, description }: CodeBlockProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="card-atmospheric rounded-lg overflow-hidden mb-8"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-border">
        <div className="flex items-center gap-3">
          <FileCode className="w-5 h-5 text-primary" />
          <div>
            <h3 className="font-display text-lg font-semibold text-foreground">
              {title}
            </h3>
            <span className="font-mono text-xs text-muted-foreground uppercase">
              {language}
            </span>
          </div>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-2 px-3 py-1.5 bg-muted hover:bg-muted/80 rounded-md transition-colors"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 text-safe" />
              <span className="font-mono text-xs text-safe">Copied</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4 text-muted-foreground" />
              <span className="font-mono text-xs text-muted-foreground">Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Description */}
      {description && (
        <div className="px-6 py-3 bg-muted/30 border-b border-border">
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      )}

      {/* Code */}
      <div className="overflow-x-auto">
        <pre className="p-6 text-sm leading-relaxed">
          <code className="text-foreground font-mono whitespace-pre">
            {code}
          </code>
        </pre>
      </div>
    </motion.div>
  );
};

export default CodeBlock;
