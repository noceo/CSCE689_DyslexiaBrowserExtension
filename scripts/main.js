//https://www.w3.org/WAI/RD/2012/text-customization/r11
let background_color = "#FFFFE5";

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ background_color: background_color });
});

