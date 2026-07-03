/* ===== Preloader ===== */
(function(){
  var fill = document.getElementById('preFill');
  var pct = document.getElementById('prePct');
  var pre = document.getElementById('preloader');
  var n = 0;
  var iv = setInterval(function(){
    n += Math.random()*18;
    if(n >= 100){ n = 100; clearInterval(iv); }
    fill.style.width = n + '%';
    pct.textContent = 'LOADING — ' + Math.floor(n) + '%';
    if(n === 100){
      setTimeout(function(){
        pre.classList.add('done');
        document.body.classList.add('loaded');
      }, 220);
    }
  }, 110);
  // safety fallback
  setTimeout(function(){
    pre.classList.add('done');
    document.body.classList.add('loaded');
  }, 2400);
})();

/* ===== Nav scroll state ===== */
var nav = document.getElementById('mainNav');
window.addEventListener('scroll', function(){
  nav.classList.toggle('scrolled', window.scrollY > 40);
}, {passive:true});

/* ===== Mobile nav ===== */
var burger = document.getElementById('burger');
var navLinks = document.getElementById('navLinks');
burger.addEventListener('click', function(){
  var open = navLinks.classList.toggle('open');
  burger.classList.toggle('open', open);
  document.body.classList.toggle('nav-open', open);
});
navLinks.querySelectorAll('a').forEach(function(a){
  a.addEventListener('click', function(){
    navLinks.classList.remove('open');
    burger.classList.remove('open');
    document.body.classList.remove('nav-open');
  });
});

/* ===== Active link on scroll ===== */
var sections = document.querySelectorAll('section[id], header[id]');
var links = document.querySelectorAll('.nav-links a');
var navObserver = new IntersectionObserver(function(entries){
  entries.forEach(function(e){
    if(e.isIntersecting){
      var id = e.target.getAttribute('id');
      links.forEach(function(l){
        l.classList.toggle('active', l.getAttribute('href') === '#' + id);
      });
    }
  });
}, {rootMargin:'-45% 0px -45% 0px'});
sections.forEach(function(s){ navObserver.observe(s); });

/* ===== Cursor glow ===== */
var glow = document.getElementById('cursorGlow');
var gx = 0, gy = 0, tx = 0, ty = 0;
window.addEventListener('mousemove', function(e){ tx = e.clientX; ty = e.clientY; });
function tick(){
  gx += (tx-gx)*0.12; gy += (ty-gy)*0.12;
  glow.style.transform = 'translate(' + gx + 'px,' + gy + 'px) translate(-50%,-50%)';
  requestAnimationFrame(tick);
}
tick();

/* ===== Reveal on scroll ===== */
var revealEls = document.querySelectorAll('.reveal, .reveal-stagger');
var revealObserver = new IntersectionObserver(function(entries){
  entries.forEach(function(e){
    if(e.isIntersecting){
      e.target.classList.add('in-view');
      revealObserver.unobserve(e.target);
    }
  });
}, {threshold:0.16});
revealEls.forEach(function(el){ revealObserver.observe(el); });

/* ===== Gauges ===== */
var CIRC = 2 * Math.PI * 52;
document.querySelectorAll('.fill').forEach(function(circle){
  var val = parseFloat(circle.getAttribute('data-value')) || 0;
  var gaugeObserver = new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if(e.isIntersecting){
        circle.style.strokeDashoffset = CIRC * (1 - val/100);
        gaugeObserver.disconnect();
      }
    });
  }, {threshold:0.4});
  gaugeObserver.observe(circle);
});

/* ===== Count-up numbers ===== */
document.querySelectorAll('.count').forEach(function(el){
  var target = parseInt(el.getAttribute('data-count'), 10) || 0;
  var countObserver = new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if(e.isIntersecting){
        var start = 0, dur = 900, startTime = null;
        function step(ts){
          if(!startTime) startTime = ts;
          var p = Math.min((ts-startTime)/dur, 1);
          el.textContent = Math.floor(p * target);
          if(p < 1) requestAnimationFrame(step);
          else el.textContent = target;
        }
        requestAnimationFrame(step);
        countObserver.disconnect();
      }
    });
  }, {threshold:0.5});
  countObserver.observe(el);
});

/* ===== Skill bars ===== */
document.querySelectorAll('.skill-bar i').forEach(function(bar){
  var w = bar.getAttribute('data-w') || 0;
  var barObserver = new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if(e.isIntersecting){
        bar.style.width = w + '%';
        barObserver.disconnect();
      }
    });
  }, {threshold:0.4});
  barObserver.observe(bar);
});

/* ===== Award video ===== */
var videoFrame = document.getElementById('awardVideo');
var videoEl = document.getElementById('awardVideoEl');
var playBtn = document.getElementById('playBtn');
playBtn.addEventListener('click', function(){
  videoEl.controls = true;
  videoEl.play();
  videoFrame.classList.add('is-playing');
});
videoEl.addEventListener('pause', function(){
  if(videoEl.currentTime === 0 || videoEl.ended) videoFrame.classList.remove('is-playing');
});
videoEl.addEventListener('ended', function(){
  videoFrame.classList.remove('is-playing');
  videoEl.controls = false;
});