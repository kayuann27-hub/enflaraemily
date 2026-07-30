const SITE_CONFIG = Object.freeze({
  professionalName: "Lara Emily",
  whatsappNumber: "5585989291419",
  initialMessage: "Olá, Lara! Conheci seu trabalho pelo site e gostaria de saber mais sobre os atendimentos.",
  instagramUrl: "https://www.instagram.com/enflaraemily/"
});

const whatsappUrl = `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(SITE_CONFIG.initialMessage)}`;
document.querySelectorAll(".whatsapp-link").forEach((link) => {
  link.href = whatsappUrl;
  link.setAttribute("aria-label", `${link.textContent.trim() || "Conversar"} — abre o WhatsApp em uma nova aba`);
});

document.getElementById("current-year").textContent = new Date().getFullYear();

const menuButton = document.querySelector(".menu-toggle");
const mobileMenu = document.getElementById("mobile-menu");

function closeMenu() {
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.setAttribute("aria-label", "Abrir menu");
  mobileMenu.hidden = true;
}

menuButton.addEventListener("click", () => {
  const isOpen = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!isOpen));
  menuButton.setAttribute("aria-label", isOpen ? "Abrir menu" : "Fechar menu");
  mobileMenu.hidden = isOpen;
  if (!isOpen) mobileMenu.querySelector("a").focus();
});

mobileMenu.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));
window.addEventListener("resize", () => {
  if (window.innerWidth > 1024) closeMenu();
});

function setupDialog(dialog, openers) {
  const closeButton = dialog.querySelector(".modal-close");
  openers.forEach((opener) => opener?.addEventListener("click", () => {
    dialog.showModal();
    document.body.classList.add("modal-open");
  }));
  const close = () => {
    dialog.close();
    document.body.classList.remove("modal-open");
  };
  closeButton.addEventListener("click", close);
  dialog.addEventListener("click", (event) => {
    const rect = dialog.getBoundingClientRect();
    const inside = event.clientX >= rect.left && event.clientX <= rect.right &&
      event.clientY >= rect.top && event.clientY <= rect.bottom;
    if (!inside) close();
  });
  dialog.addEventListener("close", () => document.body.classList.remove("modal-open"));
}

setupDialog(
  document.getElementById("price-modal"),
  [document.getElementById("open-price-modal"), document.querySelector("[data-open-price]")]
);
setupDialog(document.getElementById("privacy-modal"), [document.getElementById("open-privacy")]);

const detailsElements = document.querySelectorAll(".accordion details");
detailsElements.forEach((details) => {
  details.addEventListener("toggle", () => {
    if (!details.open) return;
    detailsElements.forEach((other) => {
      if (other !== details) other.open = false;
    });
  });
});

const revealElements = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -24px" });
  revealElements.forEach((element) => observer.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add("is-visible"));
}
