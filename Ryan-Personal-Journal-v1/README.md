# Ryan 的个人空间与博客 · 操作指南

为 `BrickRyan122/BrickRyan122.github.io` 准备的第一版个人网站。

视觉方向：纸白、墨绿、朱红；独立杂志感；理工与生活相交的抽象生长图形。

## 先在电脑上看看

1. 下载压缩包，在 Windows 中右键选择「全部解压」。
2. 打开解压后的文件夹，双击 `index.html`，用 Chrome 或 Edge 打开。
3. 试试「翻开我的手记」、文章分类、文章阅读、搜索和「关于我」。
4. 所有页面文件均在本地，不依赖外部字体、图片或第三方脚本。

## 第一次发布：只用浏览器就能完成

### 1. 登录并打开仓库

打开：https://github.com/BrickRyan122/BrickRyan122.github.io

确保右上角登录的是自己的 `BrickRyan122` 账号。

### 2. 上传网站文件

这个仓库目前为空。空仓库一般显示 `uploading an existing file`（上传现有文件）的入口，点击它。

如果已经显示文件列表，点击文件列表上方 `Add file → Upload files`。

如果没有上传入口，可先通过 `creating a new file` 创建一个 `README.md` 并提交，再使用 `Add file → Upload files`。

将解压后的以下文件上传到仓库最外层（根目录）：

| 文件 | 用途 |
| --- | --- |
| `index.html` | 网站首页与页面骨架 |
| `style.css` | 排版、配色与手机适配 |
| `app.js` | 导航、搜索、分类与文章显示 |
| `content.js` | 自我介绍、文章与栏目内容 |
| `favicon.svg` | 浏览器标签页的小图标 |
| `.nojekyll` | 让 Pages 直接发布静态文件；部分系统默认隐藏它 |
| `README.md` | 这份操作指南；已有说明文件时可以先保留原文件 |

**上传的是解压后的网页文件，不是 ZIP 压缩包，也不是包着这些文件的外层文件夹。**

上传后应该能直接在仓库文件列表中看到 `index.html`。

若系统没有显示 `.nojekyll`，网站的其余文件仍可使用。也可在 GitHub 中 `Add file → Create new file`，文件名填 `.nojekyll`，内容留空或写一行空白后提交。

### 3. 保存上传

在页面下方写提交说明，例如 `Add my personal journal website`。

个人新仓库可以直接提交到默认分支，点击 `Commit changes`。

完成后记一下文件列表上方的分支名称，一般为 `main`。后面 Pages 要选择这个分支。

### 4. 开启 GitHub Pages

进入仓库上方的 `Settings`，在左侧找到 `Pages`。

在 `Build and deployment` 区域设置：

| 项目 | 选择 |
| --- | --- |
| Source | `Deploy from a branch` |
| Branch | `main`（若实际默认分支不是 main，选择实际分支） |
| Folder | `/(root)` |

点击 `Save`。

GitHub Free 账号需要使用公开仓库来发布 Pages；如果 Pages 页面要求公开仓库，检查仓库当前可见性。

### 5. 打开真正的网站

等待发布完成，回到 `Settings → Pages`，点击 `Visit site`。

根据你的用户名和仓库名，预期地址是：`https://brickryan122.github.io/`。

以上是发布成功后的预期网址，本次交付尚未替你上传或开启 Pages。以 GitHub Pages 页面实际显示的地址和发布状态为准。

### 6. 检查是否发布成功

- 打开首页，看到「在公式与日常之间，寻找自己的坐标」。
- 点击「翻开我的手记」，再打开一篇文章。
- 点击分类，确认列表会切换。
- 点击顶部搜索，输入「公式」，确认能找到示例。
- 用手机打开同一个网址，检查页面显示和「菜单」。

## 常见问题

### 网站显示 404

