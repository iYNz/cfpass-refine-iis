/* ==========================================================================
   CFPASS — 공용 스크립트 (원페이지)
   필요한 요소가 없으면 각 모듈은 조용히 종료한다.
   ========================================================================== */
(function () {
  'use strict';

  var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ======================================================================
     레퍼런스 데이터 — 원본 reference.html에서 무변경 이식 (6그룹 × 10명)
     ====================================================================== */
  /* 목록은 연령 오름차순으로 두되, 첫 화면은 20대 여성을 편다 */
  var REF_GROUPS = [
    { id: '10f', title: '10대 · 여성' },
    { id: '10m', title: '10대 · 남성' },
    { id: '20f', title: '20대 · 여성' },
    { id: '20m', title: '20대 · 남성' },
    { id: '60f', title: '60대 · 여성' },
    { id: '60m', title: '60대 · 남성' }
  ];
  var REF_DEFAULT = '20f';

  var REF_NAMES = {
    '20f': ['김서연','정다혜','강예린','한유정','배하윤','송다연','박하린','윤채아','오세은','이하경'],
    '20m': ['김현우','이도윤','서지훈','최윤재','정하빈','송재하','한지후','윤태환','이하준','오세인'],
    '10f': ['김하연','박하은','이지우','한소이','유가은','윤다솜','노민아','최나경','정세희','송주아'],
    '10m': ['김태윤','이주원','김서준','정하율','윤성하','한시온','최준혁','오현우','류진호','박민호'],
    '60f': ['한미정','박영희','강현주','최선옥','류정희','김명숙','이정화','윤경자','오정순','조은자'],
    '60m': ['한동철','조병식','오세준','강문호','류재덕','김영수','박종태','이명환','최석호','윤경수']
  };

  var REF_TAGS = {
    '20f': [
      ['#쌍커풀','#아이보리피부','#맑은미소'],
      ['#쌍커풀','#아이보리피부','#청순미'],
      ['#쌍커풀','#포슬린피부','#우아한분위기'],
      ['#쌍커풀','#베이지피부','#따뜻한인상'],
      ['#쌍커풀','#포슬린피부','#고양이상'],
      ['#쌍커풀','#올리브피부','#도회적분위기'],
      ['#쌍커풀','#밀크티피부','#따뜻한인상'],
      ['#쌍커풀','#아이보리피부','#세련미'],
      ['#쌍커풀','#베이지피부','#당당한매력'],
      ['#쌍커풀','#아이보리피부','#맑고단아함']
    ],
    '20m': [
      ['#쌍커풀','#아이보리피부','#완벽비율'],
      ['#쌍커풀','#베이지피부','#다부진인상'],
      ['#쌍커풀','#유톤피부','#카리스마있는'],
      ['#쌍커풀','#아이보리피부','#고급스러운분위기'],
      ['#쌍커풀','#무결피부','#강렬한인상'],
      ['#쌍커풀','#쿨톤피부','#부드러운미소'],
      ['#쌍커풀','#베이지피부','#세련된인상'],
      ['#쌍커풀','#아이보리피부','#완벽대칭'],
      ['#쌍커풀','#유톤피부','#또렷한이목구비'],
      ['#쌍커풀','#건강한피부','#자신감있는']
    ],
    '10f': [
      ['#쌍커풀','#아이보리피부','#따뜻한미소'],
      ['#쌍커풀','#베이지피부','#환한눈웃음'],
      ['#쌍커풀','#밝은피부','#부드러운눈매'],
      ['#쌍커풀','#밝은피부','#순수한눈빛'],
      ['#쌍커풀','#화사한피부','#밝은표정'],
      ['#쌍커풀','#밝은피부','#맑은미소'],
      ['#쌍커풀','#베이지피부','#다부진인상'],
      ['#쌍커풀','#아이보리피부','#또렷한눈동자'],
      ['#쌍커풀','#아이보리피부','#온화한인상'],
      ['#쌍커풀','#밝은피부','#사랑스러운눈매']
    ],
    '10m': [
      ['#쌍커풀','#아이보리피부','#맑은눈빛'],
      ['#쌍커풀','#밝은피부','#밝은미소'],
      ['#쌍커풀','#밝은톤피부','#맑은표정'],
      ['#쌍커풀','#맑은톤피부','#귀여운웃음'],
      ['#쌍커풀','#아이보리피부','#선한인상'],
      ['#쌍커풀','#밝은피부','#둥근눈매'],
      ['#쌍커풀','#베이지피부','#맑은미소'],
      ['#쌍커풀','#아이보리피부','#인자한미소'],
      ['#쌍커풀','#맑은피부','#선한눈빛'],
      ['#쌍커풀','#베이지피부','#또렷한눈동자']
    ],
    '60f': [
      ['#쌍커풀','#밝은피부','#선한표정'],
      ['#쌍커풀','#밝은피부','#맑은눈매'],
      ['#쌍커풀','#밝은피부','#차분한눈매'],
      ['#쌍커풀','#맑은톤피부','#잔잔한미소'],
      ['#쌍커풀','#아이보리피부','#잔잔한표정'],
      ['#쌍커풀','#아이보리피부','#온화한미소'],
      ['#쌍커풀','#베이지피부','#단정한표정'],
      ['#쌍커풀','#아이보리피부','#맑은눈빛'],
      ['#쌍커풀','#베이지피부','#맑은미소'],
      ['#쌍커풀','#맑은톤피부','#온화한눈빛']
    ],
    '60m': [
      ['#쌍커풀','#아이보리피부','#부드러운미소'],
      ['#쌍커풀','#밝은톤피부','#잔잔한눈빛'],
      ['#무쌍','#밝은피부','#차분한눈매'],
      ['#무쌍','#베이지피부','#인자한미소'],
      ['#쌍커풀','#아이보리피부','#따뜻한표정'],
      ['#쌍커풀','#아이보리피부','#단정한눈빛'],
      ['#쌍커풀','#밝은피부','#잔잔한미소'],
      ['#무쌍','#베이지피부','#깊은눈매'],
      ['#무쌍','#맑은톤피부','#온화한표정'],
      ['#쌍커풀','#밝은피부','#선한눈빛']
    ]
  };

  var REF_IMG_BASE = 'assets/img';
  var REF_PER_GROUP = 10;

  /* ---- 모바일 판정 — CSS 의 992 브레이크포인트와 같은 선을 본다 --------- */
  var mqMobile = window.matchMedia('(max-width: 992px)');
  function isMobile() { return mqMobile.matches; }

  /* ---- 터치 스와이프 (캐러셀 공통) --------------------------------------
     가로 이동이 세로보다 뚜렷할 때만 넘긴다 — 페이지 세로 스크롤을 뺏지
     않도록 touchmove 는 건드리지 않고 passive 로만 듣는다. */
  function bindSwipe(el, onSwipe) {
    if (!el) return;
    var MIN = 40;                 /* 이보다 짧으면 탭으로 본다 */
    var x0 = 0, y0 = 0, tracking = false;

    el.addEventListener('touchstart', function (e) {
      tracking = e.touches.length === 1;
      if (!tracking) return;
      x0 = e.touches[0].clientX;
      y0 = e.touches[0].clientY;
    }, { passive: true });

    el.addEventListener('touchend', function (e) {
      if (!tracking) return;
      tracking = false;
      var t = e.changedTouches[0];
      var dx = t.clientX - x0, dy = t.clientY - y0;
      if (Math.abs(dx) < MIN || Math.abs(dx) < Math.abs(dy) * 1.4) return;
      onSwipe(dx < 0 ? 1 : -1);

      /* 스와이프 끝에서 브라우저가 click 을 한 번 더 쏜다 — 카드 클릭
         핸들러(라이트박스 열기 등)가 딸려 열리지 않도록 한 번만 삼킨다. */
      var kill = function (ev) { ev.stopPropagation(); ev.preventDefault(); };
      el.addEventListener('click', kill, { capture: true, once: true });
      setTimeout(function () { el.removeEventListener('click', kill, true); }, 400);
    }, { passive: true });
  }

  /* ---- 스크롤 스파이 (원페이지 nav 활성 표시) --------------------------- */
  function initScrollSpy() {
    var links = Array.prototype.slice.call(
      document.querySelectorAll('.nav-links a[href^="#"]')
    );
    if (!links.length) return;

    var sections = links
      .map(function (a) { return document.querySelector(a.getAttribute('href')); })
      .filter(Boolean);
    if (!sections.length) return;

    function sync() {
      var probe = window.scrollY + window.innerHeight * 0.3;
      var activeIdx = 0;
      sections.forEach(function (sec, i) {
        if (sec.offsetTop <= probe) activeIdx = i;
      });
      links.forEach(function (a, i) {
        a.classList.toggle('is-current', i === activeIdx);
      });
    }

    var ticking = false;
    window.addEventListener('scroll', function () {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(function () { sync(); ticking = false; });
    }, { passive: true });
    sync();
  }

  /* ---- 라이트박스 (영상 + 이미지 겸용) ---------------------------------- */
  var lightbox = null;
  /* 마퀴가 자기 재생 범위를 다시 판정하게 하는 훅 — 패널 전환 후 호출한다 */
  var marqueeSync = function () {};

  function initLightbox() {
    var box = document.getElementById('lightbox');
    if (!box) return;

    var inner = box.querySelector('.lightbox__inner');
    var stage = box.querySelector('.lightbox__stage');
    var closeBtn = box.querySelector('.lightbox__close');
    var meta = box.querySelector('.lightbox__meta');
    var nameEl = box.querySelector('.lightbox__name');
    var tagsEl = box.querySelector('.lightbox__tags');
    var prevBtn = box.querySelector('.lightbox__nav--prev');
    var nextBtn = box.querySelector('.lightbox__nav--next');
    var current = null;
    var lastFocus = null;

    function clear() {
      if (!current) return;
      if (current.tagName === 'VIDEO') current.pause();
      current.remove();
      current = null;
    }

    /* 목록을 받으면 좌·우 버튼으로 같은 그룹 안을 넘길 수 있다 */
    var list = null, index = 0;

    /* 양 끝에서는 잠근다 — 순환하지 않고 해당 화살표를 숨긴다 */
    function syncNav() {
      var on = !!list && list.length > 1;
      box.classList.toggle('has-nav', on);
      prevBtn.hidden = !on || index === 0;
      nextBtn.hidden = !on || index === list.length - 1;
      if (!on) return;
      prevBtn.setAttribute('aria-label', '이전 (' + index + '/' + list.length + ')');
      nextBtn.setAttribute('aria-label', '다음 (' + (index + 2) + '/' + list.length + ')');
    }

    function step(d) {
      if (!list || list.length < 2) return;
      var n = index + d;
      if (n < 0 || n >= list.length) return;
      index = n;
      paint(list[index]);
      syncNav();
    }

    function open(opts) {
      lastFocus = document.activeElement;
      list = opts.list || null;
      index = opts.index || 0;
      paint(list ? list[index] : opts);
      syncNav();
      box.classList.add('is-open');
      box.setAttribute('aria-hidden', 'false');
      document.body.classList.add('u-no-scroll');
      closeBtn.focus();
    }

    function paint(opts) {
      clear();

      /* 창을 콘텐츠 비율에 맞춘다 — 정사각 이미지가 16:9 창에서 레터박스되지 않게 */
      function setRatio(r) { stage.style.setProperty('--lb-arn', (r || 16 / 9).toFixed(4)); }

      var el;
      if (opts.type === 'video') {
        el = document.createElement('video');
        el.src = opts.src;
        el.controls = true;
        el.playsInline = true;
        el.autoplay = true;
        setRatio(opts.ratio || 16 / 9);
      } else {
        el = document.createElement('img');
        el.src = opts.src;
        el.alt = opts.alt || '';
        setRatio(opts.ratio || 1);
        /* 실제 원본 비율을 알게 되면 그 값으로 맞춘다 */
        el.addEventListener('load', function () {
          if (el.naturalWidth) setRatio(el.naturalWidth / el.naturalHeight);
        });
      }
      el.className = 'lightbox__media';
      stage.appendChild(el);
      current = el;

      if (opts.name) {
        nameEl.textContent = opts.name;
        tagsEl.innerHTML = '';
        (opts.tags || []).forEach(function (t) {
          var chip = document.createElement('span');
          chip.className = 'tag-chip';
          chip.textContent = t;
          tagsEl.appendChild(chip);
        });
        meta.classList.add('is-shown');
      } else {
        meta.classList.remove('is-shown');
      }
    }

    function close() {
      box.classList.remove('is-open');
      box.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('u-no-scroll');
      meta.classList.remove('is-shown');
      list = null;
      clear();
      if (lastFocus && typeof lastFocus.focus === 'function') lastFocus.focus();
    }

    /* 포커스 트랩 */
    box.addEventListener('keydown', function (e) {
      if (e.key !== 'Tab') return;
      var focusables = box.querySelectorAll('button, [href], video[controls]');
      if (!focusables.length) return;
      var first = focusables[0];
      var last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    });

    prevBtn.addEventListener('click', function () { step(-1); });
    nextBtn.addEventListener('click', function () { step(1); });
    box.addEventListener('click', function (e) { if (e.target === box) close(); });
    closeBtn.addEventListener('click', close);
    document.addEventListener('keydown', function (e) {
      if (!box.classList.contains('is-open')) return;
      if (e.key === 'Escape') close();
      else if (e.key === 'ArrowLeft') step(-1);
      else if (e.key === 'ArrowRight') step(1);
    });

    lightbox = { open: open, close: close };

    /* 정적 마크업의 클릭 가능한 미디어 바인딩 */
    document.querySelectorAll('.media--clickable').forEach(function (frame) {
      bindFrame(frame);
    });
  }

  function bindFrame(frame) {
    var source = frame.querySelector('video, img');
    if (!source || !lightbox) return;

    function fire() {
      var isVideo = source.tagName === 'VIDEO';
      lightbox.open({
        type: isVideo ? 'video' : 'image',
        src: source.currentSrc || source.src || source.dataset.src,
        alt: source.alt || '',
        name: frame.dataset.name || '',
        tags: frame.dataset.tags ? frame.dataset.tags.split('|') : []
      });
    }

    frame.addEventListener('click', fire);
    frame.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); fire(); }
    });
  }

  /* ---- 우측 하단 플로팅 내비 (vbizring .floating-nav) --------------------
     히어로를 지나면 나타난다. 모바일에서 상단 nav 에 손이 닿지 않을 때의
     대체 경로. 링크 클릭은 스크롤 락이 가로채 같은 목표점으로 보낸다. */
  function initFloatNav() {
    var root = document.getElementById('floatingNav');
    if (!root) return;

    var toggle = document.getElementById('floatToggle');
    var menu = document.getElementById('floatMenu');
    var links = Array.prototype.slice.call(root.querySelectorAll('.float-link'));
    if (!toggle || !menu) return;

    function setOpen(open) {
      toggle.classList.toggle('is-open', open);
      menu.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.setAttribute('aria-label', open ? '빠른 메뉴 닫기' : '빠른 메뉴 열기');
    }

    toggle.addEventListener('click', function () {
      setOpen(toggle.getAttribute('aria-expanded') !== 'true');
    });

    /* 바깥을 누르거나 Esc 로 닫는다 */
    document.addEventListener('click', function (e) {
      if (root.contains(e.target)) return;
      setOpen(false);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') setOpen(false);
    });

    links.forEach(function (a) {
      a.addEventListener('click', function () { setOpen(false); });
    });

    /* 데스크톱은 히어로를 60% 지나야 뜨지만, 모바일에서는 이게 유일한
       내비게이션이므로 처음부터 띄운다. */
    var targets = links
      .map(function (a) { return document.querySelector(a.getAttribute('href')); });

    function sync() {
      root.classList.toggle(
        'is-visible',
        isMobile() || window.scrollY > window.innerHeight * 0.6
      );

      var probe = window.scrollY + window.innerHeight * 0.3;
      var at = 0;
      targets.forEach(function (sec, i) {
        if (sec && sec.offsetTop <= probe) at = i;
      });
      links.forEach(function (a, i) { a.classList.toggle('is-current', i === at); });
    }

    var ticking = false;
    window.addEventListener('scroll', function () {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(function () { sync(); ticking = false; });
    }, { passive: true });
    window.addEventListener('resize', sync);   /* 브레이크포인트를 넘나들 때 */
    sync();
  }

  /* ---- 영상 지연 로드 --------------------------------------------------- */
  var lazyObserver = null;

  function loadVideo(video) {
    if (video.dataset.loaded) return;
    video.src = video.dataset.src;
    video.dataset.loaded = '1';
    if (!prefersReduced && video.hasAttribute('data-autoplay')) {
      var p = video.play();
      if (p && p.catch) p.catch(function () {});
    }
  }

  function initLazyMedia() {
    if (!('IntersectionObserver' in window)) {
      document.querySelectorAll('video[data-src]:not([data-no-lazy])').forEach(loadVideo);
      return;
    }
    lazyObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        loadVideo(entry.target);
        lazyObserver.unobserve(entry.target);
      });
    }, { rootMargin: '200px' });

    /* data-no-lazy 는 각 모듈이 직접 로드한다 — 그 전까지 poster 가 남아야 하는 영상들 */
    document.querySelectorAll('video[data-src]:not([data-no-lazy])').forEach(function (v) {
      lazyObserver.observe(v);
    });
  }

  /* ---- 스크롤 리빌 ------------------------------------------------------ */
  var revealObserver = null;

  function initReveal() {
    if (prefersReduced || !('IntersectionObserver' in window)) {
      document.querySelectorAll('.anim').forEach(function (el) { el.classList.add('is-visible'); });
      return;
    }
    revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      });
    }, { threshold: 0.15 });

    document.querySelectorAll('.anim').forEach(function (el) { revealObserver.observe(el); });
  }

  /* ---- 그린 매트 레일 (자동 흐름 없음 · 하단 버튼으로 이동) -------------- */
  function initMarquee() {
    var viewport = document.getElementById('mqViewport');
    if (!viewport) return;

    var track = viewport.querySelector('.marquee__track');
    var prev = document.getElementById('mqPrev');
    var next = document.getElementById('mqNext');
    if (!track) return;

    /* 데스크톱은 소스를 전부 미리 붙인다(합계 약 13MB) — 넘길 때 끊기지 않게.
       모바일은 셀룰러가 걸릴 수 있어 레일에 걸치는 타일만 그때 받는다. */
    if (!isMobile()) {
      track.querySelectorAll('video[data-src]').forEach(function (v) {
        v.src = v.dataset.src;
        v.dataset.loaded = '1';
      });
    }

    /* 패널이 숨어 있으면 전부 멈춘다. 보이면 절반 이상 걸친 타일만 재생 */
    var panel = viewport.closest ? viewport.closest('.panel') : null;
    function syncPlay() {
      var live = !panel || panel.classList.contains('is-on');
      var vr = viewport.getBoundingClientRect();
      Array.prototype.forEach.call(track.querySelectorAll('.mq-tile'), function (t) {
        var v = t.querySelector('video');
        if (!v) return;
        var r = t.getBoundingClientRect();
        var half = r.width * 0.5;
        var on = live && r.right > vr.left + half && r.left < vr.right - half;
        if (on && !prefersReduced) {
          if (!v.dataset.loaded) { v.src = v.dataset.src; v.dataset.loaded = '1'; }
          if (v.paused) { var pl = v.play(); if (pl && pl.catch) pl.catch(function () {}); }
        } else if (v.dataset.loaded && !v.paused) {
          v.pause();
        }
      });
    }
    marqueeSync = syncPlay;
    viewport.addEventListener('scroll', syncPlay, { passive: true });
    window.addEventListener('resize', syncPlay);
    syncPlay();

    /* 타일 클릭 → 크게 보기. 레일 10편을 목록째 넘겨 좌·우로 넘길 수 있게 한다 */
    var tiles = Array.prototype.slice.call(track.querySelectorAll('.mq-tile'));
    function buildClipList() {
      return tiles.map(function (t) {
        var v = t.querySelector('video');
        return {
          type: 'video',
          src: v.currentSrc || v.src || v.dataset.src,
          name: t.dataset.copy || t.dataset.title || '',
          tags: t.dataset.title ? [t.dataset.title] : [],
          ratio: 9 / 16
        };
      });
    }
    tiles.forEach(function (t, i) {
      t.tabIndex = 0;
      t.setAttribute('role', 'button');
      t.setAttribute('aria-label', (t.dataset.copy || t.dataset.title || '클립') + ' 크게 보기');
      function fire() {
        if (lightbox) lightbox.open({ list: buildClipList(), index: i });
      }
      t.addEventListener('click', fire);
      t.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); fire(); }
      });
    });

    if (!prev || !next) return;

    function step() {
      var tile = track.querySelector('.mq-tile');
      return tile ? (tile.offsetWidth + 0.5) * 2 : viewport.clientWidth / 2;
    }
    function sync() {
      var max = viewport.scrollWidth - viewport.clientWidth - 1;
      prev.disabled = viewport.scrollLeft <= 0;
      next.disabled = viewport.scrollLeft >= max;
    }

    prev.addEventListener('click', function () { viewport.scrollLeft -= step(); });
    next.addEventListener('click', function () { viewport.scrollLeft += step(); });
    viewport.addEventListener('scroll', sync, { passive: true });
    window.addEventListener('resize', sync);
    sync();
  }

  /* deck-nanum-kinect 2p 스트립. 활성 카드를 무대 중앙에 두도록 스트립을 민다.
     카드 폭·간격은 CSS(min(1180px, 74vw))가 정하므로 실측해서 오프셋을 잡는다. */
  /* ---- 패널 전환 — 하단 인디케이터로 같은 자리에서 갈아 끼운다 ---------- */
  function initPanels() {
    Array.prototype.forEach.call(document.querySelectorAll('[data-panels]'), function (root) {
      var panels = Array.prototype.slice.call(root.querySelectorAll('.panel'));
      /* 도트 인디케이터든 태그 버튼이든 같은 방식으로 묶는다 */
      var dots = Array.prototype.slice.call(root.querySelectorAll('.pager__dot, .panel-tab'));
      if (panels.length < 2) return;

      /* 숨은 패널의 영상까지 돌릴 이유가 없다. 마퀴는 초기화 때 전부 로드되므로
         다시 보일 때 play()만 걸어 주면 이어서 재생된다. */
      function setPlaying(panel, on) {
        Array.prototype.forEach.call(panel.querySelectorAll('video'), function (v) {
          /* 마퀴는 레일에 걸친 것만 돌려야 하므로 자기 판정에 맡긴다 */
          if (on && v.closest('.marquee')) return;
          if (!on) { if (v.dataset.loaded) v.pause(); return; }
          if (v.hasAttribute('data-autoplay')) loadVideo(v);
          if (!v.dataset.loaded || prefersReduced) return;
          var p = v.play();
          if (p && p.catch) p.catch(function () {});
        });
      }

      function show(i) {
        panels.forEach(function (p, k) {
          p.classList.toggle('is-on', k === i);
          setPlaying(p, k === i);
        });
        dots.forEach(function (d, k) {
          d.setAttribute('aria-selected', k === i ? 'true' : 'false');
        });
        marqueeSync();
      }

      dots.forEach(function (d, i) { d.addEventListener('click', function () { show(i); }); });
      show(0);
    });
  }

  function initServices() {
    var strip = document.getElementById('sbStrip');
    var dotsWrap = document.getElementById('sbDots');
    var curEl = document.getElementById('sbCur');
    if (!strip) return;

    var cards = Array.prototype.slice.call(strip.querySelectorAll('.sb-card'));
    var n = cards.length;
    if (!n) return;

    var idx = 0;
    var dots = [];

    function render() {
      var w = cards[0].offsetWidth;
      var gap = parseFloat(getComputedStyle(cards[0]).marginRight) || 0;
      var offset = (strip.parentNode.clientWidth - w) / 2;   /* 활성 카드를 중앙에 */
      strip.style.transform = 'translateX(' + (offset - idx * (w + gap)) + 'px)';

      cards.forEach(function (el, i) {
        el.classList.toggle('is-active', i === idx);
        /* 활성 카드만 재생한다 — 눌러 둔 이웃까지 돌릴 이유가 없다 */
        var v = el.querySelector('video');
        if (!v) return;
        if (i === idx) {
          loadVideo(v);
          if (!prefersReduced) {
            var pl = v.play();
            if (pl && pl.catch) pl.catch(function () {});
          }
        } else if (v.dataset.loaded) {
          v.pause();
        }
      });
      dots.forEach(function (d, i) {
        d.setAttribute('aria-selected', i === idx ? 'true' : 'false');
      });
      if (curEl) curEl.textContent = String(idx + 1).padStart(2, '0');
    }

    function go(i) { idx = Math.max(0, Math.min(n - 1, i)); render(); }

    if (dotsWrap) {
      cards.forEach(function (card, i) {
        var d = document.createElement('button');
        d.type = 'button';
        d.className = 'pager__dot';
        d.setAttribute('role', 'tab');
        d.setAttribute('aria-selected', i === 0 ? 'true' : 'false');
        var no = card.querySelector('.sb-card__no');
        d.setAttribute('aria-label', no ? no.textContent : String(i + 1));
        d.addEventListener('click', function () { go(i); });
        dotsWrap.appendChild(d);
        dots.push(d);
      });
    }

    /* 이웃 카드를 누르면 그 카드로 — 활성 카드는 무반응 */
    cards.forEach(function (el, i) {
      el.addEventListener('click', function () { if (i !== idx) go(i); });
    });

    /* 모바일은 이웃 카드가 화면 밖으로 밀려나 탭할 곳이 없다 — 스와이프로 넘긴다 */
    bindSwipe(strip.parentNode, function (d) { go(idx + d); });

    window.addEventListener('resize', render);
    render();
  }

  /* ---- 히어로 Coverflow (디지털 앨범) ------------------------------------ */

  /* 히어로와 샘플 섹션이 같은 구조를 쓴다. 플로팅 태그 문구는 각 카드의
     data-float-N("제목|부제")에 붙여 두므로, 태그가 없는 캐러셀은 그냥 넘어간다. */
  function initCoverflow(root) {
    if (!root) return;

    var items = Array.prototype.slice.call(root.querySelectorAll('.coverflow__item'));
    var dots = Array.prototype.slice.call(root.querySelectorAll('.pager__dot'));
    var floats = Array.prototype.slice.call(root.querySelectorAll('.float-card'));
    var n = items.length;
    if (!n) return;

    /* 태그 내용만 갈아 끼우면 같은 태그가 남아 보인다. 태그 전체를 왼쪽으로
       빼고 → 내용 교체 → 왼쪽에서 들여보내 태그가 통째로 바뀐 것처럼 만든다. */
    function renderFloats(i) {
      floats.forEach(function (card, k) {
        var raw = items[i].dataset['float' + (k + 1)];
        if (!raw) { card.hidden = true; return; }
        card.hidden = false;
        var parts = raw.split('|');

        function apply() {
          card.querySelector('.fc-text').textContent = parts[0] || '';
          card.querySelector('.fc-sub').textContent = parts[1] || '';
        }

        if (prefersReduced) { apply(); return; }

        card.classList.add('is-exiting');
        setTimeout(function () {
          apply();
          card.classList.remove('is-exiting');
          card.classList.add('is-entering');
          requestAnimationFrame(function () {
            requestAnimationFrame(function () { card.classList.remove('is-entering'); });
          });
        }, 260);
      });
    }

    var idx = 0;
    var timer = null;
    var INTERVAL = 5000;

    var stage = root.querySelector('.coverflow__stage');
    var TUCK = 0.26;      /* 폭이 같을 때 기존 translateX(±74%)와 정확히 같아진다 */
    var MAX_TUCK = 0.55;  /* 이웃이 자기 반폭의 55% 넘게 가려지지 않도록 */

    /* 중앙 양옆으로 몇 겹까지 내보일지. 1이면 기존처럼 3장만 걸린다.
       한 겹은 반드시 남겨 둬야(2*VISIBLE+1 < n) 되감기가 화면 밖에서 일어난다. */
    var VISIBLE = Math.max(1, Math.min(
      parseInt(root.dataset.cfVisible, 10) || 1,
      Math.floor((n - 1) / 2)
    ));

    /* 중앙 기준 슬롯: 0=중앙, 양수=오른쪽, 음수=왼쪽, null=화면 밖 */
    function slotOf(i) {
      var d = (i - idx + n) % n;
      if (d === 0) return 0;
      if (d <= VISIBLE) return d;
      if (n - d <= VISIBLE) return -(n - d);
      return null;
    }

    /* 카메라가 x축을 훑는 방식 — 카드는 한 줄로 늘어서 있고 중앙에서
       바깥으로 반폭을 누적해 자리를 잡는다. 폭이 섞여도 겹치지 않도록
       겹침(tuck)은 이웃 반폭 기준으로 제한한다. */
    function layout() {
      var cw = items[idx].offsetWidth;
      if (stage) stage.style.setProperty('--cf-cw', cw + 'px');
      items.forEach(function (el) {
        el.classList.remove('is-adj');
        el.style.removeProperty('--x');
        el.style.removeProperty('--d');
        el.style.removeProperty('--rot');
      });
      [1, -1].forEach(function (dir) {
        var prevHalf = cw / 2, acc = 0;
        for (var k = 1; k <= VISIBLE; k++) {
          var el = items[((idx + dir * k) % n + n) % n];
          var half = el.offsetWidth / 2;
          var tuck = Math.min((prevHalf + half) * TUCK, half * MAX_TUCK);
          acc += prevHalf + half - tuck;
          el.style.setProperty('--x', (dir * acc).toFixed(1) + 'px');
          el.style.setProperty('--d', k);
          el.style.setProperty('--rot', (dir > 0 ? -34 : 34) + 'deg');
          if (k === 1) el.classList.add('is-adj');
          prevHalf = half;
        }
      });
    }
    function render() {
      items.forEach(function (el, i) {
        var slot = slotOf(i);
        var pos = slot === null ? 'hidden' : (slot === 0 ? 'center' : (slot < 0 ? 'left' : 'right'));
        el.dataset.pos = pos;
        el.setAttribute('aria-hidden', pos === 'hidden' ? 'true' : 'false');

        /* 중앙이 아니어도 멈추지 않는다 — 넘겼을 때 정지 화면이 보이지 않게.
           로드는 data-autoplay + 지연 로더가 맡으므로 여기서 강제하지 않는다. */
        var v = el.querySelector('video');
        if (!v || prefersReduced || !v.dataset.loaded || !v.paused) return;
        var p = v.play();
        if (p && p.catch) p.catch(function () {});
      });
      dots.forEach(function (d, i) {
        d.setAttribute('aria-selected', i === idx ? 'true' : 'false');
      });
      layout();
      renderFloats(idx);
    }

    function go(i) { idx = (i + n) % n; render(); }

    function stop() { if (timer) { clearInterval(timer); timer = null; } }
    function start() {
      if (prefersReduced) return;
      stop();
      timer = setInterval(function () { go(idx + 1); }, INTERVAL);
    }

    /* 중앙 카드 클릭 → 크게 보기. data-cf-lightbox 가 붙은 캐러셀에만 건다
       (히어로는 확대를 쓰지 않는다). 좌·우 카드는 preserve-3d로 뒤에 있어
       포인터를 받지 못하므로 실질적으로 중앙에서만 열린다. */
    if (root.hasAttribute('data-cf-lightbox')) {
      items.forEach(function (el) {
        el.addEventListener('click', function () {
          if (el.dataset.pos !== 'center' || !lightbox) return;
          var v = el.querySelector('video');
          if (!v) return;
          loadVideo(v);
          var fc = (el.dataset.float1 || '').split('|');
          lightbox.open({
            type: 'video',
            src: v.currentSrc || v.src || v.dataset.src,
            name: fc[0] || '',
            tags: fc[1] ? [fc[1]] : [],
            ratio: 16 / 9
          });
        });
      });
    }

    /* 좌·우 클릭 영역으로 전환. 중앙 카드는 클릭 무반응
       (히어로에서는 라이트박스 확대를 쓰지 않는다).
       카드 자체는 preserve-3d로 뒤에 있어 포인터를 받지 못하므로
       .cf-zone 평면 버튼이 유일한 조작 수단이다. */
    [['.cf-zone--prev', -1], ['.cf-zone--next', 1]].forEach(function (pair) {
      var zone = root.querySelector(pair[0]);
      if (!zone) return;
      zone.addEventListener('click', function () { go(idx + pair[1]); start(); });
    });

    /* 터치에서는 좌우 탭보다 스와이프가 먼저 나온다 */
    bindSwipe(stage, function (d) { go(idx + d); start(); });

    dots.forEach(function (d, i) {
      d.addEventListener('click', function () { go(i); start(); });
    });

    root.addEventListener('mouseenter', stop);
    root.addEventListener('mouseleave', start);
    root.addEventListener('focusin', stop);
    root.addEventListener('focusout', start);

    document.addEventListener('visibilitychange', function () {
      if (document.hidden) stop(); else start();
    });

    /* 뷰포트가 바뀌면 카드 폭이 clamp로 재계산되므로 오프셋을 다시 잡는다 */
    window.addEventListener('resize', layout);

    render();
    start();
  }

  /* ---- 가상모델 (imw 설치사례 구조) -------------------------------------
     좌 28% 그룹 선택 / 우 72% 5×2 그리드. 카드는 세로형 프레임 + 하단 태그. */
  function initReference() {
    var tabsWrap = document.getElementById('refTabs');
    var grid = document.getElementById('refGrid');
    if (!tabsWrap || !grid) return;

    /* 모바일에서는 그룹 목록이 가로 스크롤이라 선택 항목이 화면 밖에 있을 수
       있다. 목록 자체의 scrollLeft 만 움직여(페이지는 건드리지 않는다) 가운데로. */
    function centerTab(btn) {
      if (tabsWrap.scrollWidth <= tabsWrap.clientWidth + 1) return;
      var wr = tabsWrap.getBoundingClientRect();
      var br = btn.getBoundingClientRect();
      tabsWrap.scrollLeft += (br.left - wr.left) - (wr.width - br.width) / 2;
    }

    var defaultBtn = null;

    REF_GROUPS.forEach(function (g) {
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'showcase__item';
      btn.setAttribute('role', 'tab');
      btn.setAttribute('aria-selected', g.id === REF_DEFAULT ? 'true' : 'false');
      btn.setAttribute('aria-controls', 'refGrid');

      var thumb = document.createElement('span');
      thumb.className = 'showcase__thumb';
      var timg = document.createElement('img');
      timg.src = REF_IMG_BASE + '/' + g.id + '/' + g.id + '1.jpg';
      timg.alt = '';
      timg.loading = 'lazy';
      thumb.appendChild(timg);

      var name = document.createElement('span');
      name.className = 'showcase__name';
      name.textContent = g.title;

      btn.appendChild(thumb);
      btn.appendChild(name);

      btn.addEventListener('click', function () {
        Array.prototype.forEach.call(tabsWrap.children, function (el) {
          el.setAttribute('aria-selected', 'false');
        });
        btn.setAttribute('aria-selected', 'true');
        centerTab(btn);
        switchTo(g.id);
      });
      tabsWrap.appendChild(btn);
      if (g.id === REF_DEFAULT) defaultBtn = btn;
    });

    /* imw 설치사례 전환 — 현 목록을 왼쪽으로 빼고, 새 목록을 오른쪽에서
       들여보낸다. 전환 중 재클릭은 타이머를 다시 잡아 마지막 선택을 따른다. */
    /* 그룹 10인을 라이트박스 목록 형태로 만든다 */
    function buildList(gid) {
      var names = REF_NAMES[gid] || [];
      var tags = REF_TAGS[gid] || [];
      var out = [];
      for (var k = 1; k <= REF_PER_GROUP; k++) {
        var code = gid + k;
        var nm = names[k - 1] || code;
        out.push({
          type: 'image',
          src: REF_IMG_BASE + '/' + gid + '/' + code + '.jpg',
          alt: nm,
          name: nm + ' (' + code + ')',
          tags: tags[k - 1] || []
        });
      }
      return out;
    }

    var swapTimer = null;
    function switchTo(groupId) {
      if (prefersReduced) { render(groupId); return; }
      clearTimeout(swapTimer);
      grid.classList.remove('is-in');
      grid.classList.add('is-out');
      swapTimer = setTimeout(function () {
        render(groupId);
        grid.classList.remove('is-out');
        grid.classList.add('is-in');
        requestAnimationFrame(function () {
          requestAnimationFrame(function () { grid.classList.remove('is-in'); });
        });
      }, 350);
    }

    function render(groupId) {
      var names = REF_NAMES[groupId] || [];
      var tags = REF_TAGS[groupId] || [];
      grid.innerHTML = '';

      for (var i = 1; i <= REF_PER_GROUP; i++) {
        var code = groupId + i;
        var name = names[i - 1] || code;
        var tagList = tags[i - 1] || ['#쌍커풀'];

        var card = document.createElement('article');
        card.className = 'ref-card';

        var frame = document.createElement('div');
        frame.className = 'media media--clickable';
        frame.tabIndex = 0;
        frame.setAttribute('role', 'button');
        frame.setAttribute('aria-label', name + ' 이미지 크게 보기');
        frame.dataset.name = name + ' (' + code + ')';
        frame.dataset.tags = tagList.join('|');

        var img = document.createElement('img');
        img.loading = 'lazy';
        img.src = REF_IMG_BASE + '/' + groupId + '/' + code + '.jpg';
        img.alt = name;
        frame.appendChild(img);

        var meta = document.createElement('div');
        meta.className = 'ref-card__meta';

        var nameEl = document.createElement('div');
        nameEl.className = 'ref-card__name';
        nameEl.textContent = name;

        var tagsEl = document.createElement('div');
        tagsEl.className = 'ref-card__tags';
        tagList.forEach(function (t) {
          var chip = document.createElement('span');
          chip.className = 'tag-chip';
          chip.textContent = t;
          tagsEl.appendChild(chip);
        });

        meta.appendChild(nameEl);
        meta.appendChild(tagsEl);
        card.appendChild(frame);
        card.appendChild(meta);
        grid.appendChild(card);

        /* 확대 뷰에서 그룹 10인을 좌·우로 넘길 수 있도록 목록째 넘긴다 */
        (function (at) {
          function fire() {
            if (lightbox) lightbox.open({ list: buildList(groupId), index: at });
          }
          frame.addEventListener('click', fire);
          frame.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); fire(); }
          });
        }(i - 1));
      }
    }

    render(REF_DEFAULT);
    /* 레이아웃이 잡힌 뒤라야 폭 계산이 맞는다 */
    if (defaultBtn) requestAnimationFrame(function () { centerTab(defaultBtn); });
  }

  /* ---- 문의 폼 ----------------------------------------------------------
     백엔드 없는 정적 사이트이므로 제출을 메일 클라이언트로 넘긴다.
     폼 서비스(예: Web3Forms) 키를 받으면 action/method로 교체하면 된다. */
  function initContactForm() {
    var form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      function val(name) {
        var f = form.elements[name];
        return f ? f.value.trim() : '';
      }
      var body = [
        '이름: ' + val('name'),
        '연락처: ' + val('phone'),
        '',
        val('message')
      ].join('\r\n');

      window.location.href = 'mailto:airpass@cfpass.com'
        + '?subject=' + encodeURIComponent('[CFPASS] 영상 제작 문의 — ' + val('name'))
        + '&body=' + encodeURIComponent(body);
    });
  }

  /* ---- 섹션 스크롤 락 (imw-promotion 방식) -----------------------------
     한 번의 휠·키 입력에 한 섹션씩 이동하고, 그 사이 위치에는 멈추지 않는다.
     imw는 섹션이 전부 100vh라 `index * innerHeight`로 목표를 잡지만,
     여기 섹션들은 높이가 제각각이라 실측 offsetTop을 쓴다.
     섹션별 미세 보정은 마크업의 data-snap-offset(px)으로 준다. */
  function initScrollLock() {
    var sections = Array.prototype.slice.call(document.querySelectorAll('main > section'));
    var footer = document.querySelector('.site-footer');
    if (sections.length < 2 || prefersReduced) return;

    var LOCK_MS = 900;      /* 스무스 스크롤이 끝날 때까지 추가 입력을 삼킨다 */
    var WHEEL_MIN = 8;      /* 트랙패드 미세 관성 무시 */
    var locked = false;
    var idx = 0;
    var last = sections.length - 1 + (footer ? 1 : 0);

    /* 커서 아래에 '세로로' 스크롤 가능한 조상이 있는지 */
    function scrollsVertically(node) {
      while (node && node !== document.body && node.nodeType === 1) {
        if (node.scrollHeight > node.clientHeight + 1) {
          var oy = getComputedStyle(node).overflowY;
          if (oy === 'auto' || oy === 'scroll') return true;
        }
        node = node.parentElement;
      }
      return false;
    }

    /* 데스크톱에서만 잠근다 — 모바일은 자유 스크롤이 낫다.
       판정은 CSS 브레이크포인트와 같은 곳(isMobile)을 본다 */
    function on() { return !isMobile(); }

    function targetOf(i) {
      if (footer && i === sections.length) {
        return document.documentElement.scrollHeight - window.innerHeight;
      }
      var sec = sections[i];
      var top = sec.getBoundingClientRect().top + window.scrollY;
      var slack = window.innerHeight - sec.offsetHeight;
      /* 화면보다 짧은 섹션은 남는 만큼 위아래로 나눠 정중앙에 놓는다 */
      if (slack > 0) top -= slack / 2;
      return Math.round(top + (parseInt(sec.dataset.snapOffset, 10) || 0));
    }

    /* 새로고침·앵커 진입 등 외부 요인으로 위치가 바뀌었을 때 인덱스를 되찾는다 */
    function nearest() {
      var y = window.scrollY, best = 0, bestD = Infinity;
      for (var i = 0; i <= last; i++) {
        var d = Math.abs(targetOf(i) - y);
        if (d < bestD) { bestD = d; best = i; }
      }
      return best;
    }

    function go(i) {
      i = Math.max(0, Math.min(last, i));
      if (i === idx && !locked) {
        /* 같은 칸이라도 어긋나 있으면 제자리로 되돌린다 */
        if (Math.abs(window.scrollY - targetOf(i)) < 4) return;
      }
      idx = i;
      locked = true;
      window.scrollTo({ top: targetOf(i), behavior: 'smooth' });
      setTimeout(function () { locked = false; }, LOCK_MS);
    }

    window.addEventListener('wheel', function (e) {
      if (!on()) return;
      /* 라이트박스가 떠 있거나, 세로로 스크롤되는 영역 위면 넘긴다.
         클립 레일처럼 가로로만 스크롤되는 곳은 넘기면 안 된다 — 휠이 아무 데도
         쓰이지 않아 섹션 이동이 막힌다. */
      if (document.body.classList.contains('u-no-scroll')) return;
      if (scrollsVertically(e.target)) return;
      e.preventDefault();
      if (locked || Math.abs(e.deltaY) < WHEEL_MIN) return;
      go(nearest() + (e.deltaY > 0 ? 1 : -1));
    }, { passive: false });

    window.addEventListener('keydown', function (e) {
      if (!on() || locked) return;
      var t = e.target.tagName;
      if (t === 'INPUT' || t === 'TEXTAREA' || t === 'SELECT') return;
      if (e.key === 'PageDown' || e.key === 'ArrowDown') { e.preventDefault(); go(nearest() + 1); }
      else if (e.key === 'PageUp' || e.key === 'ArrowUp') { e.preventDefault(); go(nearest() - 1); }
      else if (e.key === 'Home') { e.preventDefault(); go(0); }
      else if (e.key === 'End') { e.preventDefault(); go(last); }
    });

    /* nav·브랜드·to-top 등 앵커 이동도 같은 목표점을 쓰게 가로챈다 */
    document.addEventListener('click', function (e) {
      if (!on()) return;
      var a = e.target.closest && e.target.closest('a[href^="#"]');
      if (!a) return;
      var sec = document.querySelector(a.getAttribute('href'));
      var i = sections.indexOf(sec);
      if (i < 0) return;
      e.preventDefault();
      go(i);
    });

    window.addEventListener('resize', function () { idx = nearest(); });
    idx = nearest();
  }

  document.addEventListener('DOMContentLoaded', function () {
    initScrollSpy();
    initLightbox();
    initReference();   /* 라이트박스 초기화 이후에 호출 — bindFrame이 lightbox를 참조 */
    initFloatNav();
    initMarquee();     /* 복제 먼저 — initLazyMedia가 복제본까지 관찰하도록 */
    initLazyMedia();
    initReveal();
    initPanels();
    initServices();
    Array.prototype.forEach.call(
      document.querySelectorAll('[data-coverflow]'), initCoverflow
    );
    initContactForm();
    initScrollLock();
  });
})();
