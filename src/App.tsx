import { useEffect, useState } from "react";
import {
  ArrowDownToLine,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Check,
  Code2,
  FileClock,
  FileInput,
  FileText,
  History,
  Inbox,
  Laptop,
  Menu,
  Monitor,
  Network,
  Plug,
  RotateCcw,
  Search,
  ShieldCheck,
  Sparkles,
  Tags,
  Terminal,
  X
} from "lucide-react";

const noliaVersion = "1.0.1";
const noliaRepoUrl = "https://github.com/harrysxu/Nolia";
const noliaReleaseUrl = `${noliaRepoUrl}/releases/tag/v${noliaVersion}`;
const liteVersion = "1.0.0";
const liteRepoUrl = "https://github.com/harrysxu/NoliaLite";
const liteReleaseUrl = `${liteRepoUrl}/releases/tag/v${liteVersion}`;
const readerRepoUrl = "https://github.com/harrysxu/nolia-reader";
const userManualUrl = `${noliaRepoUrl}/blob/main/docs/user/USER_MANUAL.md`;
const upgradeGuideUrl = `${noliaRepoUrl}/blob/main/docs/release/UPGRADE.md`;
const pluginGuideUrl = `${noliaRepoUrl}/blob/main/docs/plugins/PLUGIN_DEVELOPMENT.md`;
const contactEmail = "ailehuoquan@163.com";
const icpRegistrationNumber = "京ICP备2026003704号-2";
const icpRegistrationUrl = "https://beian.miit.gov.cn/";

const liteDownloads = {
  arm64: `${liteRepoUrl}/releases/download/v${liteVersion}/Nolia-Lite-${liteVersion}-macos-arm64.dmg`,
  x64: `${liteRepoUrl}/releases/download/v${liteVersion}/Nolia-Lite-${liteVersion}-macos-x86_64.dmg`
};

type PlatformId = "macos" | "windows" | "linux";

const platformDownloads = {
  macos: {
    label: "macOS",
    icon: Laptop,
    format: "DMG",
    note: "Apple 芯片、Intel 芯片与通用版本均已完成 Developer ID 签名、Apple 公证和装订。",
    trust: "Apple 签名、公证与装订",
    downloads: [
      {
        title: "Apple 芯片",
        detail: "适用于 M1 及更新机型",
        size: "150 MB",
        url: `${noliaRepoUrl}/releases/download/v${noliaVersion}/Nolia-${noliaVersion}-mac-arm64.dmg`
      },
      {
        title: "Intel 芯片",
        detail: "适用于 Intel Mac",
        size: "154 MB",
        url: `${noliaRepoUrl}/releases/download/v${noliaVersion}/Nolia-${noliaVersion}-mac-x64.dmg`
      },
      {
        title: "通用版本",
        detail: "同时支持两种架构",
        size: "234 MB",
        url: `${noliaRepoUrl}/releases/download/v${noliaVersion}/Nolia-${noliaVersion}-mac-universal.dmg`
      }
    ]
  },
  windows: {
    label: "Windows",
    icon: Monitor,
    format: "EXE / ZIP",
    note: "适用于 Windows 10 与 Windows 11 x64。当前 Windows 安装包尚未进行代码签名。",
    trust: "通过 Windows x64 安装与运行验收",
    downloads: [
      {
        title: "x64 安装器",
        detail: "可选择安装位置的 NSIS 安装包",
        size: "192 MB",
        url: `${noliaRepoUrl}/releases/download/v${noliaVersion}/Nolia-${noliaVersion}-win-x64.exe`
      },
      {
        title: "x64 便携版",
        detail: "解压 ZIP 后直接运行",
        size: "192 MB",
        url: `${noliaRepoUrl}/releases/download/v${noliaVersion}/Nolia-${noliaVersion}-win-x64.zip`
      }
    ]
  },
  linux: {
    label: "Linux",
    icon: Terminal,
    format: "APPIMAGE / DEB",
    note: "当前 Linux 公开产物为 arm64，提供便携 AppImage 与 Debian/Ubuntu 安装包。",
    trust: "通过 Linux arm64 安装与运行验收",
    downloads: [
      {
        title: "arm64 AppImage",
        detail: "赋予执行权限后直接启动",
        size: "164 MB",
        url: `${noliaRepoUrl}/releases/download/v${noliaVersion}/Nolia-${noliaVersion}-linux-arm64.AppImage`
      },
      {
        title: "arm64 deb",
        detail: "适用于 Debian / Ubuntu",
        size: "132 MB",
        url: `${noliaRepoUrl}/releases/download/v${noliaVersion}/Nolia-${noliaVersion}-linux-arm64.deb`
      }
    ]
  }
} satisfies Record<PlatformId, {
  label: string;
  icon: typeof Laptop;
  format: string;
  note: string;
  trust: string;
  downloads: Array<{ title: string; detail: string; size: string; url: string }>;
}>;

