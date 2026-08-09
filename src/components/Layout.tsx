import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

export default function Layout() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [pathname]);

  return (
    <div className="layout">
      <a href="#main-content" className="skip-link">
        跳到主要内容
      </a>
      <Header />
      <main id="main-content" className="layout__main" tabIndex={-1}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
