/* ================================================
   UNIVERSE BACKGROUND
================================================ */
function initUniverse() {
  const container = document.getElementById('universe');

  /* ---- Milky Way band ---- */
  const band = document.createElement('div');
  band.className = 'milky-way';
  band.style.cssText = `
    left: -10%; top: 15%;
    width: 120%; height: 55%;
    background: linear-gradient(
      105deg,
      transparent 0%,
      rgba(90, 40, 110, 0.07) 20%,
      rgba(160, 80, 140, 0.1) 35%,
      rgba(200, 140, 180, 0.08) 50%,
      rgba(120, 60, 100, 0.07) 65%,
      transparent 100%
    );
    transform: rotate(-18deg);
    transform-origin: center;
    border-radius: 0;
  `;
  container.appendChild(band);

  /* ---- Deep nebulae (large, blurry, far away) ---- */
  const deepNebulae = [
    { x: 72, y: 18, w: 700, h: 500, color: 'rgba(130, 50, 160, 0.09)', blur: 80 },
    { x: 22, y: 60, w: 650, h: 450, color: 'rgba(160, 55,  80, 0.08)', blur: 90 },
    { x: 55, y: 75, w: 600, h: 400, color: 'rgba( 80, 40, 130, 0.07)', blur: 70 },
    { x: 10, y: 20, w: 500, h: 350, color: 'rgba(190, 100,  60, 0.06)', blur: 85 },
  ];

  deepNebulae.forEach(n => {
    const el = document.createElement('div');
    el.className = 'nebula';
    el.style.cssText = `
      left: ${n.x}%; top: ${n.y}%;
      width: ${n.w}px; height: ${n.h}px;
      background: radial-gradient(ellipse, ${n.color} 0%, transparent 68%);
      transform: translate(-50%, -50%);
      filter: blur(${n.blur}px);
    `;
    container.appendChild(el);
  });

  /* ---- Mid nebulae (medium, more defined) ---- */
  const midNebulae = [
    { x: 60, y: 30, w: 320, h: 220, color: 'rgba(200, 100, 160, 0.11)', blur: 35 },
    { x: 30, y: 45, w: 280, h: 200, color: 'rgba(100,  60, 180, 0.1)',  blur: 30 },
    { x: 80, y: 65, w: 260, h: 180, color: 'rgba(220, 130,  80, 0.09)', blur: 28 },
    { x: 15, y: 80, w: 300, h: 180, color: 'rgba(160,  70, 120, 0.1)',  blur: 32 },
    { x: 50, y: 12, w: 240, h: 160, color: 'rgba( 80,  50, 150, 0.09)', blur: 25 },
  ];

  midNebulae.forEach(n => {
    const el = document.createElement('div');
    el.className = 'nebula';
    el.style.cssText = `
      left: ${n.x}%; top: ${n.y}%;
      width: ${n.w}px; height: ${n.h}px;
      background: radial-gradient(ellipse, ${n.color} 0%, transparent 65%);
      transform: translate(-50%, -50%);
      filter: blur(${n.blur}px);
    `;
    container.appendChild(el);
  });

  /* ---- Stars ---- */
  const isMobile = window.innerWidth < 600;
  const total    = isMobile ? 160 : 320;

  for (let i = 0; i < total; i++) {
    const star = document.createElement('span');
    star.className = 'star';

    // varied sizes — most tiny, few large
    const r    = Math.random();
    const size = r < 0.6  ? Math.random() * 0.9 + 0.3   // tiny  0.3–1.2px
               : r < 0.88 ? Math.random() * 1.0 + 1.2   // mid   1.2–2.2px
               :             Math.random() * 1.2 + 2.2;  // bright 2.2–3.4px

    const x      = Math.random() * 100;
    const y      = Math.random() * 100;
    const dur    = (Math.random() * 5 + 2).toFixed(2);
    const delay  = (Math.random() * 9).toFixed(2);
    const minOp  = (Math.random() * 0.08 + 0.02).toFixed(2);
    const maxOp  = (size > 2 ? Math.random() * 0.4 + 0.55   // bright stars shine more
                             : Math.random() * 0.45 + 0.2).toFixed(2);

    const rnd   = Math.random();
    const color = rnd < 0.10 ? 'rgba(200,170,100,0.95)'  // warm gold
                : rnd < 0.18 ? 'rgba(200,130,130,0.9)'   // soft rose
                : rnd < 0.24 ? 'rgba(160,170,220,0.9)'   // cold blue-white
                :               'rgba(240,225,200,0.95)'; // natural white

    const glow  = size > 2 ? `0 0 ${(size * 4).toFixed(0)}px ${color}, 0 0 ${(size * 8).toFixed(0)}px ${color}`
                           : `0 0 ${(size * 3).toFixed(0)}px ${color}`;

    star.style.cssText = `
      left: ${x}%; top: ${y}%;
      width: ${size.toFixed(1)}px; height: ${size.toFixed(1)}px;
      background: ${color};
      box-shadow: ${glow};
      --dur: ${dur}s; --delay: ${delay}s;
      --min-op: ${minOp}; --max-op: ${maxOp};
    `;
    container.appendChild(star);
  }

  /* ---- Shooting stars ---- */
  for (let i = 0; i < 8; i++) {
    const el = document.createElement('div');
    el.className = 'shooting-star';
    const dur   = (Math.random() * 1.4 + 1.2).toFixed(2);
    const delay = (Math.random() * 6 + 2).toFixed(2);
    const angle = (Math.random() * 18 - 9).toFixed(1);
    const dy    = (Math.random() * 90 + 30).toFixed(0);
    el.style.cssText = `
      left: ${(Math.random() * 60)}%;
      top:  ${(Math.random() * 50)}%;
      --dur: ${dur}s; --delay: ${delay}s;
      --angle: ${angle}deg; --dy: ${dy}px;
    `;
    container.appendChild(el);
  }
}

