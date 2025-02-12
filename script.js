const button = document.querySelector('.button-class');
const counter = document.querySelector('.counter');

function Pomodoro(minutes, seconds) {
    this.minutes = minutes;
    this.seconds = seconds;
}

const pomodoroTimer = new Pomodoro(25, 0);
let timer;

function startTimer() {
    timer = setInterval(() => {
        if (pomodoroTimer.minutes === 0 && pomodoroTimer.seconds === 0) {
            counter.removeAttribute("data-number");
            clearInterval(timer); // Parar o intervalo corretamente
            return;
        }

        if (pomodoroTimer.seconds === 0) {
            pomodoroTimer.minutes--;
            pomodoroTimer.seconds = 59;
        } else {
            pomodoroTimer.seconds--;
        }

        counter.textContent = 
            `${pomodoroTimer.minutes < 10 ? '0' : ''}${pomodoroTimer.minutes}:` +
            `${pomodoroTimer.seconds < 10 ? '0' : ''}${pomodoroTimer.seconds}`;
    }, 1000);
}

function handleActive() {
    counter.setAttribute("data-number", "active");
    startTimer();
}

button.addEventListener('click', handleActive)

function handleOutsideClick(event) {
    if (event.target !== button && !button.contains(event.target)) {
        counter.removeAttribute("data-number");
        clearInterval(timer); // Parar o intervalo corretamente
    }
}

document.addEventListener('click', handleOutsideClick);