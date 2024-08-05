// // Function to apply transition effect to the detected cursor or caret elements
// function applyTransitionEffectToCursorElements(delay, easing) {
//     // Function to detect and apply transition effect
//     function detectAndApplyTransition() {
//         // List of potential selectors to find cursor or caret elements
//         const potentialSelectors = [
//             '.kix-cursor',           // Example from Google Docs
//             '.notion-caret',         // Hypothetical class for Notion
//             '.caret',                // Common name
//             '.cursor',               // Common name
//             '.cm-cursor',            // CodeMirror (used in some editors)
//             '.editor-caret',         // Generic name
//             '[data-testid="cursor"]', // Hypothetical data attribute
//             '[class*="caret"]',      // Class names containing 'caret'
//             '[class*="cursor"]'      // Class names containing 'cursor'
//         ];

//         let found = false;

//         // Iterate over each potential selector
//         for (let selector of potentialSelectors) {
//             const elements = document.querySelectorAll(selector);

//             if (elements.length > 0) {
//                 found = true;
//                 elements.forEach((element) => {
//                     let elementStyle = element.getAttribute("style") || "";

//                     if (!elementStyle.includes(`transition: all ${delay}ms ${easing};`)) {
//                         element.style.transition = `all ${delay}ms ${easing}`;
//                         element.setAttribute('style', elementStyle + element.style.cssText);
//                     }
//                 });
//                 console.log(`Elements found with selector: ${selector}`);
//                 break; // Exit if at least one selector is successful
//             }
//         }

//         if (!found) {
//             console.log("Cursor or caret elements not found. Check the selectors or DOM structure.");
//         }
//     }

//     // Initial application
//     detectAndApplyTransition();

//     // Observe for changes in the document and reapply the transition effect
//     const observer = new MutationObserver(() => detectAndApplyTransition());
//     observer.observe(document.body, { childList: true, subtree: true });
// }

// // Get the transition delay and easing function from Chrome storage and apply the transition effect
// chrome.storage.sync.get(['transitionDelay', 'transitionEasing'], (data) => {
//     const delay = data.transitionDelay || 200; // Default to 200ms if not set
//     const easing = data.transitionEasing || 'ease'; // Default to 'ease' if not set

//     applyTransitionEffectToCursorElements(delay, easing);
// });
