import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Copy, Check, FileCode, ChevronDown, ChevronRight } from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

interface CodeBlockProps {
  title: string;
  language: string;
  code: string;
  description?: string;
}

const CodeBlock = ({ title, language, code, description }: CodeBlockProps) => {
  const [copied, setCopied] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const lineCount = code.split("\n").length;

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();
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
      {/* Header Bar — always visible */}
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        className="w-full flex items-center justify-between px-6 py-4 border-b border-border cursor-pointer select-none hover:bg-muted/30 transition-colors"
      >
        <div className="flex items-center gap-3 min-w-0">
          <FileCode className="w-5 h-5 text-primary flex-shrink-0" />
          <div className="text-left min-w-0">
            <h3 className="font-display text-sm sm:text-lg font-semibold text-foreground truncate max-w-[120px] sm:max-w-none">
              {title}
            </h3>
            <div className="flex items-center gap-3 mt-0.5">
              <span className="inline-block px-2 py-0.5 bg-primary/20 text-primary rounded text-xs font-mono font-semibold uppercase">
                C#
              </span>
              <span className="hidden sm:inline font-mono text-xs text-muted-foreground">
                {lineCount} lines
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Copy button */}
          <span
            role="button"
            tabIndex={0}
            onClick={handleCopy}
            onKeyDown={(e) => { if (e.key === "Enter") handleCopy(e as unknown as React.MouseEvent); }}
            className="flex items-center gap-2 px-3 py-1.5 bg-muted hover:bg-muted/80 rounded-md transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-safe" />
                <span className="font-mono text-xs text-safe">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-muted-foreground" />
                <span className="font-mono text-xs text-muted-foreground">Copy</span>
              </>
            )}
          </span>

          {/* Expand / Collapse chevron */}
          {expanded ? (
            <ChevronDown className="w-5 h-5 text-muted-foreground" />
          ) : (
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          )}
        </div>
      </button>

      {/* Description — visible when expanded */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            key="code-body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            {description && (
              <div className="px-6 py-3 bg-muted/30 border-b border-border">
                <p className="text-sm text-muted-foreground">{description}</p>
              </div>
            )}

            {/* Syntax-highlighted code */}
            <div className="overflow-y-auto" style={{ maxHeight: "clamp(250px, 50vh, 600px)" }}>
              <SyntaxHighlighter
                language="csharp"
                style={vscDarkPlus}
                showLineNumbers
                wrapLongLines
                customStyle={{
                  margin: 0,
                  borderRadius: 0,
                  background: "rgba(10, 10, 10, 0.6)",
                  fontSize: "0.85rem",
                }}
                lineNumberStyle={{
                  minWidth: "3em",
                  paddingRight: "1em",
                  color: "rgba(255,255,255,0.25)",
                  userSelect: "none",
                }}
              >
                {code}
              </SyntaxHighlighter>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default CodeBlock;
