/* ============================================================
script.js — Evergreen Academy
All JavaScript for index.html, about.html, contact.html
============================================================ */

/* ════════════════════════════════════════════
SHARED — HAMBURGER MENU
════════════════════════════════════════════ */
function toggleMenu() {
const menu = document.getElementById(‘mobileNav’);
const btn = document.querySelector(’.hamburger’);
if (!menu || !btn) return;
menu.classList.toggle(‘open’);
btn.classList.toggle(‘open’);
}

/* Close mobile menu when a link is clicked */
document.addEventListener(‘DOMContentLoaded’, function () {
document.querySelectorAll(’.mobile-nav a’).forEach(function (link) {
link.addEventListener(‘click’, function () {
var menu = document.getElementById(‘mobileNav’);
var btn = document.querySelector(’.hamburger’);
if (menu) menu.classList.remove(‘open’);
if (btn) btn.classList.remove(‘open’);
});
});
});

/* ════════════════════════════════════════════
SHARED — SCROLL REVEAL
════════════════════════════════════════════ */
(function initReveal() {
var items = document.querySelectorAll(’.reveal’);
if (!items.length) return;

var observer = new IntersectionObserver(function (entries) {
entries.forEach(function (entry, i) {
if (entry.isIntersecting) {
setTimeout(function () {
entry.target.classList.add(‘visible’);
}, i * 90);
observer.unobserve(entry.target);
}
});
}, { threshold: 0.12 });

items.forEach(function (item) { observer.observe(item); });
})();

