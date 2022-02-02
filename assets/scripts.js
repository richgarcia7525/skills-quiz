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


let currentQuiz = 0
let score = 0
// when the user clicks on the start button this will execute the
//function startQuiz 
startBtn.addEventListener("click", startQuiz);
function startQuiz() {
    console.log('started')
    quiz.style.display = "block";
    intro.style.display = "none";
    deselectAnswers()
    const currentQuizData = quizData[currentQuiz]
    questionEl.innerText = currentQuizData.question
    a_text.innerText = currentQuizData.a
    b_text.innerText = currentQuizData.b
    c_text.innerText = currentQuizData.c
    d_text.innerText = currentQuizData.d
}


function deselectAnswers() {
    answerEls.forEach(answerEl => answerEl.checked = false)
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



