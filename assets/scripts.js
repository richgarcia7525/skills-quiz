const timeLimit = 60 * 1000;
const intro = document.getElementById('intro')
const startBtn = document.getElementById('start-btn')
const submitBtn = document.getElementById('submit')
const quiz = document.getElementById('quiz')
const questionEl = document.getElementById('question')
const answerEls = document.querySelectorAll('.answer')
const a_text = document.getElementById('a_text')
const b_text = document.getElementById('b_text')
const c_text = document.getElementById('c_text')
const d_text = document.getElementById('d_text')

const highScoresBtn = document.getElementById('high-scores-btn')
const submitHighScoreBtn = document.getElementById('submit-high-score-btn')
const homeBtn = document.getElementById('return-home-btn')
const results = document.getElementById('results')
const initials = document.getElementById('initials')
const correctAnswers = document.getElementById('correct-answers')

const timer = document.getElementById('timer')

answerEls.forEach(answerEl => answerEl.addEventListener("click", setAnswer))
highScoresBtn.addEventListener("click", showHighScores);
homeBtn.addEventListener("click", returnHome);

let currentQuiz = 0
let score = 0
// when the user clicks on the start button this will execute the
//function startQuiz 
startBtn.addEventListener("click", startQuiz);
function updateTimerText(ms) {
    if (ms === -1) {
        timer.innerText = '';
    }
    else if (ms > 0) {
        timer.innerText = 'Time Remaining: ' + (ms / 1000.0).toFixed(1) + ' seconds';
    }
    else {
        timer.innerText = "Time's up!"
    }
}

function updateTimer() {
    decrementTimer(100);
    updateTimerText(timerValue)
}

function startTimer() {
    timerValue = timeLimit;
    updateTimerText(timerValue)
    timerId = setInterval(updateTimer, 100);
}

function startQuiz() {
    currentQuiz = 0;
    score = 0;
    answer = null;
    quiz.style.display = "block";
    intro.style.display = "none";
    highScoresBtn.style.visibility = "hidden";
    deselectAnswers()
    const currentQuizData = quizData[currentQuiz]
    questionEl.innerText = currentQuizData.question
    a_text.innerText = currentQuizData.a
    b_text.innerText = currentQuizData.b
    c_text.innerText = currentQuizData.c
    d_text.innerText = currentQuizData.d

    loadQuiz()
    startTimer()
}

function stopQuiz() {
    updateTimerText(-1);
    clearInterval(timerId);

    rank = 0
    let highScores = getHighScores();
    for (let highScore of highScores) {
        if (score > highScore.correct || rank == highScoreMaxCount)
            break;

        rank++;
    }

    correctAnswers.innerHTML = `
      You answered ${score} out of ${quizData.length} questions correctly
    `

    if (rank < highScoreMaxCount) {
        highScoreInitials = '';
        submitHighScoreBtn.innerHTML = 'Submit';
        initials.innerHTML = `
        <h3>Congratulations, you've reached rank #${rank + 1}!</h3>
        <label>Enter your initials</label>
        <input id="high-score-input" maxlength="3"></input>
      `
    }
    else {
        initials.innerHTML = '';
        submitHighScoreBtn.innerHTML = 'View High Scores';
        highScoresBtn.style.visibility = "visible";
    }

    quiz.style.display = "none";
    results.style.display = "block";
}

function submitHighScore() {
    scores.style.display = "block";
    quiz.style.display = "none";
    let initialsEl = document.getElementById('high-score-input');
    if (initialsEl) {
        setHighScore(rank, initialsEl.value, score);
    }
    updateHighScores();
    scores.style.display = "block";
    results.style.display = "none";
}

function updateHighScores() {
    let highScores = getHighScores();
    for (let rank = 1; rank <= highScoreMaxCount; rank++) {
        let scoreEl = document.getElementById('high-score-' + rank).getElementsByClassName('name')[0];
        let score = highScores[rank - 1];
        if (score) {
            scoreEl.innerHTML = rank + ') ' + score.initials + ' - ' + score.correct + '/' + quizData.length;
        }
        else {
            scoreEl.innerHTML = '';
        }
    }
}

function loadQuiz() {
    deselectAnswers()
    const currentQuizData = quizData[currentQuiz]

    questionEl.innerText = currentQuizData.question
    a_text.innerText = currentQuizData.a
    b_text.innerText = currentQuizData.b
    c_text.innerText = currentQuizData.c
    d_text.innerText = currentQuizData.d
}

function decrementTimer(value) {
    timerValue -= value;
    if (timerValue <= 0) {
        clearInterval(timerId);
        stopQuiz();
    }
}

const quizData = [
    {
        question: "Why do JavaScript and Java have similiar names?",
        a: "JavaScript is a stripped-down version of Java",
        b: "JavaScript's syntax is loosley based on Java's",
        c: "They both originated on the island of Java",
        d: "None of the above",
        correct: "b",
    },
    {
        question: "____JavaScript is also called server-side JavaScript.",
        a: "Microsoft",
        b: "Navigator",
        c: "LiveWire",
        d: "Native",
        correct: "c",
    },
    {
        question: "Inside which HTML element do we put JavaScript?",
        a: "<js>",
        b: "<scripting>",
        c: "<script>",
        d: "<javascript>",
        correct: "c",
    },
    {
        question: "Choose the server-side JavaScript object?",
        a: "FileUpLoad",
        b: "Function",
        c: "File",
        d: "Date",
        correct: "c",
    },
    {
        question: "Choose the client-side JavaScript object?",
        a: "Database",
        b: "Cursor",
        c: "Client",
        d: "FileUpLoad",
        correct: "d",
    },
];



