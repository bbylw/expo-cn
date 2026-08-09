import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { SDK_VERSION } from '../data/docs';

function GithubIcon({ size = 17 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

function ExpoMark({ size = 26 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden>
      <circle cx="16" cy="16" r="15" fill="var(--accent)" />
      <circle cx="16" cy="16" r="5.6" fill="var(--bg-0)" />
      <circle cx="16" cy="7.6" r="2.4" fill="var(--bg-0)" />
    </svg>
  );
}

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>(
    () => (document.documentElement.getAttribute('data-theme') as 'dark' | 'light') || 'dark'
  );
  const location = useLocation();
  const isDocs = location.pathname.startsWith('/docs');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem('expo-docs-theme', theme);
    } catch {
      /* ignore */
    }
  }, [theme]);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <header className={`header ${scrolled ? 'header--scrolled' : ''}`}>
      <div className="header__inner">
        <Link to="/" className="header__logo" aria-label="Expo 中文文档首页">
          <ExpoMark />
          <span className="header__wordmark">expo</span>
          <span className="header__tag">中文文档</span>
        </Link>

        <nav className={`header__nav ${mobileOpen ? 'header__nav--open' : ''}`}>
          <span className="header__version mono">{SDK_VERSION}</span>
          <Link
            to="/docs/introduction"
            className={`header__link ${isDocs ? 'header__link--active' : ''}`}
          >
            文档
          </Link>
          <a href="https://expo.dev/examples" target="_blank" rel="noreferrer" className="header__link">
            示例
          </a>
          <a href="https://expo.dev/blog" target="_blank" rel="noreferrer" className="header__link">
            博客
          </a>
          <a href="https://chat.expo.dev" target="_blank" rel="noreferrer" className="header__link">
            社区
          </a>
          <span style={{ width: 8 }} />
          <button
            className="header__icon-btn"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            aria-label={theme === 'dark' ? '切换到亮色主题' : '切换到暗色主题'}
            title={theme === 'dark' ? '切换到亮色主题' : '切换到暗色主题'}
          >
            {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
          </button>
          <a
            href="https://github.com/expo/expo"
            target="_blank"
            rel="noreferrer"
            className="header__icon-btn"
            aria-label="GitHub 仓库"
          >
            <GithubIcon />
          </a>
        </nav>

        <button
          className="header__burger"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? '关闭菜单' : '打开菜单'}
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
    </header>
  );
}
