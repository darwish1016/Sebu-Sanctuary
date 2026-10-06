/* =========================================================
   Sebu Sanctuary: Homepage interactions
   ========================================================= */
(function () {
  "use strict";

  var BOOKING_EMAIL = "sebusantuary@me.com";
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var $ = function (sel, ctx) { return (ctx || document).querySelector(sel); };
  var $$ = function (sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); };

  /* ---------- Photo galleries (files live in /images) ---------- */
  var GALLERIES = {
    rooms: [
      { src: "images/rooms/bedroom-one-view.jpg", caption: "Bedroom One: wake up to the pool and the mountains" },
      { src: "images/rooms/bedroom-one.jpg", caption: "Bedroom One: calm, comfortable and private" },
      { src: "images/rooms/bedroom-one-view-tall.jpg", caption: "The view from Bedroom One" }
    ],
    pool: [
      { src: "images/pool/infinity-pool.jpg", caption: "The infinity pool" },
      { src: "images/pool/guest-relaxing-pool.jpg", caption: "Golden hour at the pool's edge" },
      { src: "images/views/drone-sunset.jpg", caption: "Sebu Sanctuary from above at sunset" }
    ],
    cr: [
      { src: "images/bathrooms/cr-bedroom-one-1.jpg", caption: "Comfort room, Bedroom One" },
      { src: "images/bathrooms/cr-bedroom-one-2.jpg", caption: "Comfort room, Bedroom One, with a garden view" },
      { src: "images/bathrooms/cr-bedroom-two.jpg", caption: "Comfort room, Bedroom Two" },
      { src: "images/bathrooms/cr-bedroom-two-tall.jpg", caption: "Comfort room, Bedroom Two, shower and vanity" }
    ],
    dining: [
      { src: "images/views/guest-enjoying-view.jpg", caption: "Dining with a view over the valley" },
      { src: "images/kitchen/poolside-breakfast.jpg", caption: "Breakfast by the pool" }
    ],
    kitchen: [
      { src: "images/kitchen/kitchen-view.jpg", caption: "The open kitchen" }
    ],
    maps: [
      { src: "images/location/map-philippines.jpg", caption: "Lake Sebu, South Cotabato, on the island of Mindanao" },
      { src: "images/location/map-to-seven-falls.jpg", caption: "Route from Sebu Sanctuary to the Seven Falls" },
      { src: "images/location/map-to-markets.jpg", caption: "Route from Sebu Sanctuary to the local markets" }
    ],
    walks: [
      { src: "images/views/walk-misty-morning.jpg", caption: "Misty morning on the walk behind the sanctuary" },
      { src: "images/views/walk-sunset.jpg", caption: "Sunset over the hills" },
      { src: "images/views/walk-mountain-view.jpg", caption: "Mountain views from the trail" }
    ],
    butterflies: [
      { src: "images/views/butterfly-1.jpg", caption: "Butterflies of the region" },
      { src: "images/views/butterfly-2.jpg", caption: "Butterflies of the region" },
      { src: "images/views/butterfly-3.jpg", caption: "Butterflies of the region" }
    ]
  };

  /* ---------- Header: solid on scroll ---------- */
  var header = $(".site-header");
  var mobileCta = $("#mobile-cta");
  var hero = $(".hero, .page-hero");
  var contact = $("#contact");

  function onScroll() {
    var y = window.scrollY;
    header.classList.toggle("scrolled", y > 40);

    // Mobile sticky CTA: show after hero, hide while the contact form is on screen
    if (mobileCta) {
      var pastHero = y > hero.offsetHeight * 0.6;
      var cRect = contact && contact.getBoundingClientRect();
      var atContact = !!cRect && cRect.top < window.innerHeight && cRect.bottom > 0;
      mobileCta.classList.toggle("show", pastHero && !atContact);
    }
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile nav ---------- */
  var toggle = $("#nav-toggle");
  var nav = $("#main-nav");

  function setNav(open) {
    document.body.classList.toggle("nav-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    document.body.style.overflow = open ? "hidden" : "";
  }
  toggle.addEventListener("click", function () {
    setNav(!document.body.classList.contains("nav-open"));
  });
  $$("a", nav).forEach(function (a) { a.addEventListener("click", function () { setNav(false); }); });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && document.body.classList.contains("nav-open")) setNav(false);
  });

  /* ---------- Active nav link ---------- */
  var navLinks = $$('.main-nav a:not(.btn)');
  if ("IntersectionObserver" in window) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        navLinks.forEach(function (a) {
          a.classList.toggle("active", a.getAttribute("href") === "#" + entry.target.id);
        });
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    ["stay", "pool", "dining", "menu", "contact"].forEach(function (id) {
      var el = document.getElementById(id);
      if (el) spy.observe(el);
    });
  }

  /* ---------- Scroll reveal ---------- */
  var reveals = $$(".reveal");
  if ("IntersectionObserver" in window && !reduceMotion) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        // stagger siblings that reveal together
        var siblings = $$(".reveal", el.parentElement);
        var idx = Math.max(0, siblings.indexOf(el));
        el.style.transitionDelay = Math.min(idx * 90, 360) + "ms";
        el.classList.add("in");
        io.unobserve(el);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("in"); });
  }

  /* ---------- Pool parallax ---------- */
  var poolMedia = $(".pool-media");
  if (poolMedia && !reduceMotion) {
    var ticking = false;
    var updateParallax = function () {
      var r = poolMedia.parentElement.getBoundingClientRect();
      if (r.bottom > 0 && r.top < window.innerHeight) {
        var progress = (r.top + r.height / 2 - window.innerHeight / 2) / window.innerHeight;
        poolMedia.style.transform = "translate3d(0," + (progress * -60).toFixed(1) + "px,0)";
      }
      ticking = false;
    };
    window.addEventListener("scroll", function () {
      if (!ticking) { ticking = true; requestAnimationFrame(updateParallax); }
    }, { passive: true });
    updateParallax();
  }

  /* =========================================================
     Homepage-only features (booking, menu, gallery)
     ========================================================= */
  if (document.getElementById("enquiry")) initHomePage();

  function initHomePage() {
    /* ---------- Dates: sensible defaults & limits ---------- */
    function iso(d) {
      var m = String(d.getMonth() + 1).padStart(2, "0");
      var day = String(d.getDate()).padStart(2, "0");
      return d.getFullYear() + "-" + m + "-" + day;
    }
    var today = new Date();
    var todayIso = iso(today);

    function linkDates(inEl, outEl) {
      inEl.min = todayIso;
      outEl.min = todayIso;
      inEl.addEventListener("change", function () {
        if (!inEl.value) return;
        var next = new Date(inEl.value + "T00:00:00");
        next.setDate(next.getDate() + 1);
        outEl.min = iso(next);
        if (!outEl.value || outEl.value <= inEl.value) outEl.value = iso(next);
      });
    }
    linkDates($("#qb-in"), $("#qb-out"));
    linkDates($("#f-in"), $("#f-out"));

    /* ---------- Guest counters (− / number / +) ---------- */
    function clampGuests(input) {
      var min = +input.min || 1, max = +input.max || 20;
      var n = Math.round(+input.value);
      if (!isFinite(n) || n < min) n = min;
      if (n > max) n = max;
      input.value = n;
      var wrap = input.closest(".stepper");
      $(".step-btn[data-step='-1']", wrap).disabled = n <= min;
      $(".step-btn[data-step='1']", wrap).disabled = n >= max;
      return n;
    }
    $$(".stepper input").forEach(function (input) {
      clampGuests(input);
      input.addEventListener("change", function () { clampGuests(input); });
      input.addEventListener("blur", function () { clampGuests(input); });
    });
    $$(".step-btn").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var input = document.getElementById(btn.getAttribute("aria-controls"));
        input.value = (+input.value || 0) + +btn.dataset.step;
        clampGuests(input);
      });
    });
    function guestLabel(n) { return n + (+n === 1 ? " guest" : " guests"); }

    /* ---------- Quick booking bar → fills enquiry form ---------- */
    $("#quick-book").addEventListener("submit", function (e) {
      e.preventDefault();
      var qIn = $("#qb-in").value, qOut = $("#qb-out").value;
      if (qIn) { $("#f-in").value = qIn; $("#f-in").dispatchEvent(new Event("change")); }
      if (qOut) $("#f-out").value = qOut;
      $("#f-guests").value = clampGuests($("#qb-guests"));
      clampGuests($("#f-guests"));

      contact.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
      setTimeout(function () { $("#f-name").focus({ preventScroll: true }); }, reduceMotion ? 0 : 700);
      showToast(qIn && qOut ? "Great choice! Add your details to send the enquiry." : "Tell us your dates and details below.");
    });

    /* ---------- Enquiry form → pre-filled email ---------- */
    var form = $("#enquiry");
    var errorEl = $("#form-error");

    function fmtDate(v) {
      if (!v) return "Not given";
      return new Date(v + "T00:00:00").toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short", year: "numeric" });
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var required = $$("[required]", form);
      var firstBad = null;
      required.forEach(function (el) {
        var bad = !el.value.trim() || (el.type === "email" && !/^\S+@\S+\.\S+$/.test(el.value));
        el.classList.toggle("invalid", bad);
        if (bad && !firstBad) firstBad = el;
      });
      if (firstBad) {
        errorEl.textContent = "Please fill in your name, a valid email and your dates.";
        errorEl.hidden = false;
        firstBad.focus();
        return;
      }
      errorEl.hidden = true;

      var d = Object.fromEntries(new FormData(form).entries());
      var nights = Math.round((new Date(d.checkout) - new Date(d.checkin)) / 86400000);
      var guests = guestLabel(clampGuests($("#f-guests")));
      var subject = "Booking enquiry: " + fmtDate(d.checkin) + " (" + guests + ")";
      var body = [
        "Hi JM,",
        "",
        "I'd like to enquire about a stay at Sebu Sanctuary.",
        "",
        "Name: " + d.name,
        "Email: " + d.email,
        "Phone / WhatsApp: " + (d.phone || "Not given"),
        "Travelling from: " + d.from,
        "Check-in: " + fmtDate(d.checkin),
        "Check-out: " + fmtDate(d.checkout) + (nights > 0 ? " (" + nights + " night" + (nights > 1 ? "s" : "") + ")" : ""),
        "Guests: " + guests,
        "",
        "Notes: " + (d.message || "None"),
        "",
        "Thank you!"
      ].join("\n");

      window.location.href = "mailto:" + BOOKING_EMAIL +
        "?subject=" + encodeURIComponent(subject) +
        "&body=" + encodeURIComponent(body);
      showToast("Opening your email app…");
    });

    $$("[required]", form).forEach(function (el) {
      el.addEventListener("input", function () { el.classList.remove("invalid"); });
    });

    /* ---------- Menu tabs (accessible) ---------- */
    var tabs = $$('.menu-tabs [role="tab"]');
    function selectTab(tab, focus) {
      tabs.forEach(function (t) {
        var on = t === tab;
        t.setAttribute("aria-selected", String(on));
        t.tabIndex = on ? 0 : -1;
        document.getElementById(t.getAttribute("aria-controls")).hidden = !on;
      });
      if (focus) tab.focus();
      openFirstDish(document.getElementById(tab.getAttribute("aria-controls")));
    }

    /* ---------- Menu dishes: dropdown with photo ---------- */
    function setDish(dish, open) {
      dish.classList.toggle("open", open);
      $(".dish-head", dish).setAttribute("aria-expanded", String(open));
    }
    function openFirstDish(panel) {
      if (panel && !$(".dish.open", panel)) setDish($(".dish", panel), true);
    }
    $$(".dish").forEach(function (dish) {
      $(".dish-head", dish).addEventListener("click", function () {
        var willOpen = !dish.classList.contains("open");
        // one dish open at a time per category
        $$(".dish.open", dish.parentElement).forEach(function (d) { setDish(d, false); });
        setDish(dish, willOpen);
      });
    });
    openFirstDish($(".menu-panel:not([hidden])"));

    tabs.forEach(function (tab, i) {
      tab.addEventListener("click", function () { selectTab(tab); });
      tab.addEventListener("keydown", function (e) {
        var n = null;
        if (e.key === "ArrowRight") n = tabs[(i + 1) % tabs.length];
        if (e.key === "ArrowLeft") n = tabs[(i - 1 + tabs.length) % tabs.length];
        if (e.key === "Home") n = tabs[0];
        if (e.key === "End") n = tabs[tabs.length - 1];
        if (n) { e.preventDefault(); selectTab(n, true); }
      });
    });

    /* ---------- Lightbox ---------- */
    var lb = $("#lightbox"), lbImg = $("#lb-img"), lbCap = $("#lb-caption");
    var current = [], index = 0, lastFocus = null;

    function render() {
      var item = current[index];
      lbImg.src = item.src;
      lbImg.alt = item.caption;
      lbCap.textContent = item.caption + "  ·  " + (index + 1) + " / " + current.length;
    }
    function openGallery(name) {
      current = GALLERIES[name] || [];
      if (!current.length) return;
      index = 0;
      lastFocus = document.activeElement;
      render();
      lb.hidden = false;
      document.body.style.overflow = "hidden";
      $("#lb-close").focus();
    }
    function closeGallery() {
      lb.hidden = true;
      document.body.style.overflow = "";
      if (lastFocus) lastFocus.focus();
    }
    function step(dir) { index = (index + dir + current.length) % current.length; render(); }

    $$("[data-gallery]").forEach(function (tile) {
      tile.addEventListener("click", function () { openGallery(tile.dataset.gallery); });
    });
    $$("[data-open-gallery]").forEach(function (link) {
      link.addEventListener("click", function (e) { e.preventDefault(); openGallery(link.dataset.openGallery); });
    });
    $("#lb-close").addEventListener("click", closeGallery);
    $("#lb-prev").addEventListener("click", function () { step(-1); });
    $("#lb-next").addEventListener("click", function () { step(1); });
    lb.addEventListener("click", function (e) { if (e.target === lb) closeGallery(); });
    document.addEventListener("keydown", function (e) {
      if (lb.hidden) return;
      if (e.key === "Escape") closeGallery();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
      if (e.key === "Tab") { // keep focus inside the dialog
        var f = [$("#lb-close"), $("#lb-prev"), $("#lb-next")];
        var i = f.indexOf(document.activeElement);
        e.preventDefault();
        f[(i + (e.shiftKey ? -1 : 1) + f.length) % f.length].focus();
      }
    });

    // swipe on touch devices
    var touchX = null;
    lb.addEventListener("touchstart", function (e) { touchX = e.touches[0].clientX; }, { passive: true });
    lb.addEventListener("touchend", function (e) {
      if (touchX === null) return;
      var dx = e.changedTouches[0].clientX - touchX;
      if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
      touchX = null;
    });
  }

  /* ---------- Toast ---------- */
  var toastEl = $("#toast"), toastTimer;
  function showToast(msg) {
    toastEl.textContent = msg;
    toastEl.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toastEl.classList.remove("show"); }, 3200);
  }

  /* ---------- Footer year ---------- */
  $("#year").textContent = new Date().getFullYear();
})();
