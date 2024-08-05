// Function to apply transition effect to elements with class 'active-cell-border' and their parents
function applyTransitionEffectToActiveCells(delay) {
  const targetElements = document.getElementsByClassName("active-cell-border");

  for (let element of targetElements) {
    if (element.classList.contains("active-cell-border")) {
      let parent = element.parentElement;

      while (parent) {
        parent.style.transition = `all ${delay}ms`;
        parent = parent.parentElement;
      }
    }
  }
}

// Get the transition delay from Chrome storage and apply the transition effect
chrome.storage.sync.get(['transitionDelay'], (data) => {
  const delay = data.transitionDelay || 100; // Default to 100ms if not set
  applyTransitionEffectToActiveCells(delay);

  // Observe for changes in the document and reapply the transition effect
  const observer = new MutationObserver(() => applyTransitionEffectToActiveCells(delay));
  observer.observe(document.body, { childList: true, subtree: true });
});
