// Function to apply transition effect to elements with class 'kix-cursor'
function applyTransitionEffect(delay, easing) {
    const cursors = document.getElementsByClassName("kix-cursor");
  
    for (let cursor of cursors) {
      if (cursor) {
        let cursorStyle = cursor.getAttribute("style") || "";
  
        if (!cursorStyle.includes(`transition: all ${delay}ms ${easing};`)) {
          cursor.style.transition = `all ${delay}ms ${easing}`;
          cursor.setAttribute('style', cursorStyle + cursor.style.cssText);
        }
      }
    }
  }
  
  // Get the transition delay and easing function from Chrome storage and apply the transition effect
  chrome.storage.sync.get(['transitionDelay', 'transitionEasing'], (data) => {
    const delay = data.transitionDelay || 100; // Default to 100ms if not set
    const easing = data.transitionEasing || 'ease'; // Default to 'ease' if not set
    applyTransitionEffect(delay, easing);
  
    // Observe for changes in the document and reapply the transition effect
    const observer = new MutationObserver(() => applyTransitionEffect(delay, easing));
    observer.observe(document.body, { childList: true, subtree: true });
  });
  