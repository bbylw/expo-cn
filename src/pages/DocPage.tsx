import { useParams, Link } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import { getDocBySlug, getAllDocItems, docSections } from '../data/docs';
import Sidebar from '../components/Sidebar';
import MarkdownRenderer from '../components/MarkdownRenderer';
import NotFound from './NotFound';
import { ChevronLeft, ChevronRight, Menu, X } from 'lucide-react';

interface TocItem {
  id: string;
  text: string;
}

export default function DocPage() {
  const { slug } = useParams<{ slug: string }>();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [activeHeading, setActiveHeading] = useState('');
  const doc = slug ? getDocBySlug(slug) : undefined;

  // 从文档内容中提取二级标题，生成目录
  const toc: TocItem[] = useMemo(() => {
    if (!doc) return [];
    return doc.content
      .split('\n')
      .filter((l) => l.startsWith('## '))
      .map((l, i) => ({ id: `doc-h2-${i}`, text: l.slice(3).trim() }));
  }, [doc]);

  // 阅读进度条
  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const max = el.scrollHeight - el.clientHeight;
      setProgress(max > 0 ? Math.min(el.scrollTop / max, 1) : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [slug]);

  // 目录高亮跟随滚动
  useEffect(() => {
    if (toc.length === 0) return;
    const els = toc
      .map((t) => document.getElementById(t.id))
      .filter(Boolean) as HTMLElement[];

    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) setActiveHeading(visible[0].target.id);
      },
      { rootMargin: '-15% 0px -70% 0px', threshold: 0 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [toc, slug]);

  if (!doc) {
    return <NotFound />;
  }

  const allItems = getAllDocItems();
  const currentIndex = allItems.findIndex((item) => item.slug === slug);
  const prevDoc = currentIndex > 0 ? allItems[currentIndex - 1] : null;
  const nextDoc = currentIndex < allItems.length - 1 ? allItems[currentIndex + 1] : null;

  const currentSection = docSections.find((s) =>
    s.items.some((item) => item.slug === slug)
  );

  const jumpTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setActiveHeading(id);
  };

  return (
    <>
      <div className="doc-progress" style={{ width: `${progress * 100}%` }} />

      <div className="doc-layout">
        <button
          className="doc-layout__toggle"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-label={sidebarOpen ? '关闭目录' : '打开目录'}
        >
          {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        {sidebarOpen && (
          <div className="doc-layout__overlay" onClick={() => setSidebarOpen(false)} />
        )}

        <div className={`doc-layout__sidebar ${sidebarOpen ? 'doc-layout__sidebar--open' : ''}`}>
          <Sidebar onNavigate={() => setSidebarOpen(false)} />
        </div>

        <article className="doc-layout__content doc-enter" key={slug}>
          <nav className="doc-breadcrumb" aria-label="面包屑">
            <Link to="/">首页</Link>
            <span className="doc-breadcrumb__sep">/</span>
            <span>{currentSection?.title}</span>
            <span className="doc-breadcrumb__sep">/</span>
            <span className="doc-breadcrumb__current">{doc.title}</span>
          </nav>

          <MarkdownRenderer content={doc.content} />

          <div className="doc-nav">
            {prevDoc ? (
              <Link to={`/docs/${prevDoc.slug}`} className="doc-nav__link doc-nav__link--prev">
                <ChevronLeft size={18} className="doc-nav__icon" />
                <div>
                  <span className="doc-nav__label">上一篇</span>
                  <span className="doc-nav__title">{prevDoc.title}</span>
                </div>
              </Link>
            ) : (
              <span />
            )}
            {nextDoc && (
              <Link to={`/docs/${nextDoc.slug}`} className="doc-nav__link doc-nav__link--next">
                <div>
                  <span className="doc-nav__label">下一篇</span>
                  <span className="doc-nav__title">{nextDoc.title}</span>
                </div>
                <ChevronRight size={18} className="doc-nav__icon" />
              </Link>
            )}
          </div>
        </article>

        {toc.length > 0 && (
          <aside className="doc-layout__toc" aria-label="本页目录">
            <div className="toc__label">本页内容</div>
            <ul className="toc__list">
              {toc.map((t) => (
                <li key={t.id}>
                  <button
                    className={`toc__link ${activeHeading === t.id ? 'toc__link--active' : ''}`}
                    onClick={() => jumpTo(t.id)}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', width: '100%', textAlign: 'left' }}
                  >
                    {t.text}
                  </button>
                </li>
              ))}
            </ul>
          </aside>
        )}
      </div>
    </>
  );
}
