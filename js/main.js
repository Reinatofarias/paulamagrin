/* ═══════════════════════════════════════════════════════
   MAIN.JS — Landing Page Orchestrator
   ═══════════════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ─── DOM Ready ─── */
  document.addEventListener('DOMContentLoaded', init);

  function init() {
    initFloatingCTA();
    initMobileMenu();
    initSmoothScroll();
    initScrollHistory();
    initScrollAnimations();
    initFAQ();
    initModal();
    initForm();
    initTracking();
    initCoverflowCarousel();
    initLightbox();
    initAudioPlayers();
  }

  /* ═══════════════════════════════════════════════════
     FLOATING CTA
     ═══════════════════════════════════════════════════ */

  function initFloatingCTA() {
    var floatingCTA = document.querySelector('.floating-cta');
    if (!floatingCTA) return;

    var hero = document.querySelector('.hero');
    var finalCTA = document.querySelector('.final-cta');
    var isVisible = false;

    function checkScroll() {
      var scrollY = window.scrollY || window.pageYOffset;
      var heroBottom = hero ? hero.offsetTop + hero.offsetHeight : window.innerHeight;
      var finalCTATop = finalCTA ? finalCTA.offsetTop - window.innerHeight : Infinity;

      var shouldShow = scrollY > heroBottom * 0.7 && scrollY < finalCTATop;

      if (shouldShow !== isVisible) {
        isVisible = shouldShow;
        if (isVisible) {
          floatingCTA.classList.add('is-visible');
        } else {
          floatingCTA.classList.remove('is-visible');
        }
      }
    }

    var ticking = false;
    window.addEventListener('scroll', function () {
      if (!ticking) {
        window.requestAnimationFrame(function () {
          checkScroll();
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });

    checkScroll();
  }

  /* ═══════════════════════════════════════════════════
     SMOOTH SCROLL
     ═══════════════════════════════════════════════════ */

  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function (link) {
      link.addEventListener('click', function (e) {
        var targetId = this.getAttribute('href');
        if (targetId === '#') return;
        var target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }

  /* ═══════════════════════════════════════════════════
     MOBILE MENU TOGGLE
     ═══════════════════════════════════════════════════ */

  function initMobileMenu() {
    var toggleBtn = document.querySelector('.header__toggle');
    var nav = document.querySelector('.header__nav');
    var header = document.querySelector('.header');
    if (!toggleBtn || !nav || !header) return;

    toggleBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      var expanded = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', !expanded);
      nav.classList.toggle('is-active');
      header.classList.toggle('is-menu-open');
    });

    // Close menu when clicking on a link
    nav.querySelectorAll('a, button').forEach(function (element) {
      element.addEventListener('click', function () {
        toggleBtn.setAttribute('aria-expanded', 'false');
        nav.classList.remove('is-active');
        header.classList.remove('is-menu-open');
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function (e) {
      if (nav.classList.contains('is-active') && !nav.contains(e.target) && !toggleBtn.contains(e.target)) {
        toggleBtn.setAttribute('aria-expanded', 'false');
        nav.classList.remove('is-active');
        header.classList.remove('is-menu-open');
      }
    });
  }

  /* ═══════════════════════════════════════════════════
     SCROLL HISTORY (SCROLL SPY)
     ═══════════════════════════════════════════════════ */

  function initScrollHistory() {
    var sections = document.querySelectorAll('section[id]');
    if (!sections.length || !('IntersectionObserver' in window)) return;

    var observerOptions = {
      root: null,
      rootMargin: '-40% 0px -50% 0px', // Trigger when section is in the middle third
      threshold: 0
    };

    var activeSectionId = '';

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var id = entry.target.getAttribute('id');
          if (id && id !== activeSectionId) {
            activeSectionId = id;
            
            // Update URL hash quietly without jumping
            if (history.replaceState) {
              history.replaceState(null, null, '#' + id);
            } else {
              window.location.hash = id;
            }

            // Sync menu active state highlighting
            updateActiveNavLink(id);
          }
        }
      });
    }, observerOptions);

    sections.forEach(function (section) {
      observer.observe(section);
    });

    function updateActiveNavLink(id) {
      document.querySelectorAll('.header__nav a').forEach(function (link) {
        var href = link.getAttribute('href');
        if (href === '#' + id) {
          link.classList.add('is-active');
        } else {
          link.classList.remove('is-active');
        }
      });
    }
  }

  /* ═══════════════════════════════════════════════════
     SCROLL ANIMATIONS (Intersection Observer)
     ═══════════════════════════════════════════════════ */

  function initScrollAnimations() {
    if (!('IntersectionObserver' in window)) {
      // Fallback: show everything immediately
      document.querySelectorAll('.animate-on-scroll, .animate-slide-right, .animate-slide-left, .animate-scale, .animate-fade, .line-draw').forEach(function (el) {
        el.classList.add('is-visible');
      });
      return;
    }

    var observerOptions = {
      root: null,
      rootMargin: '0px 0px -40px 0px',
      threshold: 0.05
    };

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        var rect = entry.boundingClientRect;
        var windowHeight = window.innerHeight || document.documentElement.clientHeight;

        if (entry.isIntersecting) {
          // Entering or in viewport: animate in
          entry.target.classList.add('is-visible');
        } else {
          // Exited viewport: only remove is-visible if exiting through the BOTTOM of the viewport
          // (user scrolled back up past the element).
          // Do NOT remove if it exited past the TOP of the screen (rect.top < 0 - user scrolling down).
          if (rect.top > 0 && rect.top >= windowHeight - 80) {
            entry.target.classList.remove('is-visible');
          }
        }
      });
    }, observerOptions);

    document.querySelectorAll('.animate-on-scroll, .animate-slide-right, .animate-slide-left, .animate-scale, .animate-fade, .line-draw').forEach(function (el) {
      observer.observe(el);
    });
  }

  /* ═══════════════════════════════════════════════════
     FAQ ACCORDION
     ═══════════════════════════════════════════════════ */

  function initFAQ() {
    document.querySelectorAll('.faq-item__question').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var item = this.closest('.faq-item');
        var isOpen = item.classList.contains('is-open');

        // Close all others
        document.querySelectorAll('.faq-item.is-open').forEach(function (openItem) {
          if (openItem !== item) {
            openItem.classList.remove('is-open');
            openItem.querySelector('.faq-item__question').setAttribute('aria-expanded', 'false');
          }
        });

        // Toggle current
        item.classList.toggle('is-open');
        this.setAttribute('aria-expanded', !isOpen);
      });
    });
  }

  /* ═══════════════════════════════════════════════════
     MODAL
     ═══════════════════════════════════════════════════ */

  function initModal() {
    var overlay = document.getElementById('modal-overlay');
    if (!overlay) return;

    var modal = overlay.querySelector('.modal');

    // Open triggers
    document.querySelectorAll('[data-open-modal]').forEach(function (trigger) {
      trigger.addEventListener('click', function (e) {
        e.preventDefault();
        openModal();

        // Track CTA click
        var location = this.getAttribute('data-cta-location') || 'unknown';
        pushDataLayer('cta_click', {
          cta_text: this.textContent.trim(),
          cta_location: location
        });
      });
    });

    // Close triggers
    document.querySelectorAll('[data-close-modal]').forEach(function (trigger) {
      trigger.addEventListener('click', function () {
        closeModal();
      });
    });

    // Click outside
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) {
        closeModal();
      }
    });

    // Escape key
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && overlay.classList.contains('is-open')) {
        closeModal();
      }
    });

    function openModal() {
      overlay.classList.add('is-open');
      document.body.style.overflow = 'hidden';
      // Focus first input
      setTimeout(function () {
        var firstInput = modal.querySelector('input, select, textarea');
        if (firstInput) firstInput.focus();
      }, 400);
    }

    function closeModal() {
      overlay.classList.remove('is-open');
      document.body.style.overflow = '';
    }

    // Expose globally for form success
    window.closeFormModal = closeModal;
  }

  /* ═══════════════════════════════════════════════════
     FORM
     ═══════════════════════════════════════════════════ */

  function initForm() {
    var form = document.getElementById('lead-form');
    if (!form) return;

    var formStarted = false;

    // Phone mask
    var phoneInput = form.querySelector('[name="whatsapp"]');
    if (phoneInput) {
      phoneInput.addEventListener('input', function () {
        var value = this.value.replace(/\D/g, '');
        if (value.length <= 2) {
          this.value = value.length > 0 ? '(' + value : '';
        } else if (value.length <= 7) {
          this.value = '(' + value.substring(0, 2) + ') ' + value.substring(2);
        } else if (value.length <= 11) {
          this.value = '(' + value.substring(0, 2) + ') ' + value.substring(2, 7) + '-' + value.substring(7);
        } else {
          this.value = '(' + value.substring(0, 2) + ') ' + value.substring(2, 7) + '-' + value.substring(7, 11);
        }
      });
    }

    // Track form start
    form.addEventListener('focusin', function () {
      if (!formStarted) {
        formStarted = true;
        pushDataLayer('form_start', { form_name: 'lead_capture' });
      }
    });

    // Populate hidden UTM fields
    populateUTMFields(form);

    // Submit
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      if (!validateForm(form)) return;

      var formData = new FormData(form);
      var data = {};
      formData.forEach(function (value, key) {
        data[key] = value;
      });

      // Track form submit
      pushDataLayer('form_submit', {
        form_name: 'lead_capture',
        qualification_answer: data.momento || ''
      });

      // Track lead
      pushDataLayer('generate_lead', {
        lead_source: getUTM('utm_source') || 'direct',
        lead_qualification: data.momento || ''
      });

      // Show success state
      showFormSuccess();

      // Here you would send data to your backend
      // fetch('/api/lead', { method: 'POST', body: JSON.stringify(data), headers: { 'Content-Type': 'application/json' } })

      console.log('Lead captured:', data);
    });
  }

  function validateForm(form) {
    var isValid = true;

    // Reset errors
    form.querySelectorAll('.form-group').forEach(function (group) {
      group.classList.remove('has-error');
    });

    // Name
    var nameInput = form.querySelector('[name="nome"]');
    if (nameInput && nameInput.value.trim().length < 2) {
      nameInput.closest('.form-group').classList.add('has-error');
      isValid = false;
    }

    // WhatsApp
    var phoneInput = form.querySelector('[name="whatsapp"]');
    if (phoneInput) {
      var phoneDigits = phoneInput.value.replace(/\D/g, '');
      if (phoneDigits.length < 10) {
        phoneInput.closest('.form-group').classList.add('has-error');
        isValid = false;
      }
    }

    // Qualification
    var momentoSelect = form.querySelector('[name="momento"]');
    if (momentoSelect && !momentoSelect.value) {
      momentoSelect.closest('.form-group').classList.add('has-error');
      isValid = false;
    }

    return isValid;
  }

  function showFormSuccess() {
    var formEl = document.getElementById('lead-form');
    var successEl = document.getElementById('form-success');
    if (formEl) formEl.style.display = 'none';
    if (successEl) successEl.style.display = 'block';
  }

  /* ═══════════════════════════════════════════════════
     UTM HANDLING
     ═══════════════════════════════════════════════════ */

  function getUTM(param) {
    // First check sessionStorage
    var stored = sessionStorage.getItem(param);
    if (stored) return stored;

    // Then check URL
    var urlParams = new URLSearchParams(window.location.search);
    var value = urlParams.get(param);
    if (value) {
      sessionStorage.setItem(param, value);
    }
    return value || '';
  }

  function captureUTMs() {
    var params = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];
    var urlParams = new URLSearchParams(window.location.search);
    params.forEach(function (param) {
      var value = urlParams.get(param);
      if (value) {
        sessionStorage.setItem(param, value);
      }
    });
  }

  function populateUTMFields(form) {
    captureUTMs();
    var params = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];
    params.forEach(function (param) {
      var input = form.querySelector('[name="' + param + '"]');
      if (input) {
        input.value = getUTM(param);
      }
    });

    // Timestamp and referrer
    var tsInput = form.querySelector('[name="timestamp"]');
    if (tsInput) tsInput.value = new Date().toISOString();

    var refInput = form.querySelector('[name="referrer"]');
    if (refInput) refInput.value = document.referrer || 'direct';

    var devInput = form.querySelector('[name="device_type"]');
    if (devInput) devInput.value = window.innerWidth < 768 ? 'mobile' : window.innerWidth < 1024 ? 'tablet' : 'desktop';
  }

  /* ═══════════════════════════════════════════════════
     TRACKING (DataLayer)
     ═══════════════════════════════════════════════════ */

  function initTracking() {
    window.dataLayer = window.dataLayer || [];

    // Capture UTMs on load
    captureUTMs();

    // Page view
    pushDataLayer('page_view', {
      page_title: document.title,
      page_location: window.location.href,
      utm_source: getUTM('utm_source'),
      utm_medium: getUTM('utm_medium'),
      utm_campaign: getUTM('utm_campaign'),
      utm_content: getUTM('utm_content'),
      utm_term: getUTM('utm_term')
    });

    // Scroll depth tracking
    initScrollDepth();
  }

  function pushDataLayer(event, data) {
    window.dataLayer = window.dataLayer || [];
    var payload = { event: event };
    if (data) {
      Object.keys(data).forEach(function (key) {
        payload[key] = data[key];
      });
    }
    window.dataLayer.push(payload);
  }

  function initScrollDepth() {
    var milestones = [25, 50, 75, 100];
    var reached = {};

    var ticking = false;
    window.addEventListener('scroll', function () {
      if (!ticking) {
        window.requestAnimationFrame(function () {
          var scrollTop = window.scrollY || window.pageYOffset;
          var docHeight = document.documentElement.scrollHeight - window.innerHeight;
          var scrollPercent = Math.round((scrollTop / docHeight) * 100);

          milestones.forEach(function (milestone) {
            if (scrollPercent >= milestone && !reached[milestone]) {
              reached[milestone] = true;
              pushDataLayer('scroll_depth', { scroll_percentage: milestone });

              // ViewContent at 50%
              if (milestone === 50) {
                pushDataLayer('view_content', {});
              }
            }
          });

          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  // Expose pushDataLayer globally
  window.pushDataLayer = pushDataLayer;

  /* ═══════════════════════════════════════════════════
     3D COVERFLOW CAROUSEL
     ═══════════════════════════════════════════════════ */

  function initCoverflowCarousel() {
    var track = document.getElementById('coverflow-track');
    if (!track) return;

    var slides = Array.from(track.querySelectorAll('.coverflow-slide'));
    if (!slides.length) return;

    var prevBtn = document.querySelector('.coverflow-prev');
    var nextBtn = document.querySelector('.coverflow-next');
    var dotsContainer = document.getElementById('coverflow-dots');
    var currentIndex = Math.floor(slides.length / 2); // Start near the middle or index 0

    // Create pagination dots
    if (dotsContainer) {
      dotsContainer.innerHTML = '';
      slides.forEach(function (_, idx) {
        var dot = document.createElement('button');
        dot.className = 'coverflow-dot' + (idx === currentIndex ? ' is-active' : '');
        dot.setAttribute('type', 'button');
        dot.setAttribute('aria-label', 'Ir para depoimento ' + (idx + 1));
        dot.addEventListener('click', function () {
          goToSlide(idx);
        });
        dotsContainer.appendChild(dot);
      });
    }

    function updateCarousel() {
      var isMobile = window.innerWidth < 640;
      var spacing = isMobile ? 100 : 150;
      var scaleStep = isMobile ? 0.14 : 0.13;
      var rotStep = isMobile ? 12 : 18;

      slides.forEach(function (slide, idx) {
        var diff = idx - currentIndex;
        var absDiff = Math.abs(diff);

        if (absDiff > 3) {
          // Hide far away slides to keep DOM light
          slide.style.opacity = '0';
          slide.style.pointerEvents = 'none';
          slide.style.transform = 'translateX(0) scale(0.4) translateZ(-400px)';
          slide.classList.remove('is-center', 'is-prev', 'is-next');
          return;
        }

        slide.style.pointerEvents = 'auto';
        slide.classList.remove('is-center', 'is-prev', 'is-next');

        if (diff === 0) {
          // Center active slide
          slide.classList.add('is-center');
          slide.style.zIndex = '10';
          slide.style.opacity = '1';
          slide.style.transform = 'translateX(0px) scale(1) translateZ(0px) rotateY(0deg)';
        } else {
          // Side stacked slides
          var direction = diff > 0 ? 1 : -1;
          var xShift = diff * spacing;
          var scale = Math.max(0.65, 1 - absDiff * scaleStep);
          var zShift = -absDiff * 110;
          var rotY = -direction * rotStep;
          var opacity = Math.max(0.25, 1 - absDiff * 0.32);

          if (diff === -1) slide.classList.add('is-prev');
          if (diff === 1) slide.classList.add('is-next');

          slide.style.zIndex = String(10 - absDiff);
          slide.style.opacity = String(opacity);
          slide.style.transform = 'translateX(' + xShift + 'px) scale(' + scale + ') translateZ(' + zShift + 'px) rotateY(' + rotY + 'deg)';
        }
      });

      // Update dots
      if (dotsContainer) {
        var dots = dotsContainer.querySelectorAll('.coverflow-dot');
        dots.forEach(function (dot, idx) {
          if (idx === currentIndex) {
            dot.classList.add('is-active');
          } else {
            dot.classList.remove('is-active');
          }
        });
      }
    }

    function goToSlide(index) {
      if (index < 0) {
        currentIndex = slides.length - 1;
      } else if (index >= slides.length) {
        currentIndex = 0;
      } else {
        currentIndex = index;
      }
      updateCarousel();
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', function () {
        goToSlide(currentIndex - 1);
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', function () {
        goToSlide(currentIndex + 1);
      });
    }

    // Click on side slide to make it center, or click center to open lightbox
    slides.forEach(function (slide, idx) {
      slide.addEventListener('click', function () {
        if (idx !== currentIndex) {
          goToSlide(idx);
        } else {
          var img = slide.querySelector('img');
          if (img && img.src) {
            openLightbox(img.src);
          }
        }
      });
    });

    // Touch / Swipe gestures
    var startX = 0;
    var currentX = 0;
    var isDragging = false;

    track.addEventListener('touchstart', function (e) {
      startX = e.touches[0].clientX;
      isDragging = true;
    }, { passive: true });

    track.addEventListener('touchmove', function (e) {
      if (!isDragging) return;
      currentX = e.touches[0].clientX;
    }, { passive: true });

    track.addEventListener('touchend', function () {
      if (!isDragging) return;
      var diff = startX - currentX;
      if (Math.abs(diff) > 35) {
        if (diff > 0) {
          goToSlide(currentIndex + 1);
        } else {
          goToSlide(currentIndex - 1);
        }
      }
      isDragging = false;
    });

    // Window resize handler
    window.addEventListener('resize', function () {
      updateCarousel();
    });

    // Initial positioning
    updateCarousel();
  }

  /* ═══════════════════════════════════════════════════
     LIGHTBOX MODAL
     ═══════════════════════════════════════════════════ */

  function openLightbox(src) {
    var modal = document.getElementById('lightbox-modal');
    var img = document.getElementById('lightbox-img');
    if (!modal || !img) return;

    img.src = src;
    modal.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  function initLightbox() {
    var modal = document.getElementById('lightbox-modal');
    var closeBtn = document.getElementById('lightbox-close');
    if (!modal) return;

    function close() {
      modal.classList.remove('is-open');
      document.body.style.overflow = '';
    }

    if (closeBtn) {
      closeBtn.addEventListener('click', close);
    }

    modal.addEventListener('click', function (e) {
      if (e.target === modal) {
        close();
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && modal.classList.contains('is-open')) {
        close();
      }
    });
  }

  /* ═══════════════════════════════════════════════════
     CUSTOM AUDIO PLAYERS
     ═══════════════════════════════════════════════════ */

  function initAudioPlayers() {
    var cards = document.querySelectorAll('.audio-card');
    if (!cards.length) return;

    cards.forEach(function (card) {
      var btn = card.querySelector('.audio-card__play-btn');
      var audio = card.querySelector('.audio-card__native');
      var progressFill = card.querySelector('.audio-card__progress-fill');
      var progressContainer = card.querySelector('.audio-card__progress-container');
      var durationEl = card.querySelector('.audio-card__duration');
      var iconPlay = card.querySelector('.icon-play');
      var iconPause = card.querySelector('.icon-pause');

      if (!btn || !audio) return;

      // Update total duration once metadata loads
      audio.addEventListener('loadedmetadata', function () {
        if (durationEl && audio.duration) {
          durationEl.textContent = formatTime(audio.duration);
        }
      });

      // Play/Pause Toggle
      btn.addEventListener('click', function () {
        if (audio.paused) {
          // Pause all other playing audios
          document.querySelectorAll('.audio-card__native').forEach(function (otherAudio) {
            if (otherAudio !== audio && !otherAudio.paused) {
              otherAudio.pause();
            }
          });
          document.querySelectorAll('.audio-card').forEach(function (otherCard) {
            if (otherCard !== card) {
              otherCard.classList.remove('is-playing');
              var otherPlay = otherCard.querySelector('.icon-play');
              var otherPause = otherCard.querySelector('.icon-pause');
              if (otherPlay) otherPlay.style.display = 'block';
              if (otherPause) otherPause.style.display = 'none';
            }
          });

          audio.play();
          card.classList.add('is-playing');
          if (iconPlay) iconPlay.style.display = 'none';
          if (iconPause) iconPause.style.display = 'block';
        } else {
          audio.pause();
          card.classList.remove('is-playing');
          if (iconPlay) iconPlay.style.display = 'block';
          if (iconPause) iconPause.style.display = 'none';
        }
      });

      // Time Update
      audio.addEventListener('timeupdate', function () {
        if (!audio.duration) return;
        var pct = (audio.currentTime / audio.duration) * 100;
        if (progressFill) progressFill.style.width = pct + '%';
        if (durationEl) durationEl.textContent = formatTime(audio.currentTime) + ' / ' + formatTime(audio.duration);
      });

      // Audio Ended
      audio.addEventListener('ended', function () {
        card.classList.remove('is-playing');
        if (progressFill) progressFill.style.width = '0%';
        if (iconPlay) iconPlay.style.display = 'block';
        if (iconPause) iconPause.style.display = 'none';
        if (durationEl && audio.duration) durationEl.textContent = formatTime(audio.duration);
      });

      // Seek on progress container click
      if (progressContainer) {
        progressContainer.addEventListener('click', function (e) {
          var rect = progressContainer.getBoundingClientRect();
          var clickX = e.clientX - rect.left;
          var width = rect.width;
          if (width > 0 && audio.duration) {
            audio.currentTime = (clickX / width) * audio.duration;
          }
        });
      }
    });

    function formatTime(seconds) {
      var mins = Math.floor(seconds / 60);
      var secs = Math.floor(seconds % 60);
      return mins + ':' + (secs < 10 ? '0' : '') + secs;
    }
  }

})();
