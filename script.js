const button = document.querySelector('.button-17');
const counter = document.querySelector('.counter');

let dataSelected = null;
let timer = null; // Variável para armazenar o intervalo do cronômetro

updateDataSelected();

function handleEvent() {
    // Verifica se o cronômetro já está em execução
    if (timer !== null) {
        return; // Se já estiver rodando, não faz nada
    }

    counter.setAttribute("data-number", "active");
    updateDataSelected();

    // Inicia o cronômetro
    timer = setInterval(() => {
        if (pomodoroTimer.seconds === 0 && pomodoroTimer.minutes === 0) {
            clearInterval(timer);
            timer = null; // Reseta a variável do intervalo
            alert("Short break!");
        } else {
            if (pomodoroTimer.seconds === 0 && pomodoroTimer.minutes > 0) {
                pomodoroTimer.minutes--;
                pomodoroTimer.seconds = 59;
            } else {
                pomodoroTimer.seconds--;
            }
        }

        // Previne tempo negativo
        if (pomodoroTimer.minutes < 0) {
            clearInterval(timer);
            timer = null; // Reseta a variável do intervalo
            return;
        }

        // Formata o tempo para "00:00"
        const formattedTime =
            `${pomodoroTimer.minutes < 10 ? '0' : ''}${pomodoroTimer.minutes}:` +
            `${pomodoroTimer.seconds < 10 ? '0' : ''}${pomodoroTimer.seconds}`;

        if (dataSelected) {
            dataSelected.textContent = formattedTime;
        }
    }, 1000);
}

button.addEventListener('click', handleEvent);

function updateDataSelected() {
    dataSelected = document.querySelector('[data-number="active"]');
}

function Pomodoro(minutes, seconds) {
    this.minutes = minutes;
    this.seconds = seconds;
}

const pomodoroTimer = new Pomodoro(25, 0);