(() => {
  const list = document.getElementById('walkthrough-topic-list');
  if (!list) return;
  const sections = [...list.querySelectorAll('details')];
  const tools = document.querySelector('[data-walkthrough-tools]');
  const filter = document.getElementById('walkthrough-filter');
  const status = document.querySelector('[data-walkthrough-status]');
  if (!tools || !filter || !status) return;
  tools.hidden = false;
  const normalize = value => value.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
  const index = new Map(sections.map(section => [section, normalize(section.textContent)]));
  let savedOpen = null;
  filter.addEventListener('input', () => {
    const query = normalize(filter.value);
    const words = query.split(/\s+/).filter(Boolean);
    if (words.length && savedOpen === null) savedOpen = sections.map(section => section.open);
    let count = 0;
    sections.forEach((section, i) => {
      const match = words.every(word => index.get(section).includes(word));
      section.hidden = !match;
      if (match) count++;
      if (words.length) section.open = match;
      else if (savedOpen !== null) section.open = savedOpen[i];
    });
    if (!words.length) savedOpen = null;
    status.hidden = !words.length;
    status.textContent = count
      ? count + (count === 1 ? ' section matches.' : ' sections match.') + ' Showing each matching section in full.'
      : 'No matching sections. Try another word, or clear the filter to browse all topics.';
  });
  document.querySelector('[data-walkthrough-expand]').addEventListener('click', () => {
    sections.filter(section => !section.hidden).forEach(section => { section.open = true; });
  });
  document.querySelector('[data-walkthrough-collapse]').addEventListener('click', () => {
    sections.forEach(section => { section.open = false; });
  });
  let printState = null;
  const preparePrint = () => {
    if (printState) return;
    printState = sections.map(section => ({ open: section.open, hidden: section.hidden }));
    sections.forEach(section => { section.open = true; section.hidden = false; });
  };
  const restorePrint = () => {
    if (!printState) return;
    sections.forEach((section, i) => {
      section.open = printState[i].open;
      section.hidden = printState[i].hidden;
    });
    printState = null;
  };
  window.addEventListener('beforeprint', preparePrint);
  window.addEventListener('afterprint', restorePrint);
  document.querySelector('[data-walkthrough-print]').addEventListener('click', () => {
    preparePrint();
    window.print();
    restorePrint();
  });
})();
