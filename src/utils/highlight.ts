/**
 * 轻量级语法高亮 tokenizer（零依赖）
 * 覆盖 C-like（TS/JS/Swift/Kotlin）、Shell、JSON、YAML
 */

export interface Token {
  text: string;
  cls?: string;
}

const KEYWORDS = [
  'import', 'export', 'from', 'const', 'let', 'var', 'function', 'return',
  'if', 'else', 'for', 'while', 'do', 'switch', 'case', 'break', 'continue',
  'new', 'class', 'extends', 'implements', 'interface', 'type', 'enum',
  'struct', 'async', 'await', 'try', 'catch', 'finally', 'throw', 'default',
  'public', 'private', 'protected', 'internal', 'override', 'static',
  'fun', 'val', 'void', 'in', 'of', 'as', 'is', 'this', 'super', 'self',
  'null', 'nil', 'undefined', 'true', 'false', 'package', 'def', 'require',
].join('|');

function build(parts: RegExp[], flags: string): RegExp {
  return new RegExp(parts.map((p) => `(${p.source})`).join('|'), flags);
}

/* C-like: 注释 / 字符串 / 关键字 / 数字 / 类型 / 函数调用 */
const CLIKE = build(
  [
    /\/\/[^\n]*|\/\*[\s\S]*?\*\//,
    /`(?:[^`\\]|\\[\s\S])*`|"(?:[^"\\\n]|\\[\s\S])*"|'(?:[^'\\\n]|\\[\s\S])*'/,
    new RegExp(`\\b(?:${KEYWORDS})\\b`),
    /\b\d+(?:\.\d+)?\b/,
    /\b[A-Z][A-Za-z0-9_]*\b/,
    /[a-zA-Z_$][\w$]*(?=\s*\()/,
  ],
  'gm'
);
const CLIKE_CLS = ['tok-com', 'tok-str', 'tok-kw', 'tok-num', 'tok-type', 'tok-fn'];

/* Shell: 注释 / 字符串 / 行首提示符 / 旗标 / 常见命令 */
const SHELL = build(
  [
    /#[^\n]*/,
    /"(?:[^"\\\n]|\\[\s\S])*"|'(?:[^'\\\n]|\\[\s\S])*'/,
    /^\$/,
    /--?[a-zA-Z][\w-]*/,
    /\b(?:npx|npm|yarn|pnpm|cd|eas|expo|git|brew|choco|adb|gradle|xcode-select|vercel|netlify|pod|ruby|gem)\b/,
  ],
  'gm'
);
const SHELL_CLS = ['tok-com', 'tok-str', 'tok-prompt', 'tok-flag', 'tok-kw'];

/* JSON: 键 / 字符串 / 数字 / 布尔与 null */
const JSON_RE = build(
  [
    /"(?:[^"\\]|\\.)*"(?=\s*:)/,
    /"(?:[^"\\]|\\.)*"/,
    /-?\b\d+(?:\.\d+)?\b/,
    /\b(?:true|false|null)\b/,
  ],
  'gm'
);
const JSON_CLS = ['tok-key', 'tok-str', 'tok-num', 'tok-kw'];

/* YAML: 注释 / 字符串 / 键 / 布尔与 null / 数字 */
const YAML_RE = build(
  [
    /#[^\n]*/,
    /"[^"\n]*"|'[^'\n]*'/,
    /^[ \t-]*[\w.-]+(?=\s*:)/,
    /\b(?:true|false|null)\b/,
    /-?\b\d+(?:\.\d+)?\b/,
  ],
  'gm'
);
const YAML_CLS = ['tok-com', 'tok-str', 'tok-key', 'tok-kw', 'tok-num'];

function pick(lang: string): { re: RegExp; cls: string[] } | null {
  const l = lang.toLowerCase();
  if (['bash', 'shell', 'sh', 'powershell', 'cmd', 'zsh'].includes(l))
    return { re: SHELL, cls: SHELL_CLS };
  if (l === 'json' || l === 'jsonc') return { re: JSON_RE, cls: JSON_CLS };
  if (l === 'yaml' || l === 'yml') return { re: YAML_RE, cls: YAML_CLS };
  if (
    ['tsx', 'ts', 'jsx', 'js', 'javascript', 'typescript', 'swift', 'kotlin', 'java', 'css'].includes(l)
  )
    return { re: CLIKE, cls: CLIKE_CLS };
  if (l === 'md' || l === 'markdown' || l === 'text' || l === '') return null;
  return { re: CLIKE, cls: CLIKE_CLS };
}

export function tokenize(code: string, lang: string): Token[] {
  const picked = pick(lang);
  if (!picked) return [{ text: code }];

  const { re, cls } = picked;
  const tokens: Token[] = [];
  let last = 0;
  re.lastIndex = 0;
  let m: RegExpExecArray | null;

  while ((m = re.exec(code)) !== null) {
    if (m.index > last) tokens.push({ text: code.slice(last, m.index) });
    let clsName: string | undefined;
    for (let g = 1; g < m.length; g++) {
      if (m[g] !== undefined) {
        clsName = cls[g - 1];
        break;
      }
    }
    tokens.push({ text: m[0], cls: clsName });
    last = m.index + m[0].length;
    if (m[0].length === 0) re.lastIndex++;
  }
  if (last < code.length) tokens.push({ text: code.slice(last) });
  return tokens;
}
