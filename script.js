document.addEventListener('DOMContentLoaded', () => {

  // ── Read progress bar ──
  const progressBar = document.getElementById('read-progress');
  if (progressBar) {
    window.addEventListener('scroll', () => {
      const total = document.body.scrollHeight - window.innerHeight;
      progressBar.style.width = total > 0 ? (window.scrollY / total * 100) + '%' : '0%';
    }, { passive: true });
  }

  // ── Nav scroll class ──
  const nav = document.querySelector('.site-nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 40);
    }, { passive: true });
  }

  // ── Mobile menu ──
  const burgerBtn  = document.getElementById('burger-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  if (burgerBtn && mobileMenu) {
    burgerBtn.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.toggle('open');
      document.body.style.overflow = isOpen ? 'hidden' : '';
      burgerBtn.setAttribute('aria-expanded', isOpen);
    });
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
        burgerBtn.setAttribute('aria-expanded', false);
      });
    });
  }

  // ── Active nav tab on scroll ──
  const navLinks = document.querySelectorAll('.nav-tabs a[href^="#"]');
  const sections = Array.from(navLinks)
    .map(a => document.querySelector(a.getAttribute('href')))
    .filter(Boolean);

  if (sections.length && navLinks.length) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navLinks.forEach(a => a.classList.remove('active'));
          const link = document.querySelector(`.nav-tabs a[href="#${entry.target.id}"]`);
          if (link) link.classList.add('active');
        }
      });
    }, { rootMargin: '-40% 0px -55% 0px' });
    sections.forEach(s => observer.observe(s));
  }

  // ── VPN card filter ──
  const filterBtns = document.querySelectorAll('.filter-btn');
  const vpnCards   = document.querySelectorAll('.vpn-card[data-tags]');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      vpnCards.forEach(card => {
        if (filter === 'all') {
          card.style.display = '';
        } else {
          const tags = (card.dataset.tags || '').split(' ');
          card.style.display = tags.includes(filter) ? '' : 'none';
        }
      });
    });
  });

  // ── VPN card expand/collapse ──
  document.querySelectorAll('.vpn-expand-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.dataset.target;
      const extra = document.getElementById(targetId);
      if (!extra) return;
      const isOpen = extra.classList.toggle('open');
      btn.classList.toggle('open', isOpen);
      const arrow = btn.querySelector('.arrow');
      if (arrow) arrow.textContent = isOpen ? '↑' : '↓';
    });
  });

  // ── Setup tabs (ПК / Телефон / Расширение) ──
  const installTabs = document.querySelectorAll('#install-tabs .pill-tab');
  const tabContents = document.querySelectorAll('.tab-content');

  installTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      installTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const targetId = tab.dataset.tab;
      tabContents.forEach(content => {
        content.classList.toggle('active', content.id === targetId);
      });
    });
  });

  // ── Fade-up on scroll ──
  if ('IntersectionObserver' in window) {
    const fadeEls = document.querySelectorAll(
      '.vpn-card, .review-card, .bento-card, .info-card, ' +
      '.platform-card, .free-card, .streamer-card, .hero-side-card'
    );
    const fadeObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          fadeObserver.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -40px 0px', threshold: 0.04 });

    fadeEls.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(18px)';
      el.style.transition = 'opacity 0.45s ease, transform 0.45s ease';
      fadeObserver.observe(el);
    });
  }

  // ── Hero fade-up ──
  document.querySelectorAll('.fade-up').forEach(el => {
    el.classList.add('visible');
  });

  // ── Smooth anchor scroll ──
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const href = anchor.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      const navHeight = nav?.offsetHeight || 54;
      const top = target.getBoundingClientRect().top + window.scrollY - navHeight - 12;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

});
