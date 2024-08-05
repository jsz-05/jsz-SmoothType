document.addEventListener('DOMContentLoaded', () => {
  const settingsDiv = document.getElementById('settings');
  const unsupportedDiv = document.getElementById('unsupported');
  const delayInput = document.getElementById('delay');
  const easingSelect = document.getElementById('easing');
  const saveButton = document.getElementById('save');

  chrome.storage.local.get('isSupported', (data) => {
    if (data.isSupported) {
      settingsDiv.classList.remove('hidden');
      unsupportedDiv.classList.add('hidden');
  
      // Load the saved delay and easing value from Chrome storage
      chrome.storage.sync.get(['transitionDelay', 'transitionEasing'], (data) => {
        if (data.transitionDelay) {
          delayInput.value = data.transitionDelay;
        }
        if (data.transitionEasing) {
          easingSelect.value = data.transitionEasing;
        }
      });
  
      // Save the delay and easing value to Chrome storage
      saveButton.addEventListener('click', () => {
        const delay = delayInput.value;
        const easing = easingSelect.value;
        chrome.storage.sync.set({ transitionDelay: delay, transitionEasing: easing }, () => {
          alert('Transition settings saved! Reload to apply changes!');
        });
      });
    } else {
      settingsDiv.classList.add('hidden');
      unsupportedDiv.classList.remove('hidden');
    }
  });
});