/* ════════════════════════════════════════════
HOME — STAT COUNTERS
════════════════════════════════════════════ */
(function initCounters() {
var counters = document.querySelectorAll(’.stat-number[data-target]’);
if (!counters.length) return;

var observer = new IntersectionObserver(function (entries) {
entries.forEach(function (entry) {
if (!entry.isIntersecting) return;

```
var el = entry.target;
var target = parseInt(el.getAttribute('data-target'), 10);
var suffix = el.getAttribute('data-suffix') || '';
var count = 0;
var step = Math.ceil(target / 60);

var timer = setInterval(function () {
count = Math.min(count + step, target);
el.textContent = count + suffix;
if (count >= target) clearInterval(timer);
}, 28);

observer.unobserve(el);
});
```

}, { threshold: 0.5 });

counters.forEach(function (c) { observer.observe(c); });
})();

/* ════════════════════════════════════════════
ABOUT — COURSE TABS
════════════════════════════════════════════ */
(function initTabs() {
var buttons = document.querySelectorAll(’.tab-btn’);
if (!buttons.length) return;

buttons.forEach(function (btn) {
btn.addEventListener(‘click’, function () {
/* deactivate all buttons and panels */
document.querySelectorAll(’.tab-btn’).forEach(function (b) {
b.classList.remove(‘active’);
});
document.querySelectorAll(’.tab-panel’).forEach(function (p) {
p.classList.remove(‘active’);
});

```
/* activate clicked */
btn.classList.add('active');
var panel = document.getElementById('panel-' + btn.getAttribute('data-tab'));
if (panel) panel.classList.add('active');
});
```

});
})();

/* ════════════════════════════════════════════
ABOUT — FAQ ACCORDION
════════════════════════════════════════════ */
function toggleFaq(btn) {
var item = btn.closest(’.faq-item’);
var isOpen = item.classList.contains(‘open’);

/* Close all */
document.querySelectorAll(’.faq-item.open’).forEach(function (i) {
i.classList.remove(‘open’);
});

/* Open clicked if it was closed */
if (!isOpen) item.classList.add(‘open’);
}

/* ════════════════════════════════════════════
ABOUT — GALLERY FILTER + LIGHTBOX
════════════════════════════════════════════ */
(function initGallery() {
var items = document.querySelectorAll(’.gallery-item’);
var lightbox = document.getElementById(‘lightbox’);
var lbMedia = document.getElementById(‘lbMedia’);
var lbCap = document.getElementById(‘lbCaption’);
var lbClose = document.getElementById(‘lbClose’);
var lbPrev = document.getElementById(‘lbPrev’);
var lbNext = document.getElementById(‘lbNext’);

if (!items.length || !lightbox) return;

var currentIndex = 0;
var visible = [];

function getVisible() {
return Array.prototype.filter.call(items, function (item) {
return !item.classList.contains(‘hidden’);
});
}

function showItem(idx) {
var item = visible[idx];
if (!item) return;

```
var img = item.querySelector('img');
var ph = item.querySelector('.gallery-placeholder');

if (img) {
lbMedia.innerHTML = '<img src="' + img.src + '" alt="' + (img.alt || '') + '">';
} else if (ph) {
lbMedia.innerHTML = '<div class="lightbox-placeholder-content">' + ph.innerHTML + '</div>';
}

lbCap.textContent = item.getAttribute('data-caption') || '';
currentIndex = idx;
```

}

function openLightbox(item) {
visible = getVisible();
currentIndex = visible.indexOf(item);
showItem(currentIndex);
lightbox.classList.add(‘open’);
document.body.style.overflow = ‘hidden’;
}

function closeLightbox() {
lightbox.classList.remove(‘open’);
document.body.style.overflow = ‘’;
}

function prevItem() {
currentIndex = (currentIndex - 1 + visible.length) % visible.length;
showItem(currentIndex);
}

function nextItem() {
currentIndex = (currentIndex + 1) % visible.length;
showItem(currentIndex);
}

/* Open on click */
items.forEach(function (item) {
item.addEventListener(‘click’, function () { openLightbox(item); });
});

/* Controls */
lbClose.addEventListener(‘click’, closeLightbox);
lbPrev.addEventListener(‘click’, prevItem);
lbNext.addEventListener(‘click’, nextItem);

/* Click backdrop to close */
lightbox.addEventListener(‘click’, function (e) {
if (e.target === lightbox) closeLightbox();
});

/* Keyboard */
document.addEventListener(‘keydown’, function (e) {
if (!lightbox.classList.contains(‘open’)) return;
if (e.key === ‘Escape’) closeLightbox();
if (e.key === ‘ArrowLeft’) prevItem();
if (e.key === ‘ArrowRight’) nextItem();
});

/* Touch swipe */
var touchStart = 0;
lightbox.addEventListener(‘touchstart’, function (e) {
touchStart = e.changedTouches[0].clientX;
}, { passive: true });

lightbox.addEventListener(‘touchend’, function (e) {
var diff = touchStart - e.changedTouches[0].clientX;
if (Math.abs(diff) > 50) {
diff > 0 ? nextItem() : prevItem();
}
});

/* Filter buttons */
var filterBtns = document.querySelectorAll(’.filter-btn’);
filterBtns.forEach(function (btn) {
btn.addEventListener(‘click’, function () {
filterBtns.forEach(function (b) { b.classList.remove(‘active’); });
btn.classList.add(‘active’);

```
var filter = btn.getAttribute('data-filter');
items.forEach(function (item) {
var cat = item.getAttribute('data-category');
item.classList.toggle('hidden', filter !== 'all' && cat !== filter);
});

visible = getVisible();
});
```

});
})();

/* ════════════════════════════════════════════
CONTACT — ENQUIRY TABS
════════════════════════════════════════════ */
(function initEnquiryTabs() {
var tabs = document.querySelectorAll(’.eq-btn’);
if (!tabs.length) return;

tabs.forEach(function (btn) {
btn.addEventListener(‘click’, function () {
tabs.forEach(function (b) { b.classList.remove(‘active’); });
btn.classList.add(‘active’);
var input = document.getElementById(‘enquiryType’);
if (input) input.value = btn.getAttribute(‘data-type’);
});
});
})();

/* Helper called by CTA anchor link */
function setEnquiryType(type) {
document.querySelectorAll(’.eq-btn’).forEach(function (b) {
b.classList.toggle(‘active’, b.getAttribute(‘data-type’) === type);
});
var input = document.getElementById(‘enquiryType’);
if (input) input.value = type;
}

/* ════════════════════════════════════════════
CONTACT — FORM VALIDATION + SUBMIT
════════════════════════════════════════════ */
(function initContactForm() {
/* Real-time: clear errors on input */
var fields = [‘firstName’,‘lastName’,‘email’,‘subject’,‘message’];
fields.forEach(function (id) {
var el = document.getElementById(id);
if (!el) return;
el.addEventListener(‘input’, function () {
el.classList.remove(‘has-error’);
var fg = document.getElementById(‘fg-’ + id);
if (fg) fg.classList.remove(‘error’);
});
});

var consent = document.getElementById(‘consent’);
if (consent) {
consent.addEventListener(‘change’, function () {
var fg = document.getElementById(‘fg-consent’);
if (fg) fg.classList.remove(‘error’);
});
}
})();

function validateField(id, fn) {
var el = document.getElementById(id);
var fg = document.getElementById(‘fg-’ + id);
if (!el) return true;
var valid = fn(el);
if (fg) fg.classList.toggle(‘error’, !valid);
el.classList.toggle(‘has-error’, !valid);
return valid;
}

function submitForm() {
var btn = document.getElementById(‘submitBtn’);
var spinner = document.getElementById(‘formSpinner’);
var btnText = document.getElementById(‘btnText’);
var success = document.getElementById(‘successMsg’);
var fail = document.getElementById(‘failMsg’);

if (success) success.classList.remove(‘show’);
if (fail) fail.classList.remove(‘show’);

var checks = [
validateField(‘firstName’, function (el) { return el.value.trim().length > 0; }),
validateField(‘lastName’, function (el) { return el.value.trim().length > 0; }),
validateField(‘email’, function (el) { return /^[^\s@]+@[^\s@]+.[^\s@]+$/.test(el.value.trim()); }),
validateField(‘role’, function (el) { return el.value.trim().length > 0; }),
validateField(‘subject’, function (el) { return el.value.trim().length > 0; }),
validateField(‘message’, function (el) { return el.value.trim().length >= 10; }),
(function () {
var cb = document.getElementById(‘consent’);
var fg = document.getElementById(‘fg-consent’);
var ok = cb && cb.checked;
if (fg) fg.classList.toggle(‘error’, !ok);
return ok;
})()
];

if (checks.some(function (c) { return !c; })) {
if (fail) {
fail.classList.add(‘show’);
fail.scrollIntoView({ behavior: ‘smooth’, block: ‘nearest’ });
}
return;
}

/* Loading state */
if (btn) btn.disabled = true;
if (spinner) spinner.style.display = ‘block’;
if (btnText) btnText.textContent = ‘Sending…’;

/* Simulate sending — replace with real fetch() when ready */
setTimeout(function () {
if (spinner) spinner.style.display = ‘none’;
if (btn) btn.disabled = false;
if (btnText) btnText.textContent = ‘Send Message’;

```
/* Clear fields */
['firstName','lastName','email','phone','subject','message'].forEach(function (id) {
var el = document.getElementById(id);
if (el) el.value = '';
});
['role','year','contactMethod','hearAbout'].forEach(function (id) {
var el = document.getElementById(id);
if (el) el.value = '';
});
var cb = document.getElementById('consent');
if (cb) cb.checked = false;

if (success) {
success.classList.add('show');
success.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}
```

}, 1800);
}
