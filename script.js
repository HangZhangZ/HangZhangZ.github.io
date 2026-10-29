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

  const heroVideo = document.getElementById('hero-video');
  const motionButton = document.getElementById('hero-motion');
  let motionPausedByUser = false;
  let heroInView = true;
  const syncMotionButton = () => {
    const paused = heroVideo.paused;
    motionButton.setAttribute('aria-label', paused ? 'Play background video' : 'Pause background video');
    document.getElementById('hero-motion-label').textContent = paused ? 'Play motion' : 'Pause motion';
    document.getElementById('hero-motion-icon').textContent = paused ? '▶' : 'Ⅱ';
  };
  const playBackdrop = () => {
    heroVideo.muted = true;
    heroVideo.play().catch(syncMotionButton);
  };
  motionButton.hidden = false;
  heroVideo.addEventListener('play', syncMotionButton);
  heroVideo.addEventListener('pause', syncMotionButton);
  motionButton.addEventListener('click', () => {
    if (heroVideo.paused) {
      motionPausedByUser = false;
      playBackdrop();
    } else {
      motionPausedByUser = true;
      heroVideo.pause();
    }
    syncMotionButton();
  });
  reduceMotion.addEventListener('change', () => {
    if (reduceMotion.matches) heroVideo.pause();
    else if (heroInView && !motionPausedByUser) playBackdrop();
    syncMotionButton();
  });
  if ('IntersectionObserver' in window) {
    const heroObserver = new IntersectionObserver(entries => {
      heroInView = entries[0].isIntersecting;
      if (!heroInView) heroVideo.pause();
      else if (!reduceMotion.matches && !motionPausedByUser) playBackdrop();
    }, { threshold: 0.1 });
    heroObserver.observe(document.getElementById('top'));
  }
  if (!reduceMotion.matches) playBackdrop();
  syncMotionButton();
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
