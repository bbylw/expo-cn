import CodeBlock from './CodeBlock';
import { Link } from 'react-router-dom';

interface MarkdownRendererProps {
  content: string;
}

function parseInlineMarkdown(text: string): React.ReactNode[] {
  const nodes: React.ReactNode[] = [];
  // Pattern: **bold**, `code`, [link](url)
  const regex = /(\*\*(.+?)\*\*)|(`([^`]+?)`)|(\[([^\]]+)\]\(([^)]+)\))/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index));
    }
    if (match[2]) {
      nodes.push(<strong key={key++}>{match[2]}</strong>);
    } else if (match[4]) {
      nodes.push(<code key={key++} className="inline-code">{match[4]}</code>);
    } else if (match[6] && match[7]) {
      const url = match[7];
      if (url.startsWith('/docs/')) {
        nodes.push(<Link key={key++} to={url}>{match[6]}</Link>);
      } else {
        nodes.push(
          <a key={key++} href={url} target="_blank" rel="noreferrer">
            {match[6]}
          </a>
        );
      }
    }
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }
  return nodes;
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  const lines = content.split('\n');
  const elements: React.ReactNode[] = [];
  let i = 0;
  let key = 0;
  let h2Index = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Code blocks
    if (line.trim().startsWith('```')) {
      const lang = line.trim().slice(3).trim() || 'tsx';
      const codeLines: string[] = [];
      i++;
      while (i < lines.length && !lines[i].trim().startsWith('```')) {
        codeLines.push(lines[i]);
        i++;
      }
      i++; // skip closing ```
      elements.push(
        <CodeBlock key={key++} code={codeLines.join('\n')} language={lang} />
      );
      continue;
    }

    // Headings
    const h1Match = line.match(/^# (.+)/);
    if (h1Match) {
      elements.push(<h1 key={key++} className="doc-h1">{h1Match[1]}</h1>);
      i++;
      continue;
    }

    const h2Match = line.match(/^## (.+)/);
    if (h2Match) {
      elements.push(
        <h2 key={key++} id={`doc-h2-${h2Index++}`} className="doc-h2">
          {h2Match[1]}
        </h2>
      );
      i++;
      continue;
    }

    const h3Match = line.match(/^### (.+)/);
    if (h3Match) {
      elements.push(<h3 key={key++} className="doc-h3">{h3Match[1]}</h3>);
      i++;
      continue;
    }

    // Blockquote
    if (line.startsWith('> ')) {
      const quoteLines: string[] = [];
      while (i < lines.length && lines[i].startsWith('> ')) {
        quoteLines.push(lines[i].slice(2));
        i++;
      }
      elements.push(
        <blockquote key={key++} className="doc-blockquote">
          {quoteLines.map((ql, qi) => (
            <p key={qi}>{parseInlineMarkdown(ql)}</p>
          ))}
        </blockquote>
      );
      continue;
    }

    // Tables
    if (line.includes('|') && lines[i + 1]?.match(/^\|[\s-|]+\|$/)) {
      const tableRows: string[][] = [];
      // header
      const headerCells = line.split('|').filter(Boolean).map((c) => c.trim());
      tableRows.push(headerCells);
      i += 2; // skip header and separator
      while (i < lines.length && lines[i].includes('|') && lines[i].trim().startsWith('|')) {
        const cells = lines[i].split('|').filter(Boolean).map((c) => c.trim());
        tableRows.push(cells);
        i++;
      }
      elements.push(
        <div key={key++} className="doc-table-wrapper">
          <table className="doc-table">
            <thead>
              <tr>
                {tableRows[0].map((cell, ci) => (
                  <th key={ci}>{parseInlineMarkdown(cell)}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tableRows.slice(1).map((row, ri) => (
                <tr key={ri}>
                  {row.map((cell, ci) => (
                    <td key={ci}>{parseInlineMarkdown(cell)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      continue;
    }

    // Unordered list
    if (line.match(/^- /)) {
      const items: string[] = [];
      while (i < lines.length && lines[i].match(/^- /)) {
        items.push(lines[i].slice(2));
        i++;
      }
      elements.push(
        <ul key={key++} className="doc-ul">
          {items.map((item, li) => (
            <li key={li}>{parseInlineMarkdown(item)}</li>
          ))}
        </ul>
      );
      continue;
    }

    // Empty line
    if (line.trim() === '') {
      i++;
      continue;
    }

    // Paragraph
    elements.push(
      <p key={key++} className="doc-paragraph">
        {parseInlineMarkdown(line)}
      </p>
    );
    i++;
  }

  return <div className="markdown-content">{elements}</div>;
}
