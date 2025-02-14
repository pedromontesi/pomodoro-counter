const button = document.querySelector('.button-class');
const counter = document.querySelector('.counter');
const pomodoroText = document.querySelector('.timer-container h2 span');

function Pomodoro(minutes, seconds) {
    this.minutes = minutes;
    this.seconds = seconds;
}

const pomodoroTime = new Pomodoro(25, 0); 
const shortBreakTime = new Pomodoro(5, 0);

let currentTimer = { ...pomodoroTime }; 
let timer;
let isRunning = false;
let isPomodoro = true;

function startTimer() {
    if (timer) {
        clearInterval(timer);
    }

    timer = setInterval(() => {
        if (currentTimer.minutes === 0 && currentTimer.seconds === 0) {
            clearInterval(timer);
            isRunning = false;
            button.textContent = "▶";


            if (isPomodoro) {
                currentTimer = { ...shortBreakTime }; 
                pomodoroText.textContent = "Short Break!";
                isPomodoro = false;
            } else {
                currentTimer = { ...pomodoroTime };
                pomodoroText.textContent = "Pomodoro";
                isPomodoro = true;
            }

            return;
        }

        if (currentTimer.seconds === 0) {
            currentTimer.minutes--;
            currentTimer.seconds = 59;
        } else {
            currentTimer.seconds--;
        }

       
        counter.textContent =
            `${currentTimer.minutes < 10 ? '0' : ''}${currentTimer.minutes}:` +
            `${currentTimer.seconds < 10 ? '0' : ''}${currentTimer.seconds}`;
    }, 1000);
}

function handleActive() {
    if (isRunning) {
        clearInterval(timer);
        isRunning = false;
        button.textContent = "▶";
    } else {
        counter.setAttribute("data-number", "active");
        startTimer();
        isRunning = true;
        button.textContent = "■";
    }
}

button.addEventListener('click', handleActive);

function handleOutsideClick(event) {
    if (event.target !== button && !button.contains(event.target)) {
        counter.removeAttribute("data-number");
        clearInterval(timer);
        isRunning = false;
        button.textContent = "▶";
    }
}

document.addEventListener('click', handleOutsideClick);