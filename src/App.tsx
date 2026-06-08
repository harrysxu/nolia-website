import { useEffect } from "react";
import {
  ArrowDownToLine,
  ChevronDown,
  Code2,
  Eye,
  EyeOff,
  FileText,
  FolderTree,
  GitBranch,
  Search,
  Zap
} from "lucide-react";

const githubReleaseUrl = "https://github.com/harrysxu/Nolia/releases/latest";
const githubRepoUrl = "https://github.com/harrysxu/Nolia";
const contactEmail = "ailehuoquan@163.com";

const writingFeatures = [
  { icon: EyeOff, title: "Distractions Free" },
  { icon: Zap, title: "Seamless Live Preview" },
  { icon: Eye, title: "What You See Is What You Mean" }
];

const powerTabs = [
  "Images,",
  "Headers,",
  "Lists,",
  "Tables,",
  "Code Fences,",
  "Mathematics,",
  "Diagrams,",
  "Backlinks,",
  "etc.."
];

const accessibilityItems = [
  {
    icon: FolderTree,
    title: "Organize Files",
    description: "Use normal local folders as your knowledge base. Markdown files, assets and project notes remain portable."
  },
  {
    icon: FileText,
    title: "Outline Panel",
    description: "Jump through long documents by headings while keeping the writing surface clean."
  },
  {
    icon: Search,
    title: "Local Search",
    description: "Find notes, links and recent work from an index that stays on your machine."
  },
  {
    icon: GitBranch,
    title: "Link & Version",
    description: "Keep backlinks readable and let Git handle history without locking your notes into a closed format."
  }
];

export function App() {
  useHeroSnapScroll();

  return (
    <div className="site-shell">
      <main id="top">
        <section className="hero-section" aria-label="Nolia">
          <div className="hero-copy">
            <h1>Nolia</h1>
            <p className="hero-comment">/* A MINIMAL MARKDOWN EDITOR */</p>
            <p className="hero-subline">
              Local-first writing, live preview and knowledge indexing in one focused workstation.
            </p>
            <div className="hero-badges" aria-label="核心能力">
              <span>Local files</span>
              <span>Live Markdown</span>
              <span>Link graph</span>
            </div>
          </div>
          <HeroVisual />
          <a className="scroll-cue" href="#feature" aria-label="查看功能">
            <span className="scroll-track" aria-hidden="true">
              <span />
            </span>
            <ChevronDown size={18} strokeWidth={1.8} aria-hidden="true" />
          </a>
        </section>

        <header className="site-header" aria-label="主导航">
          <a className="brand" href="#top" aria-label="Nolia 首页">
            <span className="brand-mark">N</span>
            <span>Nolia</span>
          </a>
          <nav className="nav-links" aria-label="页面导航">
            <a href="#feature">Features</a>
            <a href="#download">Download</a>
            <a href="#accessibility">Docs</a>
          </nav>
        </header>

        <section id="feature" className="section readable-section">
          <div className="readable-copy">
            <h2>Readable &amp; Writable</h2>
            <p>
              Nolia keeps Markdown close to the rendered page. Panels, syntax noise and project tools stay quiet until
              they are useful, so writing still feels like reading.
            </p>
            <div className="writing-points">
              {writingFeatures.map((feature) => {
                const Icon = feature.icon;

                return (
                  <div className="writing-point" key={feature.title}>
                    <Icon size={18} strokeWidth={1.7} aria-hidden="true" />
                    <strong>{feature.title}</strong>
                  </div>
                );
              })}
            </div>
          </div>
          <ReadableShot />
        </section>

        <section id="features" className="section powerful-section">
          <h2>Simple, yet Powerful</h2>
          <div className="power-tabs" aria-label="Markdown 能力">
            {powerTabs.map((item, index) => (
              <span className={index === 0 ? "active" : undefined} key={item}>
                {item}
              </span>
            ))}
          </div>
          <FeatureShot />
          <p className="shot-comment">/* DISPLAY MEDIA, STRUCTURE, CODE AND LINKS WHILE WRITING */</p>
        </section>

        <section id="accessibility" className="section accessibility-section">
          <h2>Accessibility</h2>
          <p className="code-comment">/* YOU FOCUS ON THE CONTENT, NOLIA HELPS WITH THE REST */</p>
          <div className="access-grid">
            {accessibilityItems.map((item) => {
              const Icon = item.icon;

              return (
                <article className="access-item" key={item.title}>
                  <Icon size={34} strokeWidth={1.35} aria-hidden="true" />
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                </article>
              );
            })}
          </div>
          <p className="more-comment">/* MORE IN OUR DOCUMENTS */</p>
        </section>

        <section id="download" className="section download-section">
          <h2>want Nolia ?</h2>
          <div className="download-module">
            <div className="download-icon" aria-hidden="true">
              N
            </div>
            <div className="download-copy">
              <span>GitHub Releases</span>
              <strong>A minimal Markdown editor and reader.</strong>
              <small>Local-first workspace / macOS, Windows, Linux</small>
            </div>
            <div className="download-actions">
              <a className="primary-button" href={githubReleaseUrl}>
                <ArrowDownToLine size={17} strokeWidth={1.8} aria-hidden="true" />
                Download
              </a>
              <a className="source-link" href={githubRepoUrl}>
                Source code on GitHub
              </a>
            </div>
          </div>
          <p className="contact-line">
            Contact <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
          </p>
        </section>
      </main>

      <footer className="site-footer">
        <div>
          <strong>Nolia</strong>
          <span>Local-first Markdown knowledge workstation.</span>
        </div>
        <div className="footer-links">
          <a href={githubReleaseUrl}>GitHub Releases</a>
          <a href={githubRepoUrl}>Repository</a>
          <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
        </div>
      </footer>
    </div>
  );
}