/* ================================================
   BACKGROUND AUDIO
================================================ */
function initBgAudio() {
  const audio   = document.getElementById('bg-audio');
  const btn     = document.getElementById('audio-btn');
  const label   = btn.querySelector('.audio-label');
  let userPaused = false;

  function play() {
    audio.play().catch(() => {});
    btn.classList.add('playing');
    label.textContent = 'pausar';
  }

  function pause() {
    audio.pause();
    btn.classList.remove('playing');
    label.textContent = 'reproducir';
  }

  // Button toggle
  btn.addEventListener('click', () => {
    if (audio.paused) {
      userPaused = false;
      play();
    } else {
      userPaused = true;
      pause();
    }
  });

  // Auto-play on first interaction anywhere on the page
  function handleFirstInteraction() {
    if (audio.paused && !userPaused) play();
    document.removeEventListener('click', handleFirstInteraction);
    document.removeEventListener('touchstart', handleFirstInteraction);
  }
  document.addEventListener('click',      handleFirstInteraction);
  document.addEventListener('touchstart', handleFirstInteraction);

  // Fade out when scrolling past gallery section, fade in when back
  const hero    = document.getElementById('hero');
  const gallery = document.getElementById('gallery');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting && !userPaused) {
        // Only act if audio was paused by the fade-out (not just scrolling between hero↔gallery)
        if (audio.paused) {
          clearInterval(audio._fadeTimer);
          audio.volume = 0;
          audio.play().catch(() => {});
          fadeVolume(audio, 0, 1, 1200);
          btn.classList.add('playing');
          label.textContent = 'pausar';
        }
      }
    });
  }, { threshold: 0.1 });

  // Observer for sections beyond gallery — fade out then pause
  const cassette = document.getElementById('cassette-section');
  const fadeObserver = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting && !userPaused && !audio.paused) {
        // Fade to 0 then pause — currentTime is preserved on pause
        fadeVolume(audio, audio.volume, 0, 3000, () => {
          audio.pause();
          btn.classList.remove('playing');
          label.textContent = 'reproducir';
        });
      }
    });
  }, { threshold: 0.05 });

  observer.observe(hero);
  observer.observe(gallery);
  fadeObserver.observe(cassette);

  function fadeVolume(audioEl, from, to, duration, onComplete) {
    const steps    = 60;
    const interval = duration / steps;
    const delta    = (to - from) / steps;
    let   current  = from;
    let   count    = 0;
    clearInterval(audioEl._fadeTimer);
    audioEl._fadeTimer = setInterval(() => {
      count++;
      current = Math.min(1, Math.max(0, current + delta));
      audioEl.volume = current;
      if (count >= steps) {
        clearInterval(audioEl._fadeTimer);
        if (onComplete) onComplete();
      }
    }, interval);
  }
}

