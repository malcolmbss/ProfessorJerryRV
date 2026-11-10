(() => {
  const scriptUrl = document.currentScript.src;
  const siteRoot = new URL("../../", scriptUrl);
  const picker = document.createElement("details");
  picker.className = "topic-picker";
  picker.innerHTML = `
    <summary>Find a topic</summary>
    <div class="topic-picker-panel">
      <label for="topic-filter">Filter topics</label>
      <input id="topic-filter" type="search" placeholder="Try concierge or winterizing"
        autocomplete="off" aria-controls="topic-links" disabled>
      <p role="status" hidden></p>
      <ul id="topic-links"></ul>
    </div>`;

  const menuButton = document.querySelector(".header-inner [data-nav-toggle]");
  if (menuButton) {
    menuButton.parentElement.classList.add("header-with-topic-picker");
    menuButton.before(picker);
  } else {
    const main = document.querySelector("main");
    if (!main) return;
    const row = document.createElement("div");
    row.className = "container narrow topic-picker-standalone";
    row.append(picker);
    main.before(row);
  }

  const summary = picker.querySelector("summary");
  const filter = picker.querySelector("input");
  const list = picker.querySelector("ul");
  const status = picker.querySelector("[role=status]");
  let loaded = false;
  let loading = false;
  const searchText = new WeakMap();

  function normalizeSearch(text) {
    return text.toLowerCase().replace(/[-\u2010-\u2015]/g, " ").trim();
  }

  function showStatus(message) {
    status.textContent = message;
    status.hidden = !message;
  }

  async function loadTopics() {
    loading = true;
    showStatus("Loading topics\u2026");
    try {
      const response = await fetch(new URL("assets/topics.json", siteRoot));
      if (!response.ok) throw new Error("Topic list unavailable");
      const topics = await response.json();
      topics.sort((first, second) => first.label.localeCompare(second.label, "en"));

      const entries = document.createDocumentFragment();
      for (const { label, href, keywords = [] } of topics) {
        const url = new URL(href, siteRoot);
        if (url.origin !== siteRoot.origin || !["http:", "https:"].includes(url.protocol)) continue;
        const item = document.createElement("li");
        const link = document.createElement("a");
        link.href = url.href;
        link.textContent = label;
        const aliases = Array.isArray(keywords) ? keywords.filter(keyword => typeof keyword === "string") : [];
        searchText.set(item, [label, ...aliases].map(normalizeSearch).join(" "));
        item.append(link);
        entries.append(item);
      }
      list.replaceChildren(entries);
      loaded = true;
      filter.disabled = false;
      showStatus(list.children.length ? "" : "No topics available.");
      if (picker.open && document.activeElement === summary) filter.focus();
    } catch {
      showStatus("Topics couldn\u2019t load. Close and reopen to try again.");
    } finally {
      loading = false;
    }
  }

  filter.addEventListener("input", () => {
    const words = normalizeSearch(filter.value).split(/\s+/);
    let hasMatch = false;
    for (const item of list.children) {
      const text = searchText.get(item);
      item.hidden = !words.every(word => text.includes(word));
      hasMatch ||= !item.hidden;
    }
    showStatus(hasMatch ? "" : "No matching topics.");
  });

  picker.addEventListener("toggle", () => {
    if (!picker.open) return;
    if (loaded) filter.focus();
    else if (!loading) loadTopics();
  });

  picker.addEventListener("keydown", event => {
    if (event.key !== "Escape" || !picker.open) return;
    event.preventDefault();
    picker.open = false;
    summary.focus();
  });

  list.addEventListener("click", event => {
    if (event.target.closest("a")) picker.open = false;
  });

  document.addEventListener("click", event => {
    if (picker.open && !picker.contains(event.target)) picker.open = false;
  });
})();

