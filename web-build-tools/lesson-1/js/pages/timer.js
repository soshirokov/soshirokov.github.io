import { printError } from '../utils/print.js';
import { runTimer } from '../utils/runTimer.js';
import { stopTimer } from '../utils/stopTimer.js';

const form = document.getElementById("timer");
const started = document.getElementById("started");

form.onsubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(form);

    const timerSet = formData.get("timerSet");

    if (!timerSet) {
        printError('Введите количество секунд')
        return
    }

    if (started.dataset.started == 0) {
        started.dataset.started = runTimer();
    } else {
        stopTimer(started.dataset.started);
    }
};