import { useEffect, useState } from "react";
import {
  ArrowDownToLine,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Check,
  Code2,
  FileText,
  FolderOpen,
  GitBranch,
  History,
  Menu,
  Plug,
  Search,
  ShieldCheck,
  Sparkles,
  X
} from "lucide-react";

const noliaRepoUrl = "https://github.com/harrysxu/Nolia";
const noliaReleaseUrl = `${noliaRepoUrl}/releases/tag/v1.0.0`;
const readerRepoUrl = "https://github.com/harrysxu/nolia-reader";
const userManualUrl = `${noliaRepoUrl}/blob/main/docs/user/USER_MANUAL.md`;
const upgradeGuideUrl = `${noliaRepoUrl}/blob/main/docs/release/UPGRADE.md`;
const pluginGuideUrl = `${noliaRepoUrl}/blob/main/docs/plugins/PLUGIN_DEVELOPMENT.md`;
const contactEmail = "ailehuoquan@163.com";
const icpRegistrationNumber = "京ICP备2026003704号-2";
const icpRegistrationUrl = "https://beian.miit.gov.cn/";

const downloads = [
  {
    title: "Apple 芯片",
    detail: "适用于 M1 及更新机型",
    size: "147 MB",
    url: `${noliaRepoUrl}/releases/download/v1.0.0/Nolia-1.0.0-mac-arm64.dmg`
  },
  {
    title: "Intel 芯片",
    detail: "适用于 Intel Mac",
    size: "151 MB",
    url: `${noliaRepoUrl}/releases/download/v1.0.0/Nolia-1.0.0-mac-x64.dmg`
  },
  {
    title: "通用版本",
    detail: "同时支持两种架构",
    size: "231 MB",
    url: `${noliaRepoUrl}/releases/download/v1.0.0/Nolia-1.0.0-mac-universal.dmg`
  }
];

const workspaceFeatures = [
  {
    icon: FolderOpen,
    title: "原生文件",
    detail: "直接打开本地文件夹，内容始终是标准 Markdown。"
  },
  {
    icon: GitBranch,
    title: "知识连接",
    detail: "通过反向链接和语义检索，在文档之间建立关系。"
  },
  {
    icon: FileText,
    title: "按需呈现",
    detail: "源码、编辑与预览模式，随工作方式自由切换。"
  }
];

const aiFlow = ["授权上下文", "生成修改提案", "预览操作与差异", "确认后写入"];

const docs = [
  {
    icon: BookOpen,
    title: "使用手册",
    detail: "工作区、编辑模式与快捷键",
    url: userManualUrl
  },
  {
    icon: History,
    title: "1.0 升级指南",
    detail: "备份、安装与索引重建",
    url: upgradeGuideUrl
  },
  {
    icon: Plug,
    title: "插件开发指南",
    detail: "扩展侧栏、命令与文件视图",
    url: pluginGuideUrl
  }
];

