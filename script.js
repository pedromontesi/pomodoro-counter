const dataSelected = document.querySelector('[data-number]');

function Pomodoro(minutes, seconds) {
    this.minutes = minutes;
    this.seconds = seconds;
}

const pomodoroTimer = new Pomodoro(25, 0);

const timer = setInterval(() => {
    if (pomodoroTimer.seconds === 0 && pomodoroTimer.minutes === 0) {
        clearInterval(timer);
        alert("Short break!");
    } else {
        if (pomodoroTimer.seconds === 0 && pomodoroTimer.minutes > 0) {
            pomodoroTimer.minutes--;
            pomodoroTimer.seconds = 59;
        } else {
            pomodoroTimer.seconds--;
        }
    }
    
    // Formatação do tempo para "00:00"
    const formattedTime = 
        `${pomodoroTimer.minutes < 10 ? '0' : ''}${pomodoroTimer.minutes}:` + 
        `${pomodoroTimer.seconds < 10 ? '0' : ''}${pomodoroTimer.seconds}`;

    dataSelected.innerText = formattedTime; 
}, 1000); 
