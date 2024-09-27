const state = {
    view: {
    squares: document.querySelectorAll(".square"),
    enemy: document.querySelector(".enemy"),
    timeLeft: document.querySelector("#time-left"),
    score: document.querySelector("#score"),
    lives: document.querySelector(".menu-lives h2"),
    },
    values: {
        gameVelocity: 1000,
        hitPosition: 0,
        result: 0,
        currentTime: 40,
        lives: 5,
    },
    actions: {
        countDownTimerId: setInterval(countDown, 500),
        timerId: setInterval (randomSquare, 500),
    },
};

function countDown() {
    state.values.currentTime--;
    state.view.timeLeft.textContent = state.values.currentTime;
    
    if (state.values.currentTime < 0 ||  state.values.lives === 0) { 
        clearInterval(state.actions.countDownTimerId);
        clearInterval(state.actions.timerId);
        alert("O tempo acabou! O seu resultado foi: " + state.values.result);
        resetGame();
    }
}

function playSound(audioName) {
    let audio = new Audio(`./src/sounds/${audioName}.m4a`);
    audio.volume = 0.2;
    audio.play();
}

function randomSquare(){
    state.view.squares.forEach((square) => {
        square.classList.remove("enemy")
    });

    let randomNumber = Math.floor(Math.random() * 9);
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add("enemy");
    state.values.hitPosition = randomSquare.id;
}

function addListenerHitBox(){
    state.view.squares.forEach((square) => {
        square.addEventListener("mousedown", () => {
            if (square.id === state.values.hitPosition) {
                state.values.result++;
                state.view.score.textContent = state.values.result;
                state.values.hitPosition = null;
                playSound("hit");
            }
            else {
                loseLife();
            }
        });
    });
}

function loseLife() {
    state.values.lives--;
    state.view.lives.textContent = `x${state.values.lives}`;

    if (state.values.lives === 0) {
        clearInterval(state.actions.timerId);
        clearInterval(state.actions.countDownTimerId);
        alert("Game Over! O seu resultado foi: " + state.values.result);
        resetGame(); 
    }
}

function resetGame() {
    
    state.values.result = 0;
    state.values.lives = 5;
    state.values.currentTime = 40;

    state.view.score.textContent = state.values.result;
    state.view.lives.textContent = `x${state.values.lives}`;
    state.view.timeLeft.textContent = state.values.currentTime;

    state.actions.countDownTimerId = setInterval(countDown, 500);
    state.actions.timerId = setInterval(randomSquare, 500);

}

function init() {
    addListenerHitBox ();
}

init();