export function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const closeMenu = () => setMenuOpen(false);
    window.addEventListener("resize", closeMenu);
    return () => window.removeEventListener("resize", closeMenu);
  }, []);

  return (
    <div className="site-shell">
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Nolia 首页" onClick={() => setMenuOpen(false)}>
          <img src="/assets/nolia-app-icon.png" alt="" />
          <span>Nolia</span>
        </a>

        <button
          className="menu-button"
          type="button"
          aria-label={menuOpen ? "关闭导航" : "打开导航"}
          aria-expanded={menuOpen}
          aria-controls="site-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        <nav id="site-navigation" className={menuOpen ? "site-nav is-open" : "site-nav"} aria-label="主导航">
          <a href="#desktop" onClick={() => setMenuOpen(false)}>桌面端</a>
          <a href="#ai" onClick={() => setMenuOpen(false)}>受控 AI</a>
          <a href="#reader" onClick={() => setMenuOpen(false)}>Reader</a>
          <a href="#docs" onClick={() => setMenuOpen(false)}>文档</a>
          <a href={noliaRepoUrl} target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={13} /></a>
          <a className="nav-download" href="#download" onClick={() => setMenuOpen(false)}>下载 Nolia</a>
        </nav>
      </header>

      <main id="top">
        <section className="hero-section" aria-labelledby="hero-title">
          <div className="hero-background" aria-hidden="true">
            <img src="/assets/nolia-workspace.png" alt="" />
          </div>
          <div className="hero-content page-width">
            <p className="hero-kicker"><span>Local-first</span> Knowledge Workspace · 1.0</p>
            <h1 id="hero-title">Nolia</h1>
            <p className="hero-statement">你的文件，你的模型，<br />你的知识工作台。</p>
            <p className="hero-description">
              直接在本地 Markdown 文件中写作、连接与检索。AI 只在获得权限后工作，每次写入都由你确认。
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#download"><ArrowDownToLine size={17} /> 下载 macOS 版</a>
              <a className="button button-quiet" href="#desktop">了解工作方式 <ArrowRight size={16} /></a>
            </div>
            <div className="hero-meta" aria-label="Nolia 产品特点">
              <span>标准 Markdown</span>
              <span>本地文件夹</span>
              <span>受控 AI</span>
            </div>
          </div>
        </section>

        <section id="desktop" className="chapter chapter-desktop">
          <div className="page-width">
            <div className="chapter-heading">
              <p className="chapter-index"><span>01</span> Desktop Workspace</p>
              <div>
                <h2>从一个文件夹开始，<br />而不是从一次导入开始。</h2>
                <p>
                  Nolia 不接管你的内容。选择一个已有文件夹，就能继续使用熟悉的目录、文件名和版本控制，在同一个空间里完成写作与知识整理。
                </p>
              </div>
            </div>

            <figure className="product-stage workspace-stage">
              <div className="stage-label"><span>~/Documents/Nolia/workspace</span><span>真实 Nolia 1.0 界面</span></div>
              <img src="/assets/nolia-workspace.png" alt="Nolia 1.0 的本地文件工作区、Markdown 编辑器与分屏预览" />
            </figure>

            <div className="feature-ledger">
              {workspaceFeatures.map(({ icon: Icon, title, detail }) => (
                <div className="ledger-item" key={title}>
                  <Icon size={19} />
                  <div><h3>{title}</h3><p>{detail}</p></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="ai" className="chapter chapter-ai">
          <div className="page-width ai-layout">
            <div className="ai-copy">
              <p className="chapter-index"><span>02</span> Controlled AI</p>
              <div className="chapter-symbol"><Sparkles size={22} /></div>
              <h2>让 AI 提议，<br />让你决定。</h2>
              <p>
                你决定 AI 能看到什么，也决定哪些结果可以进入文件。Nolia 将修改组织为清晰的操作提案，在真正写入之前保留最后一道确认。
              </p>
              <ul className="check-list">
                <li><Check size={15} /> 支持 OpenAI-compatible、Responses API 与 Ollama</li>
                <li><Check size={15} /> 可分别授权当前文档、工作区搜索与语义索引</li>
                <li><Check size={15} /> 修改前预览，应用前确认，应用后可恢复</li>
              </ul>
            </div>

            <figure className="product-stage ai-stage">
              <div className="stage-label"><span>Workspace operation proposal</span><span>等待你的确认</span></div>
              <img src="/assets/nolia-ai.png" alt="Nolia AI 的工作区操作提案、差异预览与确认界面" />
            </figure>
          </div>

          <div className="ai-flow page-width" aria-label="Nolia AI 受控写入流程">
            {aiFlow.map((step, index) => (
              <div className="flow-step" key={step}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{step}</strong>
                {index < aiFlow.length - 1 && <ArrowRight size={16} aria-hidden="true" />}
              </div>
            ))}
          </div>
        </section>

        <section id="reader" className="chapter chapter-reader">
          <div className="page-width">
            <div className="reader-heading">
              <div>
                <p className="chapter-index"><span>03</span> Nolia Reader</p>
                <div className="reader-identity">
                  <img src="/assets/nolia-reader-icon.png" alt="" />
                  <span>Browser extension · 0.1.0</span>
                </div>
              </div>
              <div>
                <h2>把网页里的 Markdown，<br />变成一页真正适合阅读的文档。</h2>
                <p>
                  Reader 自动识别原始 Markdown、本地文件和代码托管页面。目录、主题、源码切换与导出都在浏览器本地完成，不上传正文，也不收集遥测。
                </p>
                <a className="text-link" href={readerRepoUrl} target="_blank" rel="noreferrer">
                  从源码安装 Nolia Reader <ArrowUpRight size={15} />
                </a>
              </div>
            </div>

            <figure className="product-stage reader-stage">
              <div className="stage-label"><span>README.md</span><span>Chrome · Edge · Firefox</span></div>
              <img src="/assets/nolia-reader-ui.png" alt="Nolia Reader 的文档目录、阅读主题和 Markdown 阅读界面" />
            </figure>

            <div className="reader-facts" aria-label="Nolia Reader 功能">
              <span><Search size={16} /> 自动识别 Markdown</span>
              <span><Code2 size={16} /> Mermaid、KaTeX 与 GFM</span>
              <span><ArrowDownToLine size={16} /> 导出 Markdown、HTML、PDF 与离线包</span>
            </div>
          </div>
        </section>

        <section id="download" className="release-section">
          <div className="page-width release-layout">
            <div className="release-intro">
              <img src="/assets/nolia-app-icon.png" alt="" />
              <p className="chapter-index"><span>Release</span> Nolia 1.0.0</p>
              <h2>把工作区留在<br />自己的电脑里。</h2>
              <p>当前公开版本提供已签名、公证并装订的 macOS 安装包。</p>
              <div className="release-trust"><ShieldCheck size={16} /> Apple 签名与公证</div>
            </div>

            <div className="download-list">
              <div className="download-list-head"><span>macOS 安装包</span><span>DMG</span></div>
              {downloads.map((download) => (
                <a href={download.url} key={download.title}>
                  <ArrowDownToLine size={19} />
                  <span className="download-name"><strong>{download.title}</strong><small>{download.detail}</small></span>
                  <span className="download-size">{download.size}</span>
                  <ArrowUpRight className="download-arrow" size={17} />
                </a>
              ))}
              <div className="release-links">
                <a href={noliaReleaseUrl} target="_blank" rel="noreferrer">发布说明与 SHA256 <ArrowUpRight size={14} /></a>
                <a href={noliaRepoUrl} target="_blank" rel="noreferrer">查看源代码 <ArrowUpRight size={14} /></a>
              </div>
              <p className="platform-note">Windows 与 Linux 打包能力已在代码库中提供，但 1.0.0 暂无公开安装包。</p>
            </div>
          </div>
        </section>

        <section id="docs" className="docs-section">
          <div className="page-width docs-layout">
            <div className="docs-heading"><p className="chapter-index"><span>Docs</span> Learn more</p><h2>继续了解 Nolia</h2></div>
            <div className="docs-list">
              {docs.map(({ icon: Icon, title, detail, url }) => (
                <a href={url} target="_blank" rel="noreferrer" key={title}>
                  <Icon size={19} />
                  <span><strong>{title}</strong><small>{detail}</small></span>
                  <ArrowUpRight size={16} />
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="page-width footer-layout">
          <div className="footer-brand"><img src="/assets/nolia-app-icon.png" alt="" /><span><strong>Nolia</strong><small>你的文件，你的模型，你的知识工作台。</small></span></div>
          <div className="footer-links"><a href={noliaRepoUrl} target="_blank" rel="noreferrer">GitHub</a><a href={readerRepoUrl} target="_blank" rel="noreferrer">Reader</a><a href={`mailto:${contactEmail}`}>联系</a></div>
          <div className="footer-legal"><span>Copyright {new Date().getFullYear()} Nolia</span><a href={icpRegistrationUrl} target="_blank" rel="noreferrer">{icpRegistrationNumber}</a></div>
        </div>
      </footer>
    </div>
  );
}