/* ================================================
   CAROUSEL
================================================ */
function initCarousel() {
  const track    = document.getElementById('carousel-track');
  const slides   = Array.from(track.querySelectorAll('.carousel-slide'));
  const dotsContainer = document.getElementById('carousel-dots');
  const btnPrev  = document.getElementById('carousel-prev');
  const btnNext  = document.getElementById('carousel-next');
  const total    = slides.length;
  let current    = 0;

  // build dots
  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('aria-label', `Foto ${i + 1}`);
    dot.addEventListener('click', () => goTo(i));
    dotsContainer.appendChild(dot);
  });

  const dots = Array.from(dotsContainer.querySelectorAll('.carousel-dot'));

  function goTo(index) {
    slides[current].classList.remove('active');
    dots[current].classList.remove('active');
    current = (index + total) % total;
    track.style.transform = `translateX(-${current * 100}%)`;
    slides[current].classList.add('active');
    dots[current].classList.add('active');
  }

  // mark first slide active
  slides[0].classList.add('active');

  btnPrev.addEventListener('click', () => goTo(current - 1));
  btnNext.addEventListener('click', () => goTo(current + 1));

  // swipe support
  let touchStartX = 0;
  track.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
  track.addEventListener('touchend',   e => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) goTo(diff > 0 ? current + 1 : current - 1);
  });

  // keyboard arrows when gallery is in view
  document.addEventListener('keydown', e => {
    const gallery = document.getElementById('gallery');
    const rect = gallery.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      if (e.key === 'ArrowRight') goTo(current + 1);
      if (e.key === 'ArrowLeft')  goTo(current - 1);
    }
  });
}

/* ================================================
   SCROLL REVEAL
================================================ */
function initReveal() {
  const obs = new IntersectionObserver(
    entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );
  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
}

/* ================================================
   NAV DOTS
================================================ */
function initNavDots() {
  const sections = document.querySelectorAll('.section');
  const dots     = document.querySelectorAll('.nav-dot');

  const obs = new IntersectionObserver(
    entries => entries.forEach(e => {
      if (e.isIntersecting) {
        dots.forEach(d => d.classList.remove('active'));
        const dot = document.querySelector(`.nav-dot[href="#${e.target.id}"]`);
        if (dot) dot.classList.add('active');
      }
    }),
    { threshold: 0.5 }
  );

  sections.forEach(s => obs.observe(s));
}

/* ================================================
   CASSETTE PLAYER
================================================ */
let inserted  = false;
let playing   = false;

function playCassetteInsertSound() {
  const ctx = new (window.AudioContext || window.webkitAudioContext)();

  // Low mechanical thud
  const thud      = ctx.createOscillator();
  const thudGain  = ctx.createGain();
  thud.type = 'sine';
  thud.frequency.setValueAtTime(90, ctx.currentTime);
  thud.frequency.exponentialRampToValueAtTime(28, ctx.currentTime + 0.18);
  thudGain.gain.setValueAtTime(0.55, ctx.currentTime);
  thudGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.18);
  thud.connect(thudGain);
  thudGain.connect(ctx.destination);
  thud.start(ctx.currentTime);
  thud.stop(ctx.currentTime + 0.18);

  // Mechanical rattle / slide noise
  const bufLen    = Math.floor(ctx.sampleRate * 0.45);
  const noiseBuf  = ctx.createBuffer(1, bufLen, ctx.sampleRate);
  const nd        = noiseBuf.getChannelData(0);
  for (let i = 0; i < bufLen; i++) nd[i] = Math.random() * 2 - 1;
  const noise     = ctx.createBufferSource();
  noise.buffer    = noiseBuf;
  const bp        = ctx.createBiquadFilter();
  bp.type         = 'bandpass';
  bp.frequency.value = 900;
  bp.Q.value      = 0.6;
  const noiseGain = ctx.createGain();
  noiseGain.gain.setValueAtTime(0, ctx.currentTime);
  noiseGain.gain.linearRampToValueAtTime(0.28, ctx.currentTime + 0.025);
  noiseGain.gain.setValueAtTime(0.28, ctx.currentTime + 0.06);
  noiseGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.45);
  noise.connect(bp);
  bp.connect(noiseGain);
  noiseGain.connect(ctx.destination);
  noise.start(ctx.currentTime);
  noise.stop(ctx.currentTime + 0.45);

  setTimeout(() => ctx.close(), 600);
}

