(() => {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0
  });

  document.querySelectorAll("[data-regular-price]").forEach(element => {
    const value = element.dataset.regularPrice.trim();
    // Leave unknown prices as placeholders until a numeric price is entered.
    if (!/^\d+(?:\.\d{1,2})?$/.test(value)) return;

    const regularPrice = Number(value);
    if (!Number.isFinite(regularPrice)) return;

    const regularAmount = element.querySelector("[data-regular-amount]");
    const saleAmount = document.getElementById(element.dataset.saleTarget)
      ?.querySelector("[data-sale-amount]");
    if (!regularAmount || !saleAmount) return;

    // Calculate with whole cents to avoid floating-point rounding at dollar boundaries.
    const regularCents = Math.round(regularPrice * 100);
    const salePrice = Math.floor(regularCents * 80 / 10000);
    const prefix = element.dataset.pricePrefix || "";

    regularAmount.textContent = prefix + formatter.format(regularPrice);
    saleAmount.textContent = prefix + formatter.format(salePrice);
  });
})();

