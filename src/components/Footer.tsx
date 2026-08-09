import { SDK_VERSION } from '../data/docs';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__brand">
          <div className="footer__wordmark">
            expo <em>docs</em>
            <br />
            中文文档
          </div>
          <p className="footer__blurb">
            开源的 React Native 框架。一套 JavaScript 代码，构建运行在所有平台上的原生应用。
          </p>
        </div>

        <div className="footer__links">
          <div className="footer__col">
            <h4>资源</h4>
            <a href="https://docs.expo.dev" target="_blank" rel="noreferrer">官方英文文档</a>
            <a href="https://expo.dev/examples" target="_blank" rel="noreferrer">示例项目</a>
            <a href="https://snack.expo.dev" target="_blank" rel="noreferrer">Snack 在线编辑器</a>
            <a href="https://expo.dev/blog" target="_blank" rel="noreferrer">官方博客</a>
          </div>
          <div className="footer__col">
            <h4>社区</h4>
            <a href="https://chat.expo.dev" target="_blank" rel="noreferrer">Discord &amp; 论坛</a>
            <a href="https://github.com/expo/expo" target="_blank" rel="noreferrer">GitHub</a>
            <a href="https://x.com/expo" target="_blank" rel="noreferrer">X (Twitter)</a>
            <a href="https://www.reddit.com/r/expo/" target="_blank" rel="noreferrer">Reddit</a>
          </div>
          <div className="footer__col">
            <h4>服务</h4>
            <a href="https://expo.dev/eas" target="_blank" rel="noreferrer">EAS 云服务</a>
            <a href="https://expo.dev/client" target="_blank" rel="noreferrer">Expo Go</a>
            <a href="https://expo.canny.io/feature-requests" target="_blank" rel="noreferrer">功能建议</a>
            <a href="https://expo.dev/guidelines" target="_blank" rel="noreferrer">社区准则</a>
          </div>
        </div>
      </div>

      <div className="footer__bottom">
        <div className="footer__bottom-inner">
          <span className="footer__meta">
            MIT LICENSE · 非官方中文翻译 · {SDK_VERSION}
          </span>
          <span className="footer__meta">
            BUILT WITH REACT + VITE
          </span>
        </div>
      </div>
    </footer>
  );
}