function playCassetteEndSound() {
  const ctx = new (window.AudioContext || window.webkitAudioContext)();

  // Mechanical click / stop
  const click     = ctx.createOscillator();
  const clickGain = ctx.createGain();
  click.type = 'square';
  click.frequency.setValueAtTime(110, ctx.currentTime);
  click.frequency.exponentialRampToValueAtTime(35, ctx.currentTime + 0.09);
  clickGain.gain.setValueAtTime(0.35, ctx.currentTime);
  clickGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.09);
  click.connect(clickGain);
  clickGain.connect(ctx.destination);
  click.start(ctx.currentTime);
  click.stop(ctx.currentTime + 0.09);

  // Tape-wind-down noise
  const bufLen2   = Math.floor(ctx.sampleRate * 0.35);
  const noiseBuf2 = ctx.createBuffer(1, bufLen2, ctx.sampleRate);
  const nd2       = noiseBuf2.getChannelData(0);
  for (let i = 0; i < bufLen2; i++) nd2[i] = Math.random() * 2 - 1;
  const noise2    = ctx.createBufferSource();
  noise2.buffer   = noiseBuf2;
  const lp        = ctx.createBiquadFilter();
  lp.type         = 'lowpass';
  lp.frequency.setValueAtTime(2200, ctx.currentTime);
  lp.frequency.exponentialRampToValueAtTime(180, ctx.currentTime + 0.35);
  const noiseGain2 = ctx.createGain();
  noiseGain2.gain.setValueAtTime(0.18, ctx.currentTime);
  noiseGain2.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);
  noise2.connect(lp);
  lp.connect(noiseGain2);
  noiseGain2.connect(ctx.destination);
  noise2.start(ctx.currentTime);
  noise2.stop(ctx.currentTime + 0.35);

  setTimeout(() => ctx.close(), 500);
}

