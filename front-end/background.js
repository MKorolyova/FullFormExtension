
function getSelectedText() {
    let text = "";
    if (typeof window.getSelection !== "undefined") {
        text = window.getSelection().toString();
    } else if (typeof document.selection !== "undefined" && document.selection.type === "Text") {
        text = document.selection.createRange().text;
    }
    return text;
}

document.addEventListener("mouseup", async () => {
    const selectedText = getSelectedText();
    document.getElementById('output').textContent = selectedText;
    if (selectedText) {
        const language = document.getElementById('languageSelect').value;
        const translation = await askAI(language, selectedText);
        document.getElementById('output').textContent = translation;
    }
});