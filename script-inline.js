document.addEventListener("DOMContentLoaded", () => {

  const menuBtn = document.getElementById("mobile-menu");
  const siteNav = document.getElementById("site-nav");
  const navLinks = document.querySelectorAll("#nav a");

  if (!menuBtn || !siteNav) return;

  function applyMenuState(isOpen) {
    siteNav.classList.toggle("is-open", isOpen);
    menuBtn.classList.toggle("active", isOpen);
    menuBtn.setAttribute("aria-expanded", String(isOpen));
    document.body.style.overflow = isOpen ? "hidden" : "";
  }

  function closeMenu() {
    applyMenuState(false);
  }

  function toggleMenu() {
    const isOpen = siteNav.classList.contains("is-open");
    applyMenuState(!isOpen);
  }

  // Ouvrir/fermer via le bouton
  menuBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    toggleMenu();
  });

  // Fermer via clic sur un lien du menu
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      closeMenu();
    });
  });

  // Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });

  // Clic extérieur
  document.addEventListener("click", (e) => {
    if (!siteNav.classList.contains("is-open")) return;

    const clickedInsideNav = siteNav.contains(e.target);
    const clickedOnButton = menuBtn.contains(e.target);

    if (!clickedInsideNav && !clickedOnButton) closeMenu();
  });

  // Toujours afficher le bouton (CSS gère X vs hamburger via .menu-toggle.active)
  


  // ===== REVEAL SIMPLE =====
  const reveals = document.querySelectorAll(".reveal");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
      }
    });
  }, { threshold: 0.15 });

  reveals.forEach(el => observer.observe(el));

  // ===== BACK TO TOP =====
  const backBtn = document.getElementById("back-to-top");

  window.addEventListener("scroll", () => {
    if (!backBtn) return;

    backBtn.classList.toggle("is-visible", window.scrollY > 300);
  });

});