function initCassette() {
  const cassette    = document.getElementById('cassette');
  const cassetteArea= document.getElementById('cassette-area');
  const deck        = document.getElementById('player-deck');
  const led         = document.getElementById('player-led');
  const ledLabel    = led.querySelector('.led-label');
  const slotEmpty   = document.getElementById('slot-empty');
  const cip         = document.getElementById('cip');
  const vuMeter     = document.getElementById('vu-meter');
  const instruction = document.getElementById('cassette-instruction');
  const btnPlay     = document.getElementById('btn-play');
  const btnStop     = document.getElementById('btn-stop');
  const btnRW       = document.getElementById('btn-rw');
  const btnFF       = document.getElementById('btn-ff');
  const audio       = document.getElementById('audio');

  /* ---- helpers ---- */
  function activateLED(labelText) {
    led.classList.add('on');
    ledLabel.textContent = labelText || 'PLAY';
  }

  function deactivateLED(labelText) {
    led.classList.remove('on');
    ledLabel.textContent = labelText || 'STANDBY';
  }

  function startReels() {
    document.querySelectorAll('.cip-reel').forEach(r => r.classList.add('spinning'));
    document.querySelectorAll('.c-reel').forEach(r => r.classList.add('spinning'));
  }

  function stopReels() {
    document.querySelectorAll('.cip-reel, .c-reel').forEach(r => r.classList.remove('spinning'));
  }

  /* ---- password modal ---- */
  const pwOverlay = document.getElementById('pw-overlay');
  const pwInput   = document.getElementById('pw-input');
  const pwBtn     = document.getElementById('pw-btn');
  const pwError   = document.getElementById('pw-error');
  const pwCard    = document.querySelector('.pw-card');
  const PASSWORD  = 'MiaPorSiempre';

  function showPasswordModal() {
    pwOverlay.classList.add('visible');
    pwInput.value = '';
    pwError.classList.remove('visible');
    setTimeout(() => pwInput.focus(), 400);
  }

  function submitPassword() {
    if (pwInput.value === PASSWORD) {
      // Unlock audio element on this user gesture (required by iOS/Safari)
      audio.play().then(() => audio.pause()).catch(() => {});
      pwOverlay.classList.remove('visible');
      setTimeout(playAudio, 400);
    } else {
      pwError.classList.add('visible');
      pwCard.classList.remove('shake');
      void pwCard.offsetWidth;
      pwCard.classList.add('shake');
      pwInput.value = '';
      pwCard.addEventListener('animationend', () => pwCard.classList.remove('shake'), { once: true });
    }
  }

  pwBtn.addEventListener('click', submitPassword);
  pwInput.addEventListener('keydown', e => { if (e.key === 'Enter') submitPassword(); });

  /* ---- insert cassette ---- */
  function insertCassette() {
    if (inserted) return;
    inserted = true;

    playCassetteInsertSound();
    cassette.classList.add('hidden');
    slotEmpty.style.opacity = '0';
    cip.classList.add('visible');
    activateLED('LOADED');

    if (instruction) instruction.textContent = 'introduce la clave para escuchar...';

    // Show password modal instead of auto-playing
    setTimeout(showPasswordModal, 400);
  }

  /* ---- playback ---- */
  function playAudio() {
    if (!inserted) { shakeHint(); return; }

    playing = true;
    startReels();
    vuMeter.classList.add('active');
    activateLED('PLAY');
    btnPlay.textContent = '⏸';

    audio.play().catch(() => {});
  }

  function pauseAudio() {
    playing = false;
    stopReels();
    vuMeter.classList.remove('active');
    activateLED('PAUSE');
    btnPlay.textContent = '▶';
    audio.pause();
  }

  function stopAudio() {
    playing = false;
    stopReels();
    vuMeter.classList.remove('active');
    deactivateLED('STOP');
    btnPlay.textContent = '▶';
    audio.pause();
    audio.currentTime = 0;
  }

  function shakeHint() {
    cassetteArea.style.animation = 'none';
    void cassetteArea.offsetWidth; // reflow
    cassetteArea.style.animation = 'cassette-shake 0.42s ease';
    cassetteArea.addEventListener('animationend', () => {
      cassetteArea.style.animation = '';
    }, { once: true });
  }

  /* ---- control buttons ---- */
  btnPlay.addEventListener('click', () => {
    if (!inserted) { shakeHint(); return; }
    playing ? pauseAudio() : playAudio();
  });

  btnStop.addEventListener('click', stopAudio);

  btnRW.addEventListener('click', () => {
    if (!inserted) return;
    audio.currentTime = Math.max(0, audio.currentTime - 10);
  });

  btnFF.addEventListener('click', () => {
    if (!inserted) return;
    audio.currentTime = Math.min(audio.duration || 0, audio.currentTime + 10);
  });

  audio.addEventListener('ended', () => { playCassetteEndSound(); stopAudio(); });

  /* ================================================
     MOUSE DRAG & DROP
  ================================================ */
  cassette.addEventListener('dragstart', e => {
    e.dataTransfer.setData('text/plain', 'cassette');
    e.dataTransfer.effectAllowed = 'move';
    setTimeout(() => cassette.classList.add('dragging'), 0);
  });

  cassette.addEventListener('dragend', () => {
    cassette.classList.remove('dragging');
  });

  deck.addEventListener('dragover', e => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    deck.classList.add('over');
  });

  deck.addEventListener('dragleave', e => {
    if (!deck.contains(e.relatedTarget)) deck.classList.remove('over');
  });

  deck.addEventListener('drop', e => {
    e.preventDefault();
    deck.classList.remove('over');
    insertCassette();
  });

  /* ================================================
     TOUCH DRAG
  ================================================ */
  let touching    = false;
  let touchClone  = null;
  let offX = 0, offY = 0;

  cassette.addEventListener('touchstart', e => {
    if (inserted) return;
    e.preventDefault();
    touching = true;

    const t    = e.touches[0];
    const rect = cassette.getBoundingClientRect();
    offX = t.clientX - rect.left;
    offY = t.clientY - rect.top;

    // floating visual clone
    touchClone = cassette.cloneNode(true);
    touchClone.removeAttribute('id');
    Object.assign(touchClone.style, {
      position:      'fixed',
      width:         rect.width  + 'px',
      height:        rect.height + 'px',
      left:          rect.left   + 'px',
      top:           rect.top    + 'px',
      opacity:       '0.92',
      pointerEvents: 'none',
      zIndex:        '9999',
      transition:    'none',
      transform:     'scale(1.06)',
      filter:        'drop-shadow(0 18px 36px rgba(0,0,0,0.7))',
    });
    document.body.appendChild(touchClone);
    cassette.style.opacity = '0.18';
  }, { passive: false });

  document.addEventListener('touchmove', e => {
    if (!touching || !touchClone) return;
    e.preventDefault();

    const t = e.touches[0];
    touchClone.style.left = (t.clientX - offX) + 'px';
    touchClone.style.top  = (t.clientY - offY) + 'px';

    const dr = deck.getBoundingClientRect();
    const overDeck =
      t.clientX >= dr.left && t.clientX <= dr.right &&
      t.clientY >= dr.top  && t.clientY <= dr.bottom;

    deck.classList.toggle('over', overDeck);
  }, { passive: false });

  document.addEventListener('touchend', e => {
    if (!touching) return;
    touching = false;

    if (touchClone) { document.body.removeChild(touchClone); touchClone = null; }
    cassette.style.opacity = '';
    deck.classList.remove('over');

    const t  = e.changedTouches[0];
    const dr = deck.getBoundingClientRect();

    if (
      t.clientX >= dr.left && t.clientX <= dr.right &&
      t.clientY >= dr.top  && t.clientY <= dr.bottom
    ) {
      insertCassette();
    }
  });
}

