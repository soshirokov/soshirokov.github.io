import { stopTimer } from '../utils/stopTimer.js';

const sound = new Howl({
    src: ['./sounds/timer.mp3']
});

const timerCtrl = document.getElementById("timerCtrl");

export const runTimer = () => {
    timerCtrl.innerHTML = 'Стоп';
    const timerStart = setInterval(() => {
        const timerSet = document.querySelector('#timerSet');
        if (timerSet.value > 0) {
            timerSet.value = timerSet.value - 1;
        } else {
            stopTimer(timerStart);
            const soundId = sound.play();
            setTimeout(() => {
                sound.stop(soundId);
            }, 1000)
        }
    }, 1000);
    return timerStart;
}