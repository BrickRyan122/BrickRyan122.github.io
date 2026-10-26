(() => {
  'use strict';
  const data = window.JOURNAL;
  const main = document.getElementById('main');
  const dialog = document.getElementById('search-dialog');
  const searchInput = document.getElementById('search-input');
  const results = document.getElementById('search-results');
  const menu = document.querySelector('.mobile-nav');
  const menuToggle = document.querySelector('.menu-toggle');
  let currentFilter = '全部';
  const escape = (value) => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const safeUrl = (value) => /^https:\/\//i.test(value) ? value : 'https://github.com/BrickRyan122';
  const articleUrl = (post) => '#/article/' + encodeURIComponent(post.id);
  const readingTime = (post) => Math.max(1, Math.ceil(post.body.map(b => b.text).join('').length / 400));
  const meta = (post) => `<div class="post-meta"><span>${escape(post.category)}</span><span class="date">${escape(post.date.replaceAll('-', '.'))}</span>${post.draft ? '<span class="draft-badge">示例草稿</span>' : ''}</div>`;
  const postLink = (post, className) => `<a class="${className}" href="${articleUrl(post)}">${meta(post)}<h3>${escape(post.title)}</h3><p>${escape(post.excerpt)}</p><span class="card-arrow" aria-hidden="true">↗</span></a>`;
  function renderHome() {
    main.append(document.getElementById('home-template').content.cloneNode(true));
    const heroTitle = main.querySelector('h1');
    const underline = heroTitle.querySelector('svg').cloneNode(true);
    const lines = data.intro.split('\n');
    heroTitle.replaceChildren(document.createTextNode(lines[0]));
    lines.slice(1).forEach(line => { heroTitle.append(document.createElement('br')); const span = document.createElement('span'); span.textContent = line; heroTitle.append(span); });
    heroTitle.append(underline);
    main.querySelector('.hero-description').textContent = data.description;
    const featured = data.posts.find(post => post.featured) || data.posts[0];
    const container = main.querySelector('.home-posts');
    if (featured) {
      container.innerHTML = `<a class="feature-card" href="${articleUrl(featured)}"><span class="feature-ornament" aria-hidden="true">✳</span>${meta(featured)}<h3>${escape(featured.title)}</h3><p>${escape(featured.excerpt)}</p><div class="card-bottom"><span>EDITOR'S NOTE / ${readingTime(featured)} MIN READ</span><span class="card-arrow" aria-hidden="true">↗</span></div></a><div class="side-posts">${data.posts.filter(p => p !== featured).slice(0, 2).map(p => postLink(p, 'compact-post')).join('')}</div>`;
    } else { container.innerHTML = '<p class="empty-state">第一篇手记，正在路上。</p>'; }
    const nowList = main.querySelector('#now-list');
    data.now.forEach(text => { const li = document.createElement('li'); li.textContent = text; nowList.append(li); });
  }
  function renderArchive() {
    const categories = ['全部', ...new Set(data.posts.map(p => p.category))];
    if (!categories.includes(currentFilter)) currentFilter = '全部';
    main.innerHTML = `<section class="page-intro"><span class="section-kicker">THE JOURNAL / 手记</span><h1>想法，慢慢成形。</h1><p>学习里的追问，书页间的停顿，和日常生活的切片。<br>把它们写下来，也留给未来的自己。</p></section><section aria-label="文章列表"><div class="archive-bar"><div class="filters" aria-label="按分类筛选">${categories.map(c => `<button class="filter" type="button" data-filter="${escape(c)}" aria-pressed="${c === currentFilter}">${escape(c)}</button>`).join('')}</div><span class="article-count" aria-live="polite"></span></div><div id="archive-posts"></div><div class="archive-bottom">TO BE CONTINUED · 下一页，正在发生。</div></section>`;
    const update = () => {
      const posts = data.posts.filter(p => currentFilter === '全部' || p.category === currentFilter);
      main.querySelector('.article-count').textContent = `${String(posts.length).padStart(2, '0')} ENTRIES`;
      main.querySelector('#archive-posts').innerHTML = posts.map((post, index) => `<a class="post-row" href="${articleUrl(post)}"><span class="row-number">${String(index + 1).padStart(2, '0')}</span><div>${meta(post)}<h3>${escape(post.title)}</h3><p>${escape(post.excerpt)}</p></div><span class="card-arrow" aria-hidden="true">↗</span></a>`).join('') || '<p class="empty-state">这个分类还没有文章。</p>';
      main.querySelectorAll('.filter').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.filter === currentFilter)));
    };
    main.querySelectorAll('.filter').forEach(button => button.addEventListener('click', () => { currentFilter = button.dataset.filter; update(); }));
    update();
  }
  function renderAbout() {
    main.innerHTML = `<section class="page-intro"><span class="section-kicker">ABOUT / 关于我</span><h1>你好，我是 ${escape(data.name)}<span style="color:var(--accent)">.</span></h1><p>${escape(data.chineseName)}</p></section><section class="about-layout" aria-label="关于 Ryan"><div class="about-copy">${data.about.map(p => `<p>${escape(p)}</p>`).join('')}<div class="about-tags"><span>化学工程</span><span>阅读与思考</span><span>运动与生活</span><span>保持好奇</span></div><span class="about-signature">${escape(data.name)}</span></div><aside class="about-note"><span class="section-kicker">A LITTLE REMINDER</span><h2>Always a student.</h2><ul>${data.now.map(text => `<li>${escape(text)}</li>`).join('')}</ul><a class="text-link" href="${escape(safeUrl(data.github))}" target="_blank" rel="noopener noreferrer">去我的 GitHub 坐坐 ↗</a></aside></section>`;
  }
  function renderArticle(id) {
    const post = data.posts.find(p => p.id === id);
    if (!post) { renderNotFound(); return; }
    document.title = post.title + ' — ' + data.name;
    let headingIndex = 0;
    const toc = post.body.filter(b => b.type === 'h2');
    const next = data.posts[(data.posts.indexOf(post) + 1) % data.posts.length];
    main.innerHTML = `<div class="article-layout"><aside class="article-side"><a href="#/journal" class="text-link">← 返回手记</a><h2>CONTENTS</h2><nav class="article-toc" aria-label="本文目录">${toc.map((b, i) => `<a href="#section-${i}" data-section="section-${i}">${escape(b.text)}</a>`).join('')}</nav></aside><article><header class="article-header">${meta(post)}<h1>${escape(post.title)}</h1><p class="article-excerpt">${escape(post.excerpt)}</p></header>${post.draft ? '<p class="draft-notice">示例草稿：这篇文字用于展示网站的阅读样式，后续将替换为自己的正式内容。</p>' : ''}<div class="article-body">${post.body.map(b => b.type === 'h2' ? `<h2 id="section-${headingIndex++}">${escape(b.text)}</h2>` : b.type === 'quote' ? `<blockquote>${escape(b.text)}</blockquote>` : `<p>${escape(b.text)}</p>`).join('')}</div><div class="article-end"><span>写于 ${escape(post.date)} · 约 ${readingTime(post)} 分钟阅读</span><button class="text-link" id="copy-article" type="button">复制文章链接 ↗</button></div>${next && next !== post ? `<a class="next-post" href="${articleUrl(next)}"><span>接着读 / NEXT ENTRY${next.draft ? ' · 示例草稿' : ''}</span><h3>${escape(next.title)} ↗</h3></a>` : ''}</article></div>`;
    main.querySelectorAll('[data-section]').forEach(a => a.addEventListener('click', event => { event.preventDefault(); document.getElementById(a.dataset.section)?.scrollIntoView({behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'}); }));
    main.querySelector('#copy-article').addEventListener('click', async (event) => {
      const button = event.currentTarget;
      try { await navigator.clipboard.writeText(location.href); button.textContent = '链接已复制 ✓'; }
      catch { button.textContent = '请复制浏览器地址栏中的链接'; }
      setTimeout(() => { if (button.isConnected) button.textContent = '复制文章链接 ↗'; }, 3000);
    });
  }
  function renderNotFound() {
    document.title = '这页还没有写下 — ' + data.name;
    main.innerHTML = '<section class="not-found"><span class="section-kicker">404 / NOT FOUND</span><h1>这页，还没有写下。</h1><p>也许链接有误，或者这篇手记已经移动。</p><a href="#/journal" class="button-dark">回到全部手记 ↗</a></section>';
  }
  function route() {
    const hash = location.hash || '#/';
    const isArticle = hash.startsWith('#/article/');
    document.title = data.name + ' — 好奇心的栖息地';
    document.querySelector('meta[name="description"]').content = data.description;
    main.replaceChildren();
    menu.hidden = true; menuToggle.setAttribute('aria-expanded', 'false');
    document.querySelectorAll('[data-nav]').forEach(a => {
      const active = a.dataset.nav === (isArticle || hash === '#/journal' ? 'journal' : hash === '#/about' ? 'about' : 'home');
      if (active) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current');
    });
    if (hash === '#/' || hash === '#') renderHome();
    else if (hash === '#/journal') renderArchive();
    else if (hash === '#/about') renderAbout();
    else if (isArticle) { try { renderArticle(decodeURIComponent(hash.slice(10))); } catch { renderNotFound(); } }
    else renderNotFound();
    window.scrollTo({top: 0, behavior: 'instant'});
    if (dialog.open) dialog.close();
  }
  function search() {
    const query = searchInput.value.trim().toLocaleLowerCase();
    const posts = data.posts.filter(p => !query || [p.title, p.excerpt, p.category, ...p.body.map(b => b.text)].join(' ').toLocaleLowerCase().includes(query));
    results.innerHTML = posts.length ? posts.map(p => `<a class="search-result" href="${articleUrl(p)}"><span>${escape(p.category)} / ${escape(p.date)}${p.draft ? ' · 示例草稿' : ''}</span><h3>${escape(p.title)} ↗</h3></a>`).join('') : '<p class="empty-state">暂时没有找到。试试更短的词，或者换一个关键词。</p>';
  }
  function openSearch() { dialog.showModal(); searchInput.value = ''; search(); searchInput.focus(); }
  document.querySelector('.search-trigger').addEventListener('click', openSearch);
  document.getElementById('close-search').addEventListener('click', () => dialog.close());
  results.addEventListener('click', event => { if (event.target.closest('a')) dialog.close(); });
  dialog.addEventListener('click', event => { if (event.target === dialog) { const r = dialog.getBoundingClientRect(); if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) dialog.close(); } });
  searchInput.addEventListener('input', search);
  document.addEventListener('keydown', event => { if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') { event.preventDefault(); if (!dialog.open) openSearch(); else dialog.close(); } });
  const isMac = /Mac|iPhone|iPad/.test(navigator.platform);
  document.querySelector('kbd').textContent = isMac ? '⌘ K' : 'Ctrl K';
  menuToggle.addEventListener('click', () => { menu.hidden = !menu.hidden; menuToggle.setAttribute('aria-expanded', String(!menu.hidden)); });
  menu.addEventListener('click', event => { if (event.target.closest('a')) { menu.hidden = true; menuToggle.setAttribute('aria-expanded', 'false'); } });
  document.getElementById('back-top').addEventListener('click', () => window.scrollTo({top: 0, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'}));
  document.getElementById('year').textContent = new Date().getFullYear();
  document.getElementById('footer-github').href = safeUrl(data.github);
  document.querySelector('.skip').addEventListener('click', event => { event.preventDefault(); main.focus(); main.scrollIntoView(); });
  window.addEventListener('hashchange', () => { route(); main.focus({preventScroll:true}); });
  route();
})();
