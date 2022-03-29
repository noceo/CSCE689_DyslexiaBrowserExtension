const change_background_button = document.getElementById("change-background");
const change_font_select = document.getElementById("change-font");
const decrease_font_size = document.getElementById("decrease-font-size");
const increase_font_size = document.getElementById("increase-font-size");

change_background_button.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: setBackgroundColor,
  });
});

change_font_select.addEventListener("change", async (event) => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.storage.sync.set({ font: event.target.value });
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: setFont,
    args: [event],
  });
});

decrease_font_size.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: setFontSize,
    args: [false],
  });
});

increase_font_size.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: setFontSize,
    args: [true],
  });
});

function setBackgroundColor() {
  chrome.storage.sync.get("background_color", ({ background_color }) => {
    document.body.style.backgroundColor = background_color;
  });
}

function setFont() {
  chrome.storage.sync.get("font", ({ font }) => {
    const elements = document.querySelectorAll("p, span, a, li");
    if (font === "---") {
      for (var i = 0; i < elements.length; i++) {
        elements[i].style.fontFamily = "";
      }
    } else {
      for (var i = 0; i < elements.length; i++) {
        elements[i].style.fontFamily = `${font}`;
      }
    }
  });
}

function setFontSize(increase) {
  let font_size;
  const elements = document.querySelectorAll("p, span, a, li");
  for (var i = 0; i < elements.length; i++) {
    font_size = window
      .getComputedStyle(elements[i], null)
      .getPropertyValue("font-size");
    // TODO: include check if a valid font-size is determined
    font_size = parseFloat(font_size);
    if (increase) {
      elements[i].style.fontSize = `${font_size + 1}px`;
    } else {
      elements[i].style.fontSize = `${font_size - 1}px`;
    }
  }
}
