let change_background_button = document.getElementById("changeBackground");

change_background_button.addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({active: true, currentWindow: true});

    chrome.scripting.executeScript({
        target: {tabId: tab.id},
        function: setBackgroundColor,
    });
});

function setBackgroundColor() {
    chrome.storage.sync.get("background_color", ({background_color}) => {
        document.body.style.backgroundColor = background_color;
    });
}