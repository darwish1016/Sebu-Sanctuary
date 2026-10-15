/* =========================================================
   Sebu Sanctuary: site interactions
   ========================================================= */
(function () {
  "use strict";

  /* =========================================================
     EDIT HERE: contact details and rates
     ========================================================= */
  var CONTACT = {
    email: "sebusantuary@me.com",
    whatsapp: "639000000000",   // TODO: JM's WhatsApp number (country code, no + or spaces)
    messenger: "61592510867921",  // Facebook page ID (or its username, if the page gets one) for m.me links
    facebook: "https://www.facebook.com/profile.php?id=61592510867921",
    phone: "+639000000000"      // TODO: JM's phone number
  };

  var RATES = {
    confirmed: false,           // TODO: set to true once the real prices below are confirmed
    currency: "₱",
    nightly: 6500,              // whole sanctuary, per night
    includedGuests: 6,          // guests included in the nightly rate
    extraGuest: 800,            // per extra guest, per night
    pickup: { oneway: 3500, "return": 6500 },   // General Santos airport transfer, per vehicle
    extras: {
      breakfast: { label: "Daily breakfast", price: 350, per: "guest-night" },
      falls: { label: "Seven Falls & zipline trip", price: 1500, per: "guest" },
      tboli: { label: "Tboli cultural visit", price: 1200, per: "guest" },
      photo: { label: "Photo walk with Kingsley", price: 2500, per: "group" }
    }
  };

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var $ = function (sel, ctx) { return (ctx || document).querySelector(sel); };
  var $$ = function (sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); };

  /* ---------- Photo galleries (files live in /images) ---------- */
  var GALLERIES = {
    rooms: [
      { src: "images/rooms/bedroom-two-looking-in.jpg", caption: "Bedroom Two, seen from the garden" },
      { src: "images/rooms/bedroom-two-lookout.jpg", caption: "The view from Bedroom Two" },
      { src: "images/rooms/bedroom-two-plant.jpg", caption: "Bedroom Two: fresh flowers and soft light" },
      { src: "images/rooms/bedroom-one-view.jpg", caption: "Bedroom One: wake up to the pool and the mountains" },
      { src: "images/rooms/bedroom-one.jpg", caption: "Bedroom One: calm, comfortable and private" },
      { src: "images/rooms/bedroom-one-view-tall.jpg", caption: "The view from Bedroom One" },
      { src: "images/rooms/bedroom-three.jpg", caption: "Bedroom Three" }
    ],
    pool: [
      { src: "images/pool/pool-from-deck.jpg", caption: "The pool, seen from the deck" },
      { src: "images/pool/pool-mountain-view.jpg", caption: "The pool reflecting the mountains" },
      { src: "images/pool/pool-blue-roof.jpg", caption: "The pool and the house" },
      { src: "images/pool/guest-relaxing-pool.jpg", caption: "Golden hour at the pool's edge" },
      { src: "images/pool/pool-relaxing.jpg", caption: "Relaxing by the pool" },
      { src: "images/pool/pool-evening.jpg", caption: "The pool in the evening" },
      { src: "images/pool/pool-night.jpg", caption: "The pool at night" }
    ],
    cr: [
      { src: "images/bathrooms/cr-bedroom-three-basin.jpg", caption: "Comfort room, Bedroom Three" },
      { src: "images/bathrooms/cr-bedroom-three-shower.jpg", caption: "Comfort room, Bedroom Three: the shower" },
      { src: "images/bathrooms/cr-bedroom-one-1.jpg", caption: "Comfort room, Bedroom One" },
      { src: "images/bathrooms/cr-bedroom-one-2.jpg", caption: "Comfort room, Bedroom One, with a garden view" },
      { src: "images/bathrooms/cr-bedroom-two.jpg", caption: "Comfort room, Bedroom Two" },
      { src: "images/bathrooms/cr-bedroom-two-tall.jpg", caption: "Comfort room, Bedroom Two: shower and vanity" }
    ],
    dining: [
      { src: "images/kitchen/breakfast-near-pool.jpg", caption: "Breakfast near the pool" },
      { src: "images/views/guest-enjoying-view.jpg", caption: "Dining with a view over the valley" },
      { src: "images/kitchen/poolside-breakfast.jpg", caption: "Breakfast by the pool" },
      { src: "images/kitchen/poolside-drink.jpg", caption: "A cold drink by the pool" }
    ],
    kitchen: [
      { src: "images/kitchen/kitchen-lookout-bench.jpg", caption: "The kitchen bench, looking out to the garden" },
      { src: "images/kitchen/kitchen-view.jpg", caption: "The open kitchen" },
      { src: "images/kitchen/kitchen-water.jpg", caption: "Hot and cold drinking water on tap" }
    ],
    gym: [
      { src: "images/gym/gym-1.jpg", caption: "The home gym" },
      { src: "images/gym/gym-2.jpg", caption: "Work out with a garden view" }
    ],
    solar: [
      { src: "images/sustainability/solar-panels.jpg", caption: "Solar panels on the roof" },
      { src: "images/sustainability/solar-batteries.jpg", caption: "Our solar battery bank" }
    ],
    ev: [
      { src: "images/sustainability/ev-on-the-road.jpg", caption: "Our electric car on the road above Lake Sebu" },
      { src: "images/sustainability/ev-charging.jpg", caption: "Charging at home" },
      { src: "images/sustainability/ev-charger-1.jpg", caption: "Fitting the home charger" },
      { src: "images/sustainability/ev-new-car.jpg", caption: "Picking up the new car" }
    ],
    water: [
      { src: "images/kitchen/kitchen-water.jpg", caption: "Hot and cold drinking water in the kitchen" }
    ],
    grown: [
      { src: "images/sustainability/planting-by-pool.jpg", caption: "Planting local plants beside the pool" },
      { src: "images/sustainability/jomer-local-plants.jpg", caption: "JM with local plants" },
      { src: "images/sustainability/planting-jaycho.jpg", caption: "Planting the garden" },
      { src: "images/sustainability/plants-in-kitchen.jpg", caption: "Plants growing in the kitchen" }
    ],
    makers: [
      { src: "images/sustainability/bamboo-furniture-1.jpg", caption: "Bamboo furniture, handmade locally" },
      { src: "images/sustainability/bamboo-furniture-2.jpg", caption: "The local makers of our bamboo furniture" }
    ],
    location: [
      { src: "images/location/map-full.jpg", caption: "How to reach Lake Sebu and Sebu Sanctuary" },
      { src: "images/location/map-philippines.jpg", caption: "Lake Sebu, South Cotabato, on the island of Mindanao" },
      { src: "images/location/map-to-seven-falls.jpg", caption: "From Sebu Sanctuary to Seven Falls" },
      { src: "images/location/map-to-markets.jpg", caption: "From Sebu Sanctuary to the Lake Sebu market" }
    ],
    falls: [
      { src: "images/explore/seven-falls-1.jpg", caption: "Seven Falls, Lake Sebu" },
      { src: "images/explore/seven-falls-2.jpg", caption: "Seven Falls through the forest" },
      { src: "images/explore/seven-falls-3.jpg", caption: "One of the higher falls" },
      { src: "images/explore/seven-falls-4.jpg", caption: "The falls and the valley" },
      { src: "images/explore/seven-falls-5.jpg", caption: "Cascades below the falls" },
      { src: "images/explore/seven-falls-crafts.jpg", caption: "Local crafts for sale at Seven Falls" }
    ],
    lakes: [
      { src: "images/explore/canoe-lake-sebu-2.jpg", caption: "A canoe among the lotus on Lake Sebu" },
      { src: "images/explore/canoe-lake-sebu-1.jpg", caption: "Paddling across Lake Sebu" },
      { src: "images/explore/water-lilies-1.jpg", caption: "Water lilies on the lake" },
      { src: "images/explore/water-lilies-2.jpg", caption: "Lotus flowers on the lake" },
      { src: "images/explore/lake-cruise.jpg", caption: "A welcome on board a lake cruise" }
    ],
    tdaan: [
      { src: "images/explore/tdaan-kini-1.jpg", caption: "T'Daan Kini nature pool and falls" },
      { src: "images/explore/tdaan-kini-2.jpg", caption: "Cascades at T'Daan Kini" },
      { src: "images/explore/tdaan-kini-3.jpg", caption: "The river at T'Daan Kini" },
      { src: "images/explore/tdaan-kini-swimmer.jpg", caption: "A local swimmer at T'Daan Kini" }
    ],
    cacao: [
      { src: "images/explore/cacao-pods.jpg", caption: "Freshly harvested cacao pods" },
      { src: "images/explore/cacao-preparing.jpg", caption: "Preparing cacao seeds" },
      { src: "images/explore/cacao-hot-chocolate.jpg", caption: "Hot chocolate made from the farm's cacao" },
      { src: "images/explore/cacao-farm-papaya.jpg", caption: "Papaya growing on the farm" },
      { src: "images/explore/cacao-farm-flowers-1.jpg", caption: "Flowers on the cacao farm" },
      { src: "images/explore/cacao-farm-flowers-2.jpg", caption: "Flowers on the cacao farm" }
    ],
    rice: [
      { src: "images/explore/rice-fields.jpg", caption: "Rice fields near Lake Sebu" },
      { src: "images/explore/rice-planting.jpg", caption: "Planting rice by hand" },
      { src: "images/explore/mountain-view.jpg", caption: "The mountain view from Sebu Sanctuary" },
      { src: "images/explore/walk-4.jpg", caption: "On the walk behind the sanctuary" },
      { src: "images/explore/walk-5.jpg", caption: "On the walk behind the sanctuary" }
    ],
    market: [
      { src: "images/explore/local-market.jpg", caption: "Fresh produce at the local market" },
      { src: "images/explore/marang-fruit.jpg", caption: "Marang, a local fruit" },
      { src: "images/explore/house-from-distance.jpg", caption: "Sebu Sanctuary, 2.5 km from town" }
    ],
    nature: [
      { src: "images/nature/dragonfly-red.jpg", caption: "Red dragonfly" },
      { src: "images/nature/dragonfly-blue.jpg", caption: "Blue dragonfly" },
      { src: "images/nature/bee-and-flower.jpg", caption: "Carpenter bee and flower" },
      { src: "images/nature/dragonfly-yellow.jpg", caption: "Yellow dragonfly" },
      { src: "images/nature/purple-flowers.jpg", caption: "Morning glory" },
      { src: "images/nature/coffee-flowers.jpg", caption: "Coffee flowers" },
      { src: "images/nature/dragonfly-green.jpg", caption: "Green dragonfly" },
      { src: "images/nature/morning-dew.jpg", caption: "Morning dew on a leaf" },
      { src: "images/nature/dragonfly-brown.jpg", caption: "Brown dragonfly" },
      { src: "images/nature/tattoo-plant.jpg", caption: "Fern frond" },
      { src: "images/nature/butterfly-4.jpg", caption: "Butterfly of the region" }
    ],
    tboli: [
      { src: "images/culture/tboli-dancers.jpg", caption: "Local Tboli dancers at Sebu Sanctuary" },
      { src: "images/culture/klintang-gongs.jpg", caption: "Playing the gongs at Sebu Sanctuary" },
      { src: "images/culture/tboli-dress-walk.jpg", caption: "A walk in the mountains in traditional Tboli dress" },
      { src: "images/culture/overlooking-lake-seloton.jpg", caption: "Overlooking Lake Seloton" }
    ]
  };

  /* ---------- Contact links (all built from CONTACT above) ---------- */
  var CONTACT_HREF = {
    whatsapp: "https://wa.me/" + CONTACT.whatsapp,
    messenger: "https://m.me/" + CONTACT.messenger,
    email: "mailto:" + CONTACT.email,
    facebook: CONTACT.facebook,
    phone: "tel:" + CONTACT.phone
  };
  $$("[data-contact]").forEach(function (a) {
    // no Messenger page yet: hide those links rather than send guests to an empty m.me page
    if (a.dataset.contact === "messenger" && !CONTACT.messenger) { a.hidden = true; return; }
    var href = CONTACT_HREF[a.dataset.contact];
    if (href) a.href = href;
  });

  /* ---------- Header + mobile booking bar ---------- */
  var header = $(".site-header");
  var mobileCta = $("#mobile-cta");
  var hero = $(".hero, .page-hero, .reel-page");
  var bookSection = $("#book");
  var lastY = window.scrollY, idleTimer = null;

  function ctaAllowed() {
    var y = window.scrollY;
    var pastHero = hero ? y > hero.offsetHeight * 0.6 : y > 300;
    var r = bookSection && bookSection.getBoundingClientRect();
    var atBook = !!r && r.top < window.innerHeight && r.bottom > 0;
    return pastHero && !atBook;
  }

  function onScroll() {
    var y = window.scrollY;
    header.classList.toggle("scrolled", y > 40);
    if (!mobileCta) return;
    // hide while scrolling down (reading), show when scrolling up or after a short pause
    var dy = y - lastY;
    if (Math.abs(dy) > 6) {
      mobileCta.classList.toggle("show", dy < 0 && ctaAllowed());
      lastY = y;
    }
    clearTimeout(idleTimer);
    idleTimer = setTimeout(function () { mobileCta.classList.toggle("show", ctaAllowed()); }, 900);
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

  /* ---------- Scroll reveal ---------- */
  var reveals = $$(".reveal");
  if ("IntersectionObserver" in window && !reduceMotion) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        var siblings = $$(".reveal", el.parentElement);   // stagger siblings that reveal together
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

  /* ---------- Shared helpers ---------- */
  function iso(d) {
    return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
  }
  var todayIso = iso(new Date());

  function linkDates(inEl, outEl, onChange) {
    if (!inEl || !outEl) return;
    inEl.min = todayIso; outEl.min = todayIso;
    inEl.addEventListener("change", function () {
      if (inEl.value) {
        var next = new Date(inEl.value + "T00:00:00");
        next.setDate(next.getDate() + 1);
        outEl.min = iso(next);
        if (!outEl.value || outEl.value <= inEl.value) outEl.value = iso(next);
      }
      if (onChange) onChange();
    });
    outEl.addEventListener("change", function () { if (onChange) onChange(); });
  }

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
    ["change", "blur", "input"].forEach(function (ev) {
      input.addEventListener(ev, function () { if (ev !== "input") clampGuests(input); updateBooking(); });
    });
  });
  $$(".step-btn").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var input = document.getElementById(btn.getAttribute("aria-controls"));
      input.value = (+input.value || 0) + +btn.dataset.step;
      clampGuests(input);
      updateBooking();
    });
  });

  function money(n) { return RATES.currency + Math.round(n).toLocaleString("en-PH"); }
  function plural(n, word) { return n + " " + word + (n === 1 ? "" : "s"); }
  function fmtDate(v) {
    if (!v) return "";
    return new Date(v + "T00:00:00").toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short", year: "numeric" });
  }

  /* ---------- Toast ---------- */
  var toastEl = $("#toast"), toastTimer;
  function showToast(msg) {
    if (!toastEl) return;
    toastEl.textContent = msg;
    toastEl.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toastEl.classList.remove("show"); }, 3200);
  }

  /* =========================================================
     Booking planner: dates, guests, extras → live total
     ========================================================= */
  var form = $("#booking");
  var bkIn = $("#bk-in"), bkOut = $("#bk-out"), bkGuests = $("#bk-guests"), bkPickup = $("#bk-pickup");

  function perLabel(per) {
    return per === "guest-night" ? " / guest / night" : per === "guest" ? " / guest" : " / group";
  }

  function quote() {
    var guests = bkGuests ? clampGuests(bkGuests) : 1;
    var nights = 0;
    if (bkIn && bkOut && bkIn.value && bkOut.value) {
      nights = Math.round((new Date(bkOut.value + "T00:00:00") - new Date(bkIn.value + "T00:00:00")) / 86400000);
      if (nights < 0) nights = 0;
    }
    var lines = [], total = 0;
    function add(label, detail, amount) { lines.push({ label: label, detail: detail, amount: amount }); total += amount; }

    if (nights > 0) {
      add("Your stay", plural(nights, "night") + " × " + money(RATES.nightly), nights * RATES.nightly);
      var extraGuests = Math.max(0, guests - RATES.includedGuests);
      if (extraGuests) add("Extra guests", plural(extraGuests, "guest") + " × " + plural(nights, "night") + " × " + money(RATES.extraGuest), extraGuests * nights * RATES.extraGuest);
    }
    var pk = bkPickup ? bkPickup.value : "none";
    if (pk !== "none") add("Airport pickup", pk === "return" ? "General Santos, return trip" : "General Santos, one way", RATES.pickup[pk]);

    $$('input[name="extra"]:checked', form || document).forEach(function (cb) {
      var x = RATES.extras[cb.value]; if (!x) return;
      var qty = x.per === "guest-night" ? guests * Math.max(nights, 0) : x.per === "guest" ? guests : 1;
      var detail = x.per === "guest-night" ? plural(guests, "guest") + " × " + plural(nights, "night") + " × " + money(x.price)
                 : x.per === "guest" ? plural(guests, "guest") + " × " + money(x.price) : "per group";
      add(x.label, detail, qty * x.price);
    });
    return { nights: nights, guests: guests, pickup: pk, lines: lines, total: total };
  }

  function updateBooking() {
    if (!form) return;
    var q = quote();
    var dates = $("#sum-dates");
    dates.textContent = q.nights > 0
      ? fmtDate(bkIn.value) + " to " + fmtDate(bkOut.value) + " · " + plural(q.guests, "guest")
      : "Choose your dates to see your total";
    $("#sum-lines").innerHTML = q.lines.map(function (l) {
      return '<li><span><strong>' + l.label + '</strong><small>' + l.detail + '</small></span><b>' + money(l.amount) + "</b></li>";
    }).join("");
    $("#sum-total").textContent = q.nights > 0 ? money(q.total) : "-";
    var extra = Math.max(0, q.guests - RATES.includedGuests);
    $("#bk-guest-hint").textContent = "Up to " + RATES.includedGuests + " guests are included in the nightly rate" +
      (extra ? ". " + plural(extra, "extra guest") + " at " + money(RATES.extraGuest) + " per night." : ".");
  }

  function bookingText(q, d) {
    var lines = [
      "Hi, I'd like to book a stay at Sebu Sanctuary.",
      "",
      "Dates: " + fmtDate(bkIn.value) + " to " + fmtDate(bkOut.value) + " (" + plural(q.nights, "night") + ")",
      "Guests: " + q.guests
    ];
    q.lines.forEach(function (l) { lines.push("- " + l.label + ": " + l.detail + " = " + money(l.amount)); });
    lines.push("Estimated total: " + money(q.total));
    if (d) {
      lines.push("", "Name: " + d.name, "Email: " + d.email, "Phone / WhatsApp: " + (d.phone || "Not given"), "Travelling from: " + d.from);
      if (d.message) lines.push("Notes: " + d.message);
    }
    lines.push("", "Thank you!");
    return lines.join("\n");
  }

  if (form) {
    linkDates(bkIn, bkOut, updateBooking);
    // show prices next to each extra
    Object.keys(RATES.extras).forEach(function (k) {
      var el = $('[data-price-for="' + k + '"]');
      if (el) el.textContent = money(RATES.extras[k].price) + perLabel(RATES.extras[k].per);
    });
    if (bkPickup) {
      bkPickup.options[1].textContent = "One way (" + money(RATES.pickup.oneway) + ")";
      bkPickup.options[2].textContent = "Return trip (" + money(RATES.pickup["return"]) + ")";
      bkPickup.addEventListener("change", updateBooking);
    }
    $$('input[name="extra"]', form).forEach(function (cb) { cb.addEventListener("change", updateBooking); });
    $("#sum-sample").hidden = RATES.confirmed;

    // links like index.html?add=falls#book pre-select an extra
    var add = new URLSearchParams(window.location.search).get("add");
    if (add === "pickup" && bkPickup) bkPickup.value = "oneway";
    else if (add) {
      var cb = $('input[name="extra"][value="' + add.replace(/[^a-z]/g, "") + '"]', form);
      if (cb) cb.checked = true;
    }
    updateBooking();

    // fonts and images shift the page after the browser jumps to #hash; land on it again once loaded
    if (window.location.hash.length > 1) {
      window.addEventListener("load", function () {
        var target = document.getElementById(window.location.hash.slice(1));
        if (target) target.scrollIntoView({ behavior: "instant" });
      });
    }

    var errorEl = $("#form-error");
    function fail(msg, el) {
      errorEl.textContent = msg; errorEl.hidden = false;
      if (el) { el.classList.add("invalid"); el.focus(); }
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      errorEl.hidden = true;
      $$(".invalid", form).forEach(function (el) { el.classList.remove("invalid"); });
      var q = quote();
      if (q.nights < 1) return fail("Please choose your check-in and check-out dates.", bkIn.value ? bkOut : bkIn);
      var d = Object.fromEntries(new FormData(form).entries());
      if (!d.name.trim()) return fail("Please add your name.", $("#bk-name"));
      if (!/^\S+@\S+\.\S+$/.test(d.email)) return fail("Please add a valid email address.", $("#bk-email"));
      var subject = "Booking request: " + fmtDate(bkIn.value) + " (" + plural(q.guests, "guest") + ")";
      window.location.href = "mailto:" + CONTACT.email + "?subject=" + encodeURIComponent(subject) +
        "&body=" + encodeURIComponent(bookingText(q, d));
      showToast("Opening your email app…");
    });

    $("#book-wa").addEventListener("click", function () {
      errorEl.hidden = true;
      var q = quote();
      if (q.nights < 1) return fail("Please choose your check-in and check-out dates.", bkIn.value ? bkOut : bkIn);
      var d = Object.fromEntries(new FormData(form).entries());
      window.open(CONTACT_HREF.whatsapp + "?text=" + encodeURIComponent(bookingText(q, d.name ? d : null)), "_blank", "noopener");
    });
    $$("input, textarea", form).forEach(function (el) {
      el.addEventListener("input", function () { el.classList.remove("invalid"); });
    });
  }

  /* ---------- Hero quick bar → booking planner ---------- */
  var quick = $("#quick-book");
  if (quick) {
    linkDates($("#qb-in"), $("#qb-out"));
    quick.addEventListener("submit", function (e) {
      e.preventDefault();
      if ($("#qb-in").value) { bkIn.value = $("#qb-in").value; bkIn.dispatchEvent(new Event("change")); }
      if ($("#qb-out").value) bkOut.value = $("#qb-out").value;
      bkGuests.value = clampGuests($("#qb-guests"));
      updateBooking();
      bookSection.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
      showToast($("#qb-in").value && $("#qb-out").value ? "Here's your price. Add any extras you'd like." : "Choose your dates to see your price.");
    });
  }

  // "Add pickup to my booking" buttons
  $$("[data-add-pickup]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      if (bkPickup && bkPickup.value === "none") { bkPickup.value = "oneway"; updateBooking(); }
      showToast("Airport pickup added. Choose one way or return.");
    });
  });

  /* ---------- Menu tabs + dish dropdowns ---------- */
  var tabs = $$('.menu-tabs [role="tab"]');
  function setDish(dish, open) {
    dish.classList.toggle("open", open);
    $(".dish-head", dish).setAttribute("aria-expanded", String(open));
  }
  function openFirstDish(panel) {
    if (panel && !$(".dish.open", panel)) setDish($(".dish", panel), true);
  }
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
  $$(".dish").forEach(function (dish) {
    $(".dish-head", dish).addEventListener("click", function () {
      var willOpen = !dish.classList.contains("open");
      $$(".dish.open", dish.parentElement).forEach(function (d) { setDish(d, false); });   // one open per category
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

  /* ---------- Menu page: print button + highlight the section in view ---------- */
  $$("[data-print]").forEach(function (b) { b.addEventListener("click", function () { window.print(); }); });
  var mpLinks = $$(".mp-nav a");
  if (mpLinks.length && "IntersectionObserver" in window) {
    var mpObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        mpLinks.forEach(function (a) {
          var on = a.getAttribute("href") === "#" + en.target.id;
          a.classList.toggle("active", on);
        });
      });
    }, { rootMargin: "-40% 0px -55% 0px" });
    $$(".mp-section").forEach(function (s) { mpObs.observe(s); });
  }

  /* ---------- Explore page: camera viewfinder for the photo walk photos ---------- */
  var vf = $("#vf");
  if (vf) {
    var vfFrame = $(".vf-frame", vf), vfPics = $$(".vf-frame img", vf), vfDots = $$(".vf-dot");
    var vfCap = $(".vf-cap", vf), vfCount = $(".vf-count", vf), vfFocus = $(".vf-focus", vf);
    var vfIndex = 0, vfTimer = null;
    var vfShow = function (i) {
      vfIndex = (i + vfPics.length) % vfPics.length;
      vfPics.forEach(function (img, k) { img.classList.toggle("on", k === vfIndex); });
      vfDots.forEach(function (d, k) { d.classList.toggle("on", k === vfIndex); });
      vfCap.textContent = vfPics[vfIndex].alt;
      vfCount.textContent = (vfIndex + 1) + " / " + vfPics.length;
      vfFrame.dataset.start = vfIndex;   // the gallery opens at this photo
      vfFocus.classList.remove("focusing"); void vfFocus.offsetWidth; vfFocus.classList.add("focusing");
    };
    var vfStop = function () { clearInterval(vfTimer); vfTimer = null; };
    $$("[data-vf]").forEach(function (b) {
      b.addEventListener("click", function () { vfStop(); vfShow(vfIndex + (b.dataset.vf === "next" ? 1 : -1)); });
    });
    vfDots.forEach(function (d, k) { d.addEventListener("click", function () { vfStop(); vfShow(k); }); });
    var vfX = null;   // swipe on phones
    vf.addEventListener("touchstart", function (e) { vfX = e.touches[0].clientX; }, { passive: true });
    vf.addEventListener("touchend", function (e) {
      if (vfX === null) return;
      var dx = e.changedTouches[0].clientX - vfX;
      if (Math.abs(dx) > 40) { vfStop(); vfShow(vfIndex + (dx < 0 ? 1 : -1)); }
      vfX = null;
    });
    // advance gently on its own until the guest takes over
    if (!reduceMotion) {
      vfTimer = setInterval(function () { vfShow(vfIndex + 1); }, 4500);
      vf.addEventListener("mouseenter", vfStop);
    }
  }

  /* ---------- Lightbox ---------- */
  var lb = $("#lightbox");
  if (lb) {
    var lbImg = $("#lb-img"), lbCap = $("#lb-caption");
    var current = [], index = 0, lastFocus = null;
    var render = function () {
      var item = current[index];
      lbImg.src = item.src; lbImg.alt = item.caption;
      var many = current.length > 1;
      lbCap.textContent = many ? item.caption + "  ·  " + (index + 1) + " / " + current.length : item.caption;
      $("#lb-prev").hidden = $("#lb-next").hidden = !many;
    };
    var openGallery = function (name, start) { openList(GALLERIES[name] || [], start); };
    var openList = function (list, start) {
      current = list;
      if (!current.length) return;
      index = Math.min(start || 0, current.length - 1); lastFocus = document.activeElement;
      render(); lb.hidden = false;
      document.body.style.overflow = "hidden";
      $("#lb-close").focus();
    };
    var closeGallery = function () {
      lb.hidden = true; document.body.style.overflow = "";
      if (lastFocus) lastFocus.focus();
    };
    var step = function (dir) { index = (index + dir + current.length) % current.length; render(); };

    $$("[data-gallery]").forEach(function (t) { t.addEventListener("click", function () { openGallery(t.dataset.gallery, parseInt(t.dataset.start || "0", 10)); }); });
    // single photos, e.g. dishes on the menu page
    $$("[data-photo]").forEach(function (t) {
      t.addEventListener("click", function () { openList([{ src: t.dataset.photo, caption: t.dataset.caption || "" }]); });
    });
    $$("[data-open-gallery]").forEach(function (l) {
      l.addEventListener("click", function (e) { e.preventDefault(); openGallery(l.dataset.openGallery); });
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
      if (e.key === "Tab") {   // keep focus inside the dialog
        var f = [$("#lb-close"), $("#lb-prev"), $("#lb-next")];
        var i = f.indexOf(document.activeElement);
        e.preventDefault();
        f[(i + (e.shiftKey ? -1 : 1) + f.length) % f.length].focus();
      }
    });
    var touchX = null;   // swipe on touch devices
    lb.addEventListener("touchstart", function (e) { touchX = e.touches[0].clientX; }, { passive: true });
    lb.addEventListener("touchend", function (e) {
      if (touchX === null) return;
      var dx = e.changedTouches[0].clientX - touchX;
      if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
      touchX = null;
    });
  }

  /* ---------- Video loops ---------- */
  var loops = $$("video[data-autoplay]");
  var saveData = navigator.connection && navigator.connection.saveData;
  if (loops.length && !reduceMotion && !saveData && "IntersectionObserver" in window) {
    loops.forEach(function (v) {
      v.addEventListener("playing", function () { v.classList.add("playing"); });
    });
    var vObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        var v = en.target;
        if (en.isIntersecting) {
          if (v.preload === "none") v.preload = "auto";
          var p = v.play();
          if (p && p.catch) p.catch(function () {});   // autoplay blocked: the photo simply stays
        } else {
          v.pause();
        }
      });
    }, { threshold: 0.25 });
    loops.forEach(function (v) { vObs.observe(v); });
  }

  /* ---------- Pool photo: settle slowly when it comes into view ---------- */
  var poolSec = $("#pool");
  if (poolSec && "IntersectionObserver" in window) {
    new IntersectionObserver(function (en, obs) {
      if (en[0].isIntersecting) { poolSec.classList.add("in-view"); obs.disconnect(); }
    }, { threshold: 0.2 }).observe(poolSec);
  } else if (poolSec) { poolSec.classList.add("in-view"); }

  /* ---------- Footer year ---------- */
  var yr = $("#year");
  if (yr) yr.textContent = new Date().getFullYear();
})();
