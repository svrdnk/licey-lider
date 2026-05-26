/* Shared header + footer for all pages.
   Each page should include:
     <div data-site-header data-page="home"></div>
     <div data-site-footer></div>
   then <script src="site.js"></script>
*/

(function () {
  // Early theme init — runs immediately so the toggle button + drawer render in the right state.
  // (The page itself avoids a flash via an inline <script> in <head>.)
  try {
    if (!document.documentElement.getAttribute('data-theme')) {
      const stored = localStorage.getItem('theme');
      document.documentElement.setAttribute('data-theme', stored === 'dark' ? 'dark' : 'light');
    }
  } catch (e) {}

  const SUN_SVG = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>';
  const MOON_SVG = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>';
  const THEME_BTN = `<button class="theme-toggle" type="button" aria-label="Перемкнути тему" data-theme-toggle><span class="sun">${SUN_SVG}</span><span class="moon">${MOON_SVG}</span></button>`;
  const PAGES = [
    { key: 'home',      label: 'Головна',                href: 'index.html' },
    { key: 'news',      label: 'Новини',                  href: 'news.html' },
    { key: 'gallery',   label: 'Галерея',                 href: 'gallery.html' },
    { key: 'team',      label: 'Команда',                 href: 'team.html' },
    { key: 'content',   label: 'Освітній контент',        href: 'education.html' },
    { key: 'events',    label: 'Позакласне навчання',     href: 'extracurricular.html' },
    { key: 'family',    label: 'Сімейне навчання',        href: 'family.html' },
    { key: 'psych',     label: 'Психологічна хвилинка',   href: 'psychology.html' },
    { key: 'parents',   label: 'Інформація для батьків',  href: 'parents.html' },
    { key: 'links',     label: 'Корисні посилання',       href: 'links.html' },
    { key: 'schedule',  label: 'Розклад',                 href: 'schedule.html' },
    { key: 'contact',   label: 'Контакти',                href: 'contacts.html' },
  ];
  const byKey = Object.fromEntries(PAGES.map(p => [p.key, p]));
  const enc = (s) => encodeURI(s);

  function renderHeader(activeKey) {
    const items = [
      { key: 'parents',  label: 'Про нас' },
      { key: 'content',  label: 'Навчання' },
      { key: 'gallery',  label: 'Галерея' },
      { key: 'contact',  label: 'Контакти' },
    ];
    return `
      <div class="nav-shell">
        <nav class="nav" aria-label="Головна навігація">
          <a class="brand" href="${enc(byKey.home.href)}">
            <span class="brand-mark" aria-hidden="true">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M3 13.5L10 4l7 9.5H3z" fill="#2E3B4E"/>
                <circle cx="10" cy="14" r="1.6" fill="#E3C993"/>
              </svg>
            </span>
            <span class="brand-name">Ліцей «Лідер»<small>Пісківка</small></span>
          </a>
          <ul class="menu">
            ${items.map(i => `<li><a href="${enc(byKey[i.key].href)}" class="${i.key === activeKey ? 'active' : ''}">${i.label}</a></li>`).join('')}
          </ul>
          ${THEME_BTN}
          <a class="nav-cta" href="${enc(byKey.schedule.href)}">
            <span class="dot"></span>
            Розклад занять
          </a>
          <button class="nav-burger" aria-label="Меню" data-open-drawer>
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><path d="M3 6h16M3 11h16M3 16h16" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>
          </button>
        </nav>
      </div>
    `;
  }

  function renderDrawer(activeKey) {
    return `
      <div class="mobile-drawer" data-drawer>
        <div class="panel">
          <div class="top">
            <a class="brand" href="${enc(byKey.home.href)}" style="font-size:16px">
              <span class="brand-mark" aria-hidden="true">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M3 13.5L10 4l7 9.5H3z" fill="#2E3B4E"/><circle cx="10" cy="14" r="1.6" fill="#E3C993"/></svg>
              </span>
              <span>Ліцей «Лідер»</span>
            </a>
            <div style="display:flex;gap:8px;align-items:center">
              ${THEME_BTN}
              <button class="close-btn" aria-label="Закрити" data-close-drawer>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M4 4l10 10M14 4L4 14" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>
              </button>
            </div>
          </div>
          ${PAGES.map(p => `<a class="drawer-link ${p.key === activeKey ? 'active' : ''}" href="${enc(p.href)}">${p.label}<span class="arr">→</span></a>`).join('')}
          <a class="drawer-cta" href="${enc(byKey.schedule.href)}">Розклад занять</a>
        </div>
      </div>
    `;
  }

  function renderFooter() {
    const cols = [
      { h: 'Навчання', keys: ['content', 'schedule', 'family', 'events'] },
      { h: 'Спільнота', keys: ['team', 'news', 'gallery', 'psych'] },
      { h: 'Інформація', keys: ['parents', 'links', 'contact'] },
    ];
    return `
      <footer class="footer-big">
        <div class="wrap">
          <div class="footer-grid">
            <div class="intro">
              <a class="brand" href="${enc(byKey.home.href)}" style="font-size:18px">
                <span class="brand-mark" aria-hidden="true">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M3 13.5L10 4l7 9.5H3z" fill="#2E3B4E"/>
                    <circle cx="10" cy="14" r="1.6" fill="#E3C993"/>
                  </svg>
                </span>
                <span>Ліцей «Лідер»</span>
              </a>
              <p>Пісківський ліцей «Лідер» Пісківської селищної ради Бучанського району Київської області. Простір, де народжується майбутнє.</p>
            </div>
            ${cols.map(c => `
              <div>
                <h4>${c.h}</h4>
                <ul>
                  ${c.keys.map(k => `<li><a href="${enc(byKey[k].href)}">${byKey[k].label}</a></li>`).join('')}
                </ul>
              </div>
            `).join('')}
          </div>
          <div class="footer-bot">
            <span>© 2026 Пісківський ліцей «Лідер»</span>
            <span>вул. Ніни Сосніної, 12-А · смт Пісківка</span>
          </div>
        </div>
      </footer>
    `;
  }

  // Inject editable texts from page_texts.json into [data-text] elements
  document.addEventListener('DOMContentLoaded', () => {
    fetch('/content/page_texts.json')
      .then(r => r.json())
      .then(texts => {
        document.querySelectorAll('[data-text]').forEach(el => {
          const key = el.getAttribute('data-text');
          if (texts[key] !== undefined && texts[key] !== '') {
            el.textContent = texts[key];
          }
        });
      })
      .catch(() => {});
  });

  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('[data-site-header]').forEach(el => {
      const activeKey = el.getAttribute('data-page');
      el.outerHTML = renderHeader(activeKey);
      // append drawer to body
      document.body.insertAdjacentHTML('beforeend', renderDrawer(activeKey));
    });
    document.querySelectorAll('[data-site-footer]').forEach(el => {
      el.outerHTML = renderFooter();
    });

    // drawer behavior
    document.addEventListener('click', (e) => {
      const opener = e.target.closest('[data-open-drawer]');
      const closer = e.target.closest('[data-close-drawer]');
      const drawer = document.querySelector('[data-drawer]');
      if (!drawer) return;
      if (opener) { drawer.classList.add('open'); document.body.style.overflow = 'hidden'; }
      if (closer || (e.target === drawer)) { drawer.classList.remove('open'); document.body.style.overflow = ''; }
    });
    // theme toggle
    document.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-theme-toggle]');
      if (!btn) return;
      const cur = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
      const next = cur === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      try { localStorage.setItem('theme', next); } catch (err) {}
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        const d = document.querySelector('[data-drawer].open');
        if (d) { d.classList.remove('open'); document.body.style.overflow = ''; }
      }
    });
  });
})();