先看仓库的 `Actions` 页面，确认 Pages 部署任务是否成功。然后检查 Pages 是否选中了正确的分支与 `/(root)`，以及根目录是否存在小写的 `index.html`。首次发布或修改后可能需要等待几分钟。

### 页面没有样式，或者一片空白

检查 `index.html`、`style.css`、`app.js`、`content.js`、`favicon.svg` 是否放在同一层，文件名是否一致。不要只上传 `index.html`。

### 修改后还是旧内容

等待最新部署完成，用 `Ctrl + F5` 刷新，或用无痕窗口检查。如果正文完全不显示，先检查 `content.js` 是否不小心删掉了引号、逗号或括号。

## 以后如何更新

### 改自我介绍

在仓库中打开 `content.js`，点击铅笔按钮。

- `name`：名字。
- `chineseName`：关于页的一句话介绍。
- `intro`：首页大标题，`\n` 表示换行；建议保持两行、每行约 8—10 个汉字。
- `description`：首页简介。
- `now`：当前在做的事。
- `about`：关于页的几段正文。

只改英文引号里面的文字，保留外面的逗号、方括号和花括号。文字中需要使用引号时，优先用中文引号「」或“”。

编辑完成点击 `Commit changes`，网站会在后续 Pages 部署完成后更新。

### 发一篇新文章

打开 `content.js`，在 `posts: [` 后新增下面这段，保留原有文章：

```javascript
    {
      id: 'my-first-real-note',
      title: '我的第一篇正式手记',
      category: '生活',
      date: '2026-10-26',
      draft: false,
      excerpt: '用一两句话介绍这篇文章。',
      body: [
        { type: 'p', text: '这是第一段正文。' },
        { type: 'h2', text: '这是一个小标题' },
        { type: 'p', text: '这里写小标题下面的正文。' },
        { type: 'quote', text: '这里可以放一句你想强调的话。' }
      ]
    },
```

- `id`：每篇文章独一无二的英文标识，用小写字母、数字和短横线；发表后尽量不改，以免旧链接失效。
- `category`：可用「学习」「思考」「生活」，也可以自行增加新分类；筛选按钮自动生成。
- `date`：填真实发表日期，格式为 `年-月-日`。
- `draft: true`：**仍会公开显示**，并标为「示例草稿」。这不是隐藏或私密状态。
- `draft: false`：正式内容，去掉示例草稿标签。
- `featured: true`：设为首页重点文章；建议只为一篇文章设置。
- `body`：`p` 是段落、`h2` 是小标题、`quote` 是强调引用。

文章按 `posts` 数组里的顺序展示；想让新文章靠前，就把它加在前面。首页显示重点文章及另外两篇，所有文章都可以在手记页查看。

### 替换示例文章

第一版有一篇欢迎文章和两篇明确标记的示例草稿。你可以直接把草稿里的标题、简介、日期、正文改成自己的内容，完成后将 `draft` 改为 `false`。欢迎文章的文字也可自由修改。

这版是静态博客，不带登录后台、评论服务或云端编辑器。文章内容保存在 `content.js`；以后可以继续改成 Markdown 写作工作流。

### 调整配色

`style.css` 开头的 `:root` 定义主要颜色：

- `--paper`：纸张背景。
- `--green`：墨绿主色。
- `--accent`：朱红点缀。
- `--ink`：正文字色。

## 接下来可以怎样迭代

先看整体感觉，再依次调整首页标题、自我介绍、栏目名称和第一篇文章。你可以把文字或参考图发给我，我会沿着现有版式继续修改。

后续可按需要增加照片、项目集、Markdown 写作、公式渲染或独立域名。当前版先把个人空间和阅读体验做好。

## 官方帮助

- 上传文件：https://docs.github.com/zh/repositories/working-with-files/managing-files/adding-a-file-to-a-repository
- 配置 Pages：https://docs.github.com/zh/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site

本网站没有收集访客信息的自定义统计脚本，不依赖外部 CDN。