function useHeroSnapScroll() {
  useEffect(() => {
    let locked = false;
    let scrollTimer: number | undefined;
    let touchStartY = 0;
    let lastScrollY = window.scrollY;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const getHeaderOffset = () => document.querySelector<HTMLElement>(".site-header")?.offsetHeight ?? 64;

    const isWithinHeroIntro = () => {
      const hero = document.querySelector<HTMLElement>(".hero-section");

      if (!hero) {
        return false;
      }

      return window.scrollY < hero.offsetTop + hero.offsetHeight - getHeaderOffset() - 8;
    };

    const snapToFeature = () => {
      const target = document.getElementById("feature");

      if (!target || locked) {
        return;
      }

      locked = true;
      document.documentElement.classList.add("page-snap-transition");
      window.scrollTo({
        top: Math.max(0, target.getBoundingClientRect().top + window.scrollY - getHeaderOffset()),
        behavior: reducedMotion.matches ? "auto" : "smooth",
      });

      window.setTimeout(() => {
        locked = false;
        document.documentElement.classList.remove("page-snap-transition");
      }, reducedMotion.matches ? 120 : 900);
    };

    const onWheel = (event: WheelEvent) => {
      if (event.deltaY <= 18 || !isWithinHeroIntro()) {
        return;
      }

      event.preventDefault();
      snapToFeature();
    };

    const onTouchStart = (event: TouchEvent) => {
      touchStartY = event.touches[0]?.clientY ?? 0;
    };

    const onTouchEnd = (event: TouchEvent) => {
      const touchEndY = event.changedTouches[0]?.clientY ?? touchStartY;

      if (touchStartY - touchEndY > 42 && isWithinHeroIntro()) {
        snapToFeature();
      }
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (!["ArrowDown", "PageDown", " "].includes(event.key) || !isWithinHeroIntro()) {
        return;
      }

      event.preventDefault();
      snapToFeature();
    };

    const onScroll = () => {
      const currentScrollY = window.scrollY;
      const movingDown = currentScrollY > lastScrollY;

      lastScrollY = currentScrollY;

      if (locked || !movingDown || currentScrollY < 8 || !isWithinHeroIntro()) {
        return;
      }

      window.clearTimeout(scrollTimer);
      scrollTimer = window.setTimeout(snapToFeature, 80);
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.clearTimeout(scrollTimer);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);
}

function HeroVisual() {
  return (
    <div className="hero-visual" aria-hidden="true">
      <div className="hero-slab hero-slab-left">
        <span />
        <span />
        <span />
      </div>
      <div className="hero-slab hero-slab-right">
        <span />
        <span />
        <span />
      </div>
      <div className="hero-workstation">
        <div className="hero-window-bar">
          <div className="traffic-lights">
            <span />
            <span />
            <span />
          </div>
          <strong>workspace.md</strong>
          <span>Indexed</span>
        </div>
        <div className="hero-window-body">
          <aside className="hero-window-sidebar">
            <span />
            <span />
            <span />
            <span />
          </aside>
          <section className="hero-window-editor">
            <p># Product Notes</p>
            <strong>Design decisions that stay readable.</strong>
            <span className="code-line wide" />
            <span className="code-line" />
            <span className="code-line short" />
            <div className="hero-code-card">
              <span>```mermaid</span>
              <span>Draft --&gt; Link --&gt; Release</span>
              <span>```</span>
            </div>
          </section>
          <aside className="hero-window-map">
            <span className="map-node node-one" />
            <span className="map-node node-two" />
            <span className="map-node node-three" />
            <span className="map-link link-one" />
            <span className="map-link link-two" />
          </aside>
        </div>
      </div>
      <div className="hero-metric metric-left">
        <span>128</span>
        <small>docs indexed</small>
      </div>
      <div className="hero-metric metric-right">
        <span>2.4k</span>
        <small>local links</small>
      </div>
    </div>
  );
}

function ReadableShot() {
  return (
    <div className="editor-shot readable-shot" aria-label="Nolia 编辑器界面示意">
      <div className="shot-titlebar">
        <div className="traffic-lights" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <span>Untitled - Edited</span>
      </div>
      <div className="readable-paper">
        <p className="markdown-kicker"># Nolia</p>
        <h3>Nolia</h3>
        <p>Hello, Markdown.</p>
        <p>
          Write project notes, diagrams and decisions in ordinary files.
          <span className="typing-caret" aria-hidden="true" />
        </p>
      </div>
    </div>
  );
}

function FeatureShot() {
  return (
    <div className="editor-shot feature-shot" aria-label="Nolia Markdown 能力示意">
      <div className="shot-titlebar">
        <div className="traffic-lights" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <span>image.md</span>
      </div>
      <div className="feature-body">
        <div className="markdown-lines">
          <span>You can keep source text readable while Nolia renders context beside it.</span>
          <strong>![workspace](./assets/architecture.png)</strong>
        </div>
        <div className="image-preview" aria-hidden="true">
          <div className="image-grid" />
          <div className="node node-a" />
          <div className="node node-b" />
          <div className="node node-c" />
          <div className="node-line line-a" />
          <div className="node-line line-b" />
        </div>
        <div className="feature-meta">
          <span>
            <Code2 size={15} strokeWidth={1.7} aria-hidden="true" />
            code fences
          </span>
          <span>$$ math $$</span>
          <span>[[backlinks]]</span>
        </div>
      </div>
    </div>
  );
}
