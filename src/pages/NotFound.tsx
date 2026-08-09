import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function NotFound() {
  return (
    <section className="nf">
      <div className="nf__term">
        <b>error</b>: No routes matched — 该路由未在 expo-router 中注册
      </div>
      <div className="nf__num" aria-hidden>
        404
      </div>
      <h1 className="nf__title">这个页面似乎不存在</h1>
      <p className="nf__desc">
        可能是链接已过期，或路径拼写有误。回到首页，或直接进入文档继续探索。
      </p>
      <div className="nf__actions">
        <Link to="/" className="btn btn--primary">
          返回首页
        </Link>
        <Link to="/docs/introduction" className="btn btn--ghost">
          阅读文档
          <ArrowRight size={16} />
        </Link>
      </div>
    </section>
  );
}
