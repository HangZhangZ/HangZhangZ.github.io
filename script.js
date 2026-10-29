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

  // Keep the static player usable while applying the current film metadata.
  fetch('content/video.json?v=20261029-film')
    .then(response => {
      if (!response.ok) throw new Error('Film configuration unavailable');
      return response.json();
    })
    .then(film => {
      if (film.status !== 'published' || typeof film.src !== 'string' || !film.src.trim()) return;
      const source = new URL(film.src, document.baseURI);
      if (!['https:', 'http:'].includes(source.protocol)) return;
      const stage = document.getElementById('film-stage');
      const player = stage.querySelector('video') || document.createElement('video');
      player.controls = true;
      player.playsInline = true;
      player.preload = 'metadata';
      player.setAttribute('controlslist', 'nodownload');
      player.poster = film.poster || 'assets/images/film-poster.webp';
      player.setAttribute('aria-label', film.title || 'Doctoral research film');
      const media = player.querySelector('source') || document.createElement('source');
      const sourceChanged = media.src !== source.href;
      media.src = source.href;
      media.type = film.type || 'video/mp4';
      if (!media.parentElement) player.append(media);
      if (film.captions) {
        const track = player.querySelector('track') || document.createElement('track');
        track.kind = 'captions';
        track.src = film.captions;
        track.srclang = film.language || 'en';
        track.label = film.captionLabel || 'English';
        if (!track.parentElement) player.append(track);
      }
      if (player.parentElement !== stage) stage.replaceChildren(player);
      else if (sourceChanged) player.load();
      stage.classList.add('is-ready');
      document.getElementById('film-caption').textContent = film.description || 'Doctoral research film · Hang Zhang';
    })
    .catch(() => { /* The static player stays usable if metadata is unavailable. */ });
})();
