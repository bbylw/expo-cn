import { useMemo, useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { tokenize } from '../utils/highlight';

interface CodeBlockProps {
  code: string;
  language?: string;
}

export default function CodeBlock({ code, language = 'tsx' }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const trimmed = useMemo(() => code.trim(), [code]);
  const tokens = useMemo(() => tokenize(trimmed, language), [trimmed, language]);

  const handleCopy = () => {
    navigator.clipboard.writeText(trimmed);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="code-block">
      <div className="code-block__header">
        <div className="code-block__meta">
          <span className="code-block__dots" aria-hidden>
            <i /><i /><i />
          </span>
          <span className="code-block__lang">{language}</span>
        </div>
        <button
          className={`code-block__copy ${copied ? 'code-block__copy--done' : ''}`}
          onClick={handleCopy}
        >
          {copied ? <Check size={13} /> : <Copy size={13} />}
          {copied ? '已复制' : '复制'}
        </button>
      </div>
      <pre className="code-block__pre">
        <code className="code-block__code">
          {tokens.map((t, i) =>
            t.cls ? (
              <span key={i} className={t.cls}>{t.text}</span>
            ) : (
              <span key={i}>{t.text}</span>
            )
          )}
        </code>
      </pre>
    </div>
  );
}
