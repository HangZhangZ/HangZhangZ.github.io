(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !reduceMotion.matches) {
    document.documentElement.classList.add('js');
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.07 });
    reveals.forEach(el => observer.observe(el));
    // Content remains accessible if a visitor switches their motion preference.
    reduceMotion.addEventListener('change', () => {
      if (reduceMotion.matches) document.documentElement.classList.remove('js');
    });
  }

  const navigation = [...document.querySelectorAll('nav a[href^="#"]')];
  if ('IntersectionObserver' in window) {
    const sectionObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        navigation.forEach(link => {
          if (link.hash === `#${entry.target.id}`) link.setAttribute('aria-current', 'location');
          else link.removeAttribute('aria-current');
        });
      });
    }, { rootMargin: '-15% 0px -65% 0px' });
    sectionObserver.observe(document.getElementById('top'));
    navigation.forEach(link => {
      const section = document.querySelector(link.hash);
      if (section) sectionObserver.observe(section);
    });
  }

  const heroImage = document.querySelector('.hero-figure img');
  let scheduled = false;
  window.addEventListener('scroll', () => {
    if (scheduled || reduceMotion.matches || window.innerWidth < 701) return;
    scheduled = true;
    requestAnimationFrame(() => {
      if (window.scrollY < window.innerHeight) {
        heroImage.style.setProperty('--depth', `${Math.min(window.scrollY * 0.065, 45)}px`);
      }
      scheduled = false;
    });
  }, { passive: true });
  document.getElementById('year').textContent = new Date().getFullYear();

  // A finalized film can be published by updating content/video.json.
  // Until then the semantic, non-interactive preparation notice stays visible.
  fetch('content/video.json')
    .then(response => {
      if (!response.ok) throw new Error('Film configuration unavailable');
      return response.json();
    })
    .then(film => {
      if (film.status !== 'published' || typeof film.src !== 'string' || !film.src.trim()) return;
      const source = new URL(film.src, document.baseURI);
      if (!['https:', 'http:'].includes(source.protocol)) return;
      const player = document.createElement('video');
      player.controls = true;
      player.playsInline = true;
      player.preload = 'metadata';
      player.poster = film.poster || 'assets/images/film-poster.webp';
      player.setAttribute('aria-label', film.title || 'Doctoral research film');
      const media = document.createElement('source');
      media.src = source.href;
      media.type = film.type || 'video/mp4';
      player.append(media);
      if (film.captions) {
        const track = document.createElement('track');
        track.kind = 'captions';
        track.src = film.captions;
        track.srclang = film.language || 'en';
        track.label = film.captionLabel || 'English';
        player.append(track);
      }
      const fallback = document.createElement('a');
      fallback.href = source.href;
      fallback.textContent = 'Open the research film';
      player.append(fallback);
      const stage = document.getElementById('film-stage');
      stage.replaceChildren(player);
      stage.classList.add('is-ready');
      document.getElementById('film-caption').textContent = film.description || 'Doctoral research film · Hang Zhang';
    })
    .catch(() => { /* Keep the preparation notice when offline or unavailable. */ });
})();