const workspaceFeatures = [
  {
    icon: FileInput,
    title: "文件与工作区并存",
    detail: "直接打开单个 Markdown，或初始化完整工作区；不会强制导入和搬迁正文。"
  },
  {
    icon: FileClock,
    title: "多文档与恢复",
    detail: "恢复标签、模式与草稿；磁盘内容变化时先比较，不静默覆盖。"
  },
  {
    icon: FileText,
    title: "完整内容工具",
    detail: "编辑 Markdown、JSON 与文本，并预览图片、PDF、音视频等资源。"
  }
];

const knowledgeFeatures = [
  {
    icon: Inbox,
    title: "捕获与日记",
    detail: "用 Inbox 快速捕获、Daily Note 和模板变量，把零散输入放进稳定目录。"
  },
  {
    icon: Search,
    title: "统一发现",
    detail: "搜索标题、正文、路径、标签、属性和任务项；支持保存搜索与混合检索。"
  },
  {
    icon: Tags,
    title: "属性与标签",
    detail: "在检查器中管理属性，按标签筛选，并在重命名前预览全部影响文件。"
  },
  {
    icon: Network,
    title: "双链与关系图",
    detail: "标题补全、反向链接、未链接提及和局部关系图，让连接保持可见。"
  }
];

const aiFlow = ["创建持久任务", "检索授权上下文", "审查多文件变更", "批准、提交或撤销"];

const docs = [
  {
    icon: BookOpen,
    title: "使用手册",
    detail: "工作区、知识发现、AI 与快捷键",
    url: userManualUrl
  },
  {
    icon: History,
    title: "1.0.1 升级指南",
    detail: "备份、安装、迁移与回退",
    url: upgradeGuideUrl
  },
  {
    icon: Plug,
    title: "Plugin API v3 指南",
    detail: "隔离运行时、权限与扩展开发",
    url: pluginGuideUrl
  }
];

function detectPlatform(): PlatformId {
  const userAgent = navigator.userAgent.toLowerCase();
  if (userAgent.includes("win")) return "windows";
  if (userAgent.includes("linux") && !userAgent.includes("android")) return "linux";
  return "macos";
}

