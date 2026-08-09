import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { SDK_VERSION } from '../data/docs';
import Reveal from '../components/Reveal';
import { ArrowRight, Check, Copy, Globe, TerminalSquare } from 'lucide-react';

/* ---------- 数据 ---------- */

const marqueeModules = [
  'expo-router', 'expo-camera', 'expo-notifications', 'expo-image',
  'expo-location', 'expo-haptics', 'expo-av', 'expo-sqlite',
  'expo-file-system', 'expo-secure-store', 'expo-blur', 'expo-linking',
  'expo-auth-session', 'expo-video', 'expo-audio', 'expo-symbols',
  'expo-glass-effect', '@expo/ui',
];

const stats = [
  { target: 2700, suffix: '万+', label: 'NPM 周下载量' },
  { target: 60, suffix: '+', label: '原生 SDK 模块' },
  { target: 3, suffix: '×', label: '目标平台 · iOS / Android / Web' },
  { target: 3, suffix: '次/年', label: '大版本发布节奏' },
];

/* ---------- 小组件 ---------- */

/** 数字滚动计数（尊重系统减弱动效设置） */
function useCountUp(target: number, started: boolean, duration = 1400) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!started) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVal(target);
      return;
    }
    let raf = 0;
    const t0 = performance.now();
    const tick = (t: number) => {
      const p = Math.min((t - t0) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [started, target, duration]);
  return val;
}

function StatNum({ target, suffix, started }: { target: number; suffix: string; started: boolean }) {
  const val = useCountUp(target, started);
  return (
    <div className="hero__stat-num">
      {val.toLocaleString('en-US')}
      <span>{suffix}</span>
    </div>
  );
}

function Terminal() {
  const lines: React.ReactNode[] = [
    <><span className="t-prompt">$</span> npx create-expo-app@latest my-app</>,
    <><span className="t-ok">✔</span> 项目创建成功</>,
    <><span className="t-prompt">$</span> cd my-app &amp;&amp; npx expo start</>,
    <>{'\u00A0'}</>,
    <><span className="t-dim">›</span> Metro 已就绪 http://localhost:8081</>,
    <><span className="t-key">›</span> 按 <span className="t-ok">a</span> <span className="t-dim">│</span> 打开 Android</>,
    <><span className="t-key">›</span> 按 <span className="t-ok">i</span> <span className="t-dim">│</span> 打开 iOS 模拟器</>,
    <><span className="t-key">›</span> 按 <span className="t-ok">w</span> <span className="t-dim">│</span> 打开 Web</>,
    <><span className="t-prompt">$</span> <span className="terminal__cursor" /></>,
  ];

  return (
    <div className="terminal" aria-hidden>
      <div className="terminal__bar">
        <span className="terminal__dot terminal__dot--r" />
        <span className="terminal__dot terminal__dot--y" />
        <span className="terminal__dot terminal__dot--g" />
        <span className="terminal__title">expo — zsh</span>
      </div>
      <div className="terminal__body">
        {lines.map((line, i) => (
          <div className="t-line" key={i} style={{ animationDelay: `${400 + i * 130}ms` }}>
            {line}
          </div>
        ))}
      </div>
    </div>
  );
}

function InstallCmd() {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText('npx create-expo-app@latest');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button className="hero__cmd" onClick={copy} title="点击复制">
      <span className="hero__cmd-prompt">$</span>
      npx create-expo-app@latest
      <span className="hero__cmd-copy">
        {copied ? <Check size={14} /> : <Copy size={14} />}
      </span>
    </button>
  );
}

/* ---------- 页面 ---------- */

