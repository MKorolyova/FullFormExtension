document.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('inputText');
  const btn = document.getElementById('expandBtn');
  const output = document.getElementById('output');

  function showMessage(msg){
    output.textContent = msg;
  }

  btn.addEventListener('click', () => {
    const text = (input.value || '').trim();
    if (!text) {
        translation = background.askAI();
    }
    showMessage( translation);
  });


  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      btn.click();
      e.preventDefault();
    }
  });
});
