(function(){
  "use strict";
  var WA_NUMBER = "5551982920684";

  /* ---------- header scroll state ---------- */
  var header = document.querySelector(".site-header");
  function onScroll(){
    if(!header) return;
    if(window.scrollY > 12) header.classList.add("scrolled");
    else header.classList.remove("scrolled");
  }
  document.addEventListener("scroll", onScroll, { passive:true });
  onScroll();

  /* ---------- mobile menu ---------- */
  var hamburger = document.querySelector(".hamburger");
  var mobileMenu = document.querySelector(".mobile-menu");
  var scrim = document.querySelector(".scrim");
  var menuClose = document.querySelector(".mobile-menu-close");

  function openMenu(){
    if(!mobileMenu) return;
    mobileMenu.classList.add("is-open");
    scrim.classList.add("is-open");
    hamburger.setAttribute("aria-expanded","true");
    document.body.classList.add("menu-open");
    var firstLink = mobileMenu.querySelector("a");
    if(firstLink) firstLink.focus();
  }
  function closeMenu(){
    if(!mobileMenu) return;
    mobileMenu.classList.remove("is-open");
    scrim.classList.remove("is-open");
    hamburger.setAttribute("aria-expanded","false");
    document.body.classList.remove("menu-open");
  }
  if(hamburger){
    hamburger.addEventListener("click", function(){
      var expanded = hamburger.getAttribute("aria-expanded") === "true";
      expanded ? closeMenu() : openMenu();
    });
  }
  if(menuClose) menuClose.addEventListener("click", closeMenu);
  if(scrim) scrim.addEventListener("click", closeMenu);
  document.addEventListener("keydown", function(e){ if(e.key === "Escape") closeMenu(); });
  document.querySelectorAll(".mobile-menu nav a").forEach(function(a){
    a.addEventListener("click", closeMenu);
  });

  /* ---------- scrollspy (index page anchors) ---------- */
  var navLinks = document.querySelectorAll(".nav-desktop a[href*='#'], .mobile-menu a[href*='#']");
  var sections = [];
  navLinks.forEach(function(a){
    var id = a.getAttribute("href").split("#")[1];
    if(!id) return;
    var el = document.getElementById(id);
    if(el) sections.push({ id:id, el:el });
  });
  if(sections.length && "IntersectionObserver" in window){
    var spy = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting){
          navLinks.forEach(function(a){
            var match = a.getAttribute("href").indexOf("#" + entry.target.id) !== -1;
            if(match) a.setAttribute("aria-current","true");
            else a.removeAttribute("aria-current");
          });
        }
      });
    }, { rootMargin: "-40% 0px -50% 0px" });
    sections.forEach(function(s){ spy.observe(s.el); });
  }

  /* ---------- reduced motion flag ---------- */
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- reveal on scroll (Tier 0 fallback, always wired) ---------- */
  function initBasicReveal(){
    if(!("IntersectionObserver" in window)) return;
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting){
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold:0.15, rootMargin:"0px 0px -10% 0px" });
    document.querySelectorAll(".reveal").forEach(function(el){ io.observe(el); });
  }

  /* ---------- Tier 2: GSAP + Lenis (progressive enhancement) ---------- */
  function initPremiumMotion(){
    if(reduce) return;
    if(typeof gsap === "undefined" || typeof ScrollTrigger === "undefined"){ initBasicReveal(); return; }
    gsap.registerPlugin(ScrollTrigger);

    if(typeof Lenis !== "undefined"){
      var lenis = new Lenis();
      gsap.ticker.add(function(time){ lenis.raf(time * 1000); });
      gsap.ticker.lagSmoothing(0);
      lenis.on("scroll", ScrollTrigger.update);
    }

    gsap.utils.toArray(".reveal").forEach(function(el){
      gsap.fromTo(el, { y:32, opacity:0 }, {
        y:0, opacity:1, duration:.9, ease:"power2.out",
        scrollTrigger:{ trigger:el, start:"top 88%" }
      });
    });

    gsap.utils.toArray(".parallax-img").forEach(function(el){
      gsap.to(el, {
        yPercent:-14, ease:"none",
        scrollTrigger:{ trigger:el.closest(".parallax-section") || el, start:"top bottom", end:"bottom top", scrub:true }
      });
    });
  }

  if(reduce){
    document.querySelectorAll(".reveal").forEach(function(el){ el.classList.add("is-visible"); });
  } else {
    initBasicReveal();
    window.addEventListener("load", initPremiumMotion);
  }

  /* ---------- cookie bar (LGPD) ---------- */
  var cookieBar = document.getElementById("cookie-bar");
  if(cookieBar){
    var stored = null;
    try{ stored = localStorage.getItem("cookie-consent"); }catch(e){}
    if(!stored) cookieBar.hidden = false;
    var accept = document.getElementById("cookie-accept");
    var reject = document.getElementById("cookie-reject");
    function setConsent(v){
      try{ localStorage.setItem("cookie-consent", v); }catch(e){}
      cookieBar.hidden = true;
    }
    if(accept) accept.addEventListener("click", function(){ setConsent("accept"); });
    if(reject) reject.addEventListener("click", function(){ setConsent("reject"); });
  }

  /* ---------- contact form -> WhatsApp ---------- */
  var form = document.getElementById("contact-form");
  if(form){
    form.addEventListener("submit", function(e){
      e.preventDefault();
      var valid = form.checkValidity();
      form.querySelectorAll(".field").forEach(function(f){ f.classList.remove("has-error"); });
      if(!valid){
        form.querySelectorAll(":invalid").forEach(function(input){
          var field = input.closest(".field");
          if(field) field.classList.add("has-error");
        });
        form.reportValidity();
        return;
      }
      var nome = form.querySelector("#nome").value.trim();
      var telefone = form.querySelector("#telefone").value.trim();
      var assunto = form.querySelector("#assunto") ? form.querySelector("#assunto").value.trim() : "";
      var mensagem = form.querySelector("#mensagem").value.trim();
      var lines = ["Olá! Meu nome é " + nome + ".", "Telefone: " + telefone];
      if(assunto) lines.push("Assunto: " + assunto);
      lines.push("Mensagem: " + mensagem);
      var text = lines.join("\n");
      var url = "https://wa.me/" + WA_NUMBER + "?text=" + encodeURIComponent(text);
      window.open(url, "_blank", "noopener");
    });
  }
})();
