(() => {
  const popup = document.getElementById("grand-opening-popup");
  const openButton = document.querySelector("[data-sale-open]");
  if (!popup || !openButton) return;

  const seenKey = "professor-jerry-grand-opening-2026-seen";
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  let openTimer;
  let closeTimer;
  let previousFocus;
  let motion;
  let closing = false;

  function sprayConfetti() {
    if (reducedMotion.matches) return;
    const layer = document.createElement("div");
    layer.className = "sale-confetti";
    layer.setAttribute("aria-hidden", "true");
    popup.append(layer);
    const colors = ["#e9b72e", "#e84436", "#39a8ef", "#fff2c6"];
    for (let index = 0; index < 42; index++) {
      const piece = document.createElement("span");
      piece.style.backgroundColor = colors[index % colors.length];
      piece.style.left = (15 + Math.random() * 70) + "%";
      layer.append(piece);
      piece.animate([
        { transform: "translate(0, -20px) rotate(0deg)", opacity: 0 },
        { opacity: 1, offset: 0.12 },
        {
          transform: "translate(" + (Math.random() * 240 - 120) + "px, " +
            (popup.clientHeight + 40) + "px) rotate(" + (360 + Math.random() * 720) + "deg)",
          opacity: 0
        }
      ], { duration: 1800 + Math.random() * 1400, delay: Math.random() * 350, fill: "both" });
    }
    setTimeout(() => layer.remove(), 3700);
  }

  async function dismissSale() {
    if (!popup.open || closing) return;
    closing = true;
    clearTimeout(closeTimer);
    motion?.cancel();
    popup.classList.add("is-closing");
    motion = popup.animate([
      { opacity: 1, transform: "translateX(0)" },
      { opacity: 0, transform: "translateX(-110vw)" }
    ], { duration: reducedMotion.matches ? 0 : 750, easing: "ease-in", fill: "forwards" });
    try { await motion.finished; } catch { return; }
    popup.close();
  }

  async function showSale() {
    clearTimeout(openTimer);
    if (popup.open) return;
    clearTimeout(closeTimer);
    closing = false;
    popup.classList.remove("is-closing");
    previousFocus = document.activeElement;
    popup.showModal();
    try { localStorage.setItem(seenKey, "true"); } catch {
      // Continue when browser storage is unavailable.
    }
    motion = popup.animate([
      { opacity: 0, transform: "translateX(110vw)" },
      { opacity: 1, transform: "translateX(0)" }
    ], { duration: reducedMotion.matches ? 0 : 1100, easing: "cubic-bezier(.16, 1, .3, 1)", fill: "both" });
    try { await motion.finished; } catch { return; }
    if (!popup.open || closing) return;
    sprayConfetti();
    closeTimer = setTimeout(dismissSale, 10000);
  }

  popup.addEventListener("cancel", event => {
    event.preventDefault();
    dismissSale();
  });
  popup.addEventListener("close", () => {
    clearTimeout(closeTimer);
    motion?.cancel();
    popup.querySelector(".sale-confetti")?.remove();
    popup.classList.remove("is-closing");
    closing = false;
    previousFocus?.focus({ preventScroll: true });
  });
  popup.querySelector("[data-sale-dismiss]").addEventListener("click", dismissSale);
  openButton.addEventListener("click", showSale);

  let alreadySeen = false;
  try { alreadySeen = localStorage.getItem(seenKey) === "true"; } catch {
    // Without storage, show automatically once per page load.
  }
  if (!alreadySeen) openTimer = setTimeout(showSale, 7000);
})();

