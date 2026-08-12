/* ═══════════════════════════════════════════════════════
   MAIN.JS — Landing Page Orchestrator
   ═══════════════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ─── DOM Ready ─── */
  document.addEventListener('DOMContentLoaded', init);

  function init() {
    initFloatingCTA();
    initSmoothScroll();
    initScrollAnimations();
    initFAQ();
    initModal();
    initForm();
    initTracking();
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

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

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
    var radioChecked = form.querySelector('[name="momento"]:checked');
    if (!radioChecked) {
      var radioGroup = form.querySelector('.form-group--radio');
      if (radioGroup) radioGroup.classList.add('has-error');
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

})();