export default function Home() {
  const statsRef = useRef<HTMLDivElement>(null);
  const [statsVisible, setStatsVisible] = useState(false);

  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div className="home">
      {/* ============ Hero ============ */}
      <section className="hero">
        <div className="hero__bg-grid" />
        <div className="hero__bg-glow" />

        <div className="hero__inner">
          <div className="hero__copy">
            <Reveal>
              <span className="hero__eyebrow">
                <span className="hero__eyebrow-dot" />
                {SDK_VERSION} · 开源 · MIT 许可
              </span>
            </Reveal>
            <Reveal delay={80}>
              <h1 className="hero__title">
                一套代码，
                <br />
                在<em>任何屏幕</em>上
                <br />
                原生运行。
              </h1>
            </Reveal>
            <Reveal delay={160}>
              <p className="hero__sub">
                Expo 是开源的 React Native 框架。只写 JavaScript 与 React，
                即可构建真正运行在 Android、iOS 与 Web 上的通用原生应用——
                从第一行代码到应用商店发布，全程无需触碰原生工程。
              </p>
            </Reveal>
            <Reveal delay={240}>
              <div className="hero__actions">
                <Link to="/docs/introduction" className="btn btn--primary btn--lg">
                  开始构建 <ArrowRight size={17} />
                </Link>
                <a
                  href="https://snack.expo.dev"
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn--ghost btn--lg"
                >
                  <Globe size={16} /> 浏览器里试玩
                </a>
              </div>
            </Reveal>
            <Reveal delay={320}>
              <InstallCmd />
            </Reveal>
          </div>

          <Reveal delay={200} className="hero__terminal">
            <div className="hero__terminal-glow" />
            <Terminal />
          </Reveal>
        </div>

        {/* Stats */}
        <Reveal>
          <div className="hero__stats" ref={statsRef}>
            {stats.map((s) => (
              <div className="hero__stat" key={s.label}>
                <StatNum target={s.target} suffix={s.suffix} started={statsVisible} />
                <div className="hero__stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ============ Marquee ============ */}
      <Reveal>
        <section className="marquee-section" aria-label="Expo SDK 模块">
          <div className="marquee__track">
            {[...marqueeModules, ...marqueeModules].map((m, i) => (
              <span className="marquee__chip" key={`${m}-${i}`}>
                {m}
              </span>
            ))}
          </div>
        </section>
      </Reveal>

      {/* ============ Bento ============ */}
      <section className="bento-section section-shell">
        <Reveal>
          <div className="section-head">
            <h2 className="section-head__title">
              为严肃产品
              <br />
              准备的完整平台
            </h2>
            <p className="section-head__note">
              // 不只是脚手架——
              <br />
              路由、构建、更新、类型安全，一应俱全
            </p>
          </div>
        </Reveal>

        <div className="bento">
          <Reveal className="bento-card--a">
            <div className="bento-card bento-card--a" style={{ height: '100%' }}>
              <span className="bento-card__idx">01 / ROUTER</span>
              <h3 className="bento-card__title">文件系统即路由</h3>
              <p className="bento-card__desc">
                Expo Router 将目录结构直接映射为导航结构。每个文件天然支持深度链接、
                类型安全检查与 Web 端静态渲染，无需任何手动配置。
              </p>
              <div className="filetree">
<span className="ft-dir">app/</span>{'\n'}
├─ _layout.tsx<span className="ft-arrow">→</span><span className="ft-route">Stack</span>{'\n'}
├─ <span className="ft-dir">(tabs)/</span>{'\n'}
│  ├─ index.tsx<span className="ft-arrow">→</span><span className="ft-route">/</span>{'\n'}
│  └─ explore.tsx<span className="ft-arrow">→</span><span className="ft-route">/explore</span>{'\n'}
└─ user/[id].tsx<span className="ft-arrow">→</span><span className="ft-route">/user/:id</span>
              </div>
            </div>
          </Reveal>

          <Reveal delay={80} className="bento-card--b">
            <div className="bento-card bento-card--b" style={{ height: '100%' }}>
              <span className="bento-card__idx">02 / EAS BUILD</span>
              <h3 className="bento-card__title">云端构建双端应用</h3>
              <p className="bento-card__desc">
                无需本地配置 Xcode 或 Android Studio，一条命令在云端完成构建与签名。
              </p>
              <div className="build-rows">
                <div className="build-row">
                  <span className="build-row__dot build-row__dot--ok" />
                  android · production
                  <span className="build-row__tag">完成 · 6m21s</span>
                </div>
                <div className="build-row">
                  <span className="build-row__dot build-row__dot--run" />
                  ios · production
                  <div className="build-row__bar" />
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal className="bento-card--c">
            <div className="bento-card bento-card--c" style={{ height: '100%' }}>
              <span className="bento-card__idx">03 / EAS UPDATE</span>
              <h3 className="bento-card__title">OTA 即时热更新</h3>
              <p className="bento-card__desc">
                修复直达用户设备，无需重新提交应用商店审核，支持渠道与回滚。
              </p>
              <div className="ota-line">
                <span className="ota-line__pulse" />
                v2.4.1 已推送至 production
                <span className="ota-line__meta">刚刚</span>
              </div>
            </div>
          </Reveal>

          <Reveal delay={80} className="bento-card--d">
            <div className="bento-card bento-card--d" style={{ height: '100%' }}>
              <span className="bento-card__idx">04 / TYPESCRIPT</span>
              <h3 className="bento-card__title">类型安全贯穿始终</h3>
              <p className="bento-card__desc">
                官方模板默认 TypeScript。开启 typedRoutes 后，每一条路由跳转都在编译期接受检查。
              </p>
              <div className="code-chip">
<span className="cc-kw">const</span> {'{ id }'} = useLocalSearchParams&lt;{'{'} <span className="cc-type">id</span>: <span className="cc-type">string</span> {'}'}&gt;();{'\n'}
router.push(<span className="cc-str">{`'/user/\${id}'`}</span>);  <span className="cc-kw">// ✓ 编译期校验路径</span>
              </div>
            </div>
          </Reveal>

          <Reveal className="bento-card--e">
            <div className="bento-card bento-card--e" style={{ height: '100%' }}>
              <span className="bento-card__idx">05 / DEV CLIENT</span>
              <h3 className="bento-card__title">开发客户端</h3>
              <p className="bento-card__desc">
                需要自定义原生代码？开发客户端让你集成任意原生库，同时保留全部 Expo 工作流。
              </p>
              <div className="bento-card__cmd">
                <span className="t-prompt">$</span> npx expo run:ios
              </div>
            </div>
          </Reveal>

          <Reveal delay={80} className="bento-card--f">
            <div className="bento-card bento-card--f" style={{ height: '100%' }}>
              <span className="bento-card__idx">06 / EXPO GO</span>
              <h3 className="bento-card__title">零安装即刻预览</h3>
              <p className="bento-card__desc">
                手机装上 Expo Go，扫码即可在真机运行你的项目——原型验证从未如此简单。
              </p>
              <div className="bento-card__cmd">
                <span className="t-prompt">›</span> 用 Expo Go 扫描二维码
              </div>
            </div>
          </Reveal>

          <Reveal delay={160} className="bento-card--g">
            <div className="bento-card bento-card--g" style={{ height: '100%' }}>
              <span className="bento-card__idx">07 / COMMUNITY</span>
              <h3 className="bento-card__title">庞大的开源生态</h3>
              <p className="bento-card__desc">
                MIT 许可、活跃的 Discord 与论坛、数千个开源示例，随时为你兜底。
              </p>
              <div className="bento-card__cmd">
                <span className="t-prompt">★</span> github.com/expo/expo
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ Steps ============ */}
      <section className="steps-section section-shell">
        <Reveal>
          <div className="section-head">
            <h2 className="section-head__title">三步，从零到运行</h2>
            <p className="section-head__note">
              // 两分钟内看到你的第一个原生应用
            </p>
          </div>
        </Reveal>

        <div className="step-list">
          {[
            {
              num: '01',
              title: '创建项目',
              desc: '使用官方模板初始化，默认内置 Expo Router、TypeScript 与标签导航。',
              cmd: 'npx create-expo-app@latest',
            },
            {
              num: '02',
              title: '启动开发服务器',
              desc: 'Metro 打包器即刻就绪，支持快速刷新与热重载，改动实时可见。',
              cmd: 'npx expo start',
            },
            {
              num: '03',
              title: '选择你的平台',
              desc: '按一个键，应用即刻运行在 iOS 模拟器、Android 模拟器或浏览器中。',
              cmd: '按 i · a · w 切换平台',
            },
          ].map((s, i) => (
            <Reveal key={s.num} delay={i * 90}>
              <div className="step">
                <div className="step__num">{s.num}</div>
                <div className="step__body">
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                </div>
                <div className="step__cmd mono">
                  <span className="t-prompt">$</span>
                  {s.cmd}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section className="cta-section">
        <div className="cta-section__watermark" aria-hidden>
          EXPO
        </div>
        <div className="section-shell">
          <Reveal>
            <div className="cta-section__inner">
              <span className="eyebrow eyebrow--accent mono">READY WHEN YOU ARE</span>
              <h2 className="cta-section__title">
                下一个千万级应用，
                <br />
                从这里开始。
              </h2>
              <p className="cta-section__desc">
                加入数百万开发者的行列。现在初始化项目，十分钟后你就能在手机上看到它运行。
              </p>
              <div className="cta-section__actions">
                <Link to="/docs/introduction" className="btn btn--primary btn--lg">
                  <TerminalSquare size={17} /> 阅读文档
                </Link>
                <Link to="/docs/installation" className="btn btn--ghost btn--lg">
                  环境配置指南 <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
