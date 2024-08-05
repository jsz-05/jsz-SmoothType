function applyTransitionEffect(delay, easing) {
  const carets = document.querySelectorAll('.cm-cursor');
  let curCount = 0;

  carets.forEach((caret) => {
    let caretStyle = caret.getAttribute("style") || "";
    const transitionStyle = `transition: all ${delay}ms ${easing};`;

    if (!caretStyle.includes(transitionStyle)) {
      caret.setAttribute("style", caretStyle + transitionStyle);
      curCount++;
    }
  });

}

// Function to check for cursor elements and apply styles
function initialize() {
  chrome.storage.sync.get(['transitionDelay', 'transitionEasing'], (data) => {
    const delay = data.transitionDelay || 100; // Default to 100ms if not set
    const easing = data.transitionEasing || 'ease'; // Default to 'ease' if not set
    applyTransitionEffect(delay, easing);
  });
}

// Initial attempt
initialize();

// Retry mechanism in case elements are loaded dynamically
const observer = new MutationObserver(() => {
  initialize();
});

observer.observe(document.body, { childList: true, subtree: true });

setTimeout(() => {
  initialize();
}, 3000); // Retry after 3 seconds