/* ================================================
   HEART & LETTER
================================================ */
function initHeartLetter() {
  const heartBtn  = document.getElementById('heart-btn');
  const overlay   = document.getElementById('letter-overlay');
  const closeBtn  = document.getElementById('letter-close');
  const hintText  = document.getElementById('heart-hint-text');
  let broken = false;

  function breakHeart() {
    if (broken) return;
    broken = true;
    if (hintText) hintText.textContent = '...';

    // Phase 1: shake (0–450ms)
    heartBtn.classList.add('shaking');

    // Phase 2: pieces fly apart
    setTimeout(() => {
      heartBtn.classList.remove('shaking');
      heartBtn.classList.add('breaking');
    }, 450);

    // Phase 3: letter opens
    setTimeout(() => {
      overlay.classList.add('visible');
    }, 1200);
  }

  function closeLetter() {
    overlay.classList.remove('visible');

    // Reassemble the heart
    heartBtn.classList.remove('breaking');
    heartBtn.classList.add('reassembling');

    // After pieces fly back, flash the reunite glow and reset
    setTimeout(() => {
      heartBtn.classList.remove('reassembling');
      heartBtn.classList.add('reunited');

      // Reset fully so it can be clicked again
      setTimeout(() => {
        heartBtn.classList.remove('reunited');
        broken = false;
        if (hintText) hintText.textContent = 'toca el corazón...';
      }, 500);
    }, 780);
  }

  heartBtn.addEventListener('click', breakHeart);
  closeBtn.addEventListener('click', closeLetter);

  overlay.addEventListener('click', e => {
    if (e.target === overlay) closeLetter();
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && overlay.classList.contains('visible')) closeLetter();
  });
}

/* ================================================
   INIT
================================================ */
document.addEventListener('DOMContentLoaded', () => {
  initBgAudio();
  initUniverse();
  initCarousel();
  initReveal();
  initNavDots();
  initCassette();
  initHeartLetter();
});