export function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [platform, setPlatform] = useState<PlatformId>(detectPlatform);
  const selectedPlatform = platformDownloads[platform];

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
          <a href="#desktop" onClick={() => setMenuOpen(false)}>工作区</a>
          <a href="#knowledge" onClick={() => setMenuOpen(false)}>知识系统</a>
          <a href="#ai" onClick={() => setMenuOpen(false)}>受控 AI</a>
          <a href="#reader" onClick={() => setMenuOpen(false)}>Reader</a>
          <a href="#lite" onClick={() => setMenuOpen(false)}>Lite</a>
          <a href="#docs" onClick={() => setMenuOpen(false)}>文档</a>
          <a href={noliaRepoUrl} target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={13} /></a>
          <a className="nav-download" href="#download" onClick={() => setMenuOpen(false)}>下载 {noliaVersion}</a>
        </nav>
      </header>

      <main id="top">
        <section className="hero-section" aria-labelledby="hero-title">
          <div className="hero-background" aria-hidden="true">
            <img src={`/assets/nolia-workspace.png?v=${noliaVersion}`} alt="" />
          </div>
          <div className="hero-content page-width">
            <p className="hero-kicker"><span>Local-first</span> Knowledge Workspace · {noliaVersion}</p>
            <h1 id="hero-title">Nolia</h1>
            <p className="hero-statement">你的文件，你的模型，<br />你的知识工作台。</p>
            <p className="hero-description">
              在本地 Markdown 中捕获、写作、连接与检索。AI 以可恢复任务参与工作，每一次文件写入仍由你确认。
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#download"><ArrowDownToLine size={17} /> 下载 {noliaVersion}</a>
              <a className="button button-quiet" href="#desktop">查看新版工作方式 <ArrowRight size={16} /></a>
            </div>
            <div className="hero-meta" aria-label="Nolia 产品特点">
              <span>标准 Markdown</span>
              <span>可恢复 AI</span>
              <span>macOS · Windows · Linux</span>
            </div>
          </div>
        </section>

        <section id="desktop" className="chapter chapter-desktop">
          <div className="page-width">
            <div className="chapter-heading">
              <p className="chapter-index"><span>01</span> Files & Workspace</p>
              <div>
                <h2>打开一个文件，<br />或进入整个工作区。</h2>
                <p>
                  Nolia 1.0.1 让外部 Markdown 与工作区并存。单文件编辑、已有目录和完整知识库各自保持合适边界，正文始终留在你选择的位置。
                </p>
              </div>
            </div>

            <figure className="product-stage workspace-stage">
              <div className="stage-label"><span>~/Documents/Nolia/workspace</span><span>真实 Nolia {noliaVersion} 界面</span></div>
              <img src={`/assets/nolia-workspace.png?v=${noliaVersion}`} alt={`Nolia ${noliaVersion} 的文件导航、多文档标签、Markdown 分屏编辑与文档检查器`} />
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

        <section id="knowledge" className="chapter chapter-knowledge">
          <div className="page-width knowledge-layout">
            <div className="knowledge-copy">
              <p className="chapter-index"><span>02</span> Knowledge System</p>
              <div className="chapter-symbol"><Network size={22} /></div>
              <h2>不只找到文档，<br />也看见它们之间的关系。</h2>
              <p>
                从快速捕获到统一搜索，再到属性、标签、双链和局部关系图，Nolia 把知识整理放回文件系统之上，而不是藏进不可迁移的数据库里。
              </p>
              <div className="knowledge-list">
                {knowledgeFeatures.map(({ icon: Icon, title, detail }) => (
                  <div className="knowledge-item" key={title}>
                    <Icon size={18} />
                    <div><h3>{title}</h3><p>{detail}</p></div>
                  </div>
                ))}
              </div>
            </div>

            <figure className="product-stage discovery-stage">
              <div className="stage-label"><span>Discover · Exact / Hybrid</span><span>标题、正文、路径、标签、属性、任务</span></div>
              <img src="/assets/nolia-discovery.png" alt="Nolia 发现页中的统一搜索、精确与混合模式、标签和保存搜索" />
            </figure>
          </div>
        </section>

        <section id="ai" className="chapter chapter-ai">
          <div className="page-width ai-layout">
            <div className="ai-copy">
              <p className="chapter-index"><span>03</span> Recoverable AI</p>
              <div className="chapter-symbol"><Sparkles size={22} /></div>
              <h2>让 AI 工作，<br />让过程可以核查。</h2>
              <p>
                AI 不再只是一次聊天。Nolia 会保留任务、对话、模型与 Token、执行记录和文件变更；多文件修改可逐项审批，提交后仍有可靠的撤销检查。
              </p>
              <ul className="check-list">
                <li><Check size={15} /> 支持 OpenAI-compatible、Responses API 与 Ollama</li>
                <li><Check size={15} /> 按权限读取当前文档、搜索结果或整个工作区</li>
                <li><RotateCcw size={15} /> 持久事务、部分审批、失败回滚与 hash 校验撤销</li>
              </ul>
            </div>

            <figure className="product-stage ai-stage">
              <div className="stage-label"><span>AI task history</span><span>对话 · 执行记录 · 变更</span></div>
              <img src={`/assets/nolia-ai.png?v=${noliaVersion}`} alt="Nolia AI 的持久任务详情、对话历史、执行记录与文件变更" />
            </figure>
          </div>

          <div className="ai-flow page-width" aria-label="Nolia AI 可恢复工作流程">
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
                <p className="chapter-index"><span>04</span> Nolia Reader</p>
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

        <section id="lite" className="chapter chapter-lite">
          <div className="page-width">
            <div className="lite-heading">
              <div>
                <p className="chapter-index"><span>05</span> Nolia Lite</p>
                <div className="lite-identity">
                  <img src="/assets/nolia-lite-app-icon.png" alt="" />
                  <span>Markdown editor · {liteVersion}</span>
                </div>
              </div>
              <div>
                <h2>只想打开一份 Markdown，<br />直接开始写。</h2>
                <p>
                  Nolia Lite 是生态中的轻量级 Markdown 编辑器。一个窗口只处理一份文档，连续所见即所得、标准 Markdown 与本地保存构成全部核心；没有工作区、知识库、AI 或账号负担。
                  1.0.0 当前支持 macOS 13 及以上系统，Apple 芯片与 Intel DMG 均已完成签名和公证。
                </p>
                <div className="lite-actions" aria-label="下载 Nolia Lite 1.0.0">
                  <a className="button button-primary" href={liteDownloads.arm64}><ArrowDownToLine size={16} /> Apple 芯片</a>
                  <a className="button button-quiet" href={liteDownloads.x64}><ArrowDownToLine size={16} /> Intel 芯片</a>
                </div>
                <a className="text-link lite-release-link" href={liteReleaseUrl} target="_blank" rel="noreferrer">
                  Nolia Lite {liteVersion} 发布说明与 SHA256 <ArrowUpRight size={15} />
                </a>
              </div>
            </div>

            <figure className="product-stage lite-stage">
              <div className="stage-label"><span>MARKDOWN_ELEMENT_SHOWCASE.md</span><span>真实 Nolia Lite {liteVersion} 界面</span></div>
              <img src={`/assets/nolia-lite-editor.jpg?v=${liteVersion}`} alt="Nolia Lite 的单文档大纲、连续所见即所得 Markdown 编辑画布与按光标显现的语法" />
            </figure>

            <div className="reader-facts lite-facts" aria-label="Nolia Lite 功能">
              <span><FileText size={16} /> 连续所见即所得</span>
              <span><Laptop size={16} /> 单文档多原生窗口</span>
              <span><ShieldCheck size={16} /> 本地运行，不上传文档</span>
              <a href={liteRepoUrl} target="_blank" rel="noreferrer">查看源代码 <ArrowUpRight size={14} /></a>
            </div>
          </div>
        </section>

        <section id="download" className="release-section">
          <div className="page-width release-layout">
            <div className="release-intro">
              <img src="/assets/nolia-app-icon.png" alt="" />
              <p className="chapter-index"><span>Release</span> Nolia {noliaVersion}</p>
              <h2>把工作区留在<br />自己的电脑里。</h2>
              <p>选择你的平台，直接从 GitHub Release 下载经过验收的正式产物。</p>
              <div className="release-trust"><ShieldCheck size={16} /> {selectedPlatform.trust}</div>
            </div>

            <div className="download-panel">
              <div className="platform-tabs" role="tablist" aria-label="选择下载平台">
                {(Object.entries(platformDownloads) as Array<[PlatformId, typeof selectedPlatform]>).map(([id, item]) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={id}
                      type="button"
                      role="tab"
                      aria-selected={platform === id}
                      className={platform === id ? "is-active" : ""}
                      onClick={() => setPlatform(id)}
                    >
                      <Icon size={16} /> {item.label}
                    </button>
                  );
                })}
              </div>

              <div className="download-list" role="tabpanel" aria-label={`${selectedPlatform.label} 下载`}>
                <div className="download-list-head"><span>{selectedPlatform.label} 安装包</span><span>{selectedPlatform.format}</span></div>
                {selectedPlatform.downloads.map((download) => (
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
                <p className="platform-note">{selectedPlatform.note}</p>
              </div>
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
          <div className="footer-links"><a href={noliaRepoUrl} target="_blank" rel="noreferrer">GitHub</a><a href={liteRepoUrl} target="_blank" rel="noreferrer">Lite</a><a href={readerRepoUrl} target="_blank" rel="noreferrer">Reader</a><a href={`mailto:${contactEmail}`}>联系</a></div>
          <div className="footer-legal"><span>Copyright {new Date().getFullYear()} Nolia</span><a href={icpRegistrationUrl} target="_blank" rel="noreferrer">{icpRegistrationNumber}</a></div>
        </div>
      </footer>
    </div>
  );
}
