const timerCtrl = document.getElementById("timerCtrl");
const started = document.getElementById("started");

export const stopTimer = (intervalId) => {
    clearInterval(intervalId);
    started.dataset.started = 0;
    timerCtrl.innerHTML = 'Старт';
}