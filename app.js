const button = document.getElementById('button');
const adviceId = document.getElementById('adviceId');
const adviceText = document.getElementById('adviceText');

button.addEventListener('click', getAdvice);
window.addEventListener('DOMContentLoaded', getAdvice);

let active = false;

async function getAdvice() {
    if(active) return;

    const response = await fetch('https://api.adviceslip.com/advice');
    const data = await response.json();

    adviceId.textContent = `#${data.slip.id}`;
    adviceText.textContent = data.slip.advice;

    active = true;
    button.disabled = true;
    setTimeout(_ => {
        active = false;
        button.disabled = false;
    }, 2000)
}