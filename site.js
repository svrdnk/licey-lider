/* Shared header + footer for all pages.
   Each page should include:
     <div data-site-header data-page="home"></div>
     <div data-site-footer></div>
   then <script src="site.js"></script>
*/

// Netlify Identity — redirect to /admin after login (needed for email confirmation links)
(function () {
  const idScript = document.createElement('script');
  idScript.src = 'https://identity.netlify.com/v1/netlify-identity-widget.js';
  document.head.appendChild(idScript);
  idScript.onload = function () {
    if (window.netlifyIdentity) {
      window.netlifyIdentity.on('init', function (user) {
        if (!user) {
          window.netlifyIdentity.on('login', function () {
            document.location.href = '/admin/';
          });
        }
      });
    }
  };
})();

(function () {
  const PAGES = [
    { key: 'home',      label: 'Головна',                href: 'UA School.html' },
    { key: 'news',      label: 'Новини',                  href: 'Новини.html' },
    { key: 'gallery',   label: 'Галерея',                 href: 'Галерея.html' },
    { key: 'team',      label: 'Команда',                 href: 'Команда.html' },
    { key: 'content',   label: 'Освітній контент',        href: 'Освітній контент.html' },
    { key: 'events',    label: 'Позакласне навчання',     href: 'Позакласне навчання.html' },
    { key: 'family',    label: 'Сімейне навчання',        href: 'Сімейне навчання.html' },
    { key: 'psych',     label: 'Психологічна хвилинка',   href: 'Психологічна хвилинка.html' },
    { key: 'parents',   label: 'Інформація для батьків',  href: 'Інформація для батьків.html' },
    { key: 'links',     label: 'Корисні посилання',       href: 'Корисні посилання.html' },
    { key: 'schedule',  label: 'Розклад',                 href: 'Розклад.html' },
    { key: 'contact',   label: 'Контакти',                href: 'Контакти.html' },
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
          <a class="nav-cta" href="${enc(byKey.schedule.href)}">
            <span class="dot"></span>
            Електронний щоденник
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
            <button class="close-btn" aria-label="Закрити" data-close-drawer>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M4 4l10 10M14 4L4 14" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>
            </button>
          </div>
          ${PAGES.map(p => `<a class="drawer-link ${p.key === activeKey ? 'active' : ''}" href="${enc(p.href)}">${p.label}<span class="arr">→</span></a>`).join('')}
          <a class="drawer-cta" href="${enc(byKey.schedule.href)}">Електронний щоденник</a>
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
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        const d = document.querySelector('[data-drawer].open');
        if (d) { d.classList.remove('open'); document.body.style.overflow = ''; }
      }
    });
  });
})();
