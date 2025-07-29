// Simple JavaScript Quiz Application

const quizData = [
    {
        question: "What does the 'return' statement do in a function?",
        options: [
            "Stops the function and returns a value",
            "Declares a variable",
            "Defines a function",
            "Loops through an array"
        ],
        answer: 0
    },
    {
        question: "How do you declare a function in JavaScript?",
        options: [
            "function myFunc() {}",
            "declare function myFunc() {}",
            "func myFunc() {}",
            "def myFunc() {}"
        ],
        answer: 0
    },
    {
        question: "Which method calls a function for each array element?",
        options: [
            "forEach()",
            "map()",
            "filter()",
            "reduce()"
        ],
        answer: 0
    },
    {
        question: "How do you write an anonymous function?",
        options: [
            "function() {}",
            "function myFunc() {}",
            "() => {}",
            "Both 1 and 3"
        ],
        answer: 3
    },
    {
        question: "What is the correct way to invoke a function named 'sum'?",
        options: [
            "call sum()",
            "sum()",
            "invoke sum",
            "sum"
        ],
        answer: 1
    }
];

let currentQuestion = 0;
let score = 0;

const app = document.createElement('div');
app.style.maxWidth = "400px";
app.style.margin = "40px auto";
app.style.fontFamily = "Arial, sans-serif";
app.style.padding = "20px";
app.style.border = "1px solid #ccc";
app.style.borderRadius = "8px";
app.style.background = "#fafafa";
document.body.appendChild(app);

function showQuestion() {
    app.innerHTML = '';
    const q = quizData[currentQuestion];

    const questionEl = document.createElement('h2');
    questionEl.textContent = `Q${currentQuestion + 1}: ${q.question}`;
    app.appendChild(questionEl);

    q.options.forEach((opt, idx) => {
        const btn = document.createElement('button');
        btn.textContent = opt;
        btn.style.display = "block";
        btn.style.margin = "10px 0";
        btn.style.width = "100%";
        btn.style.padding = "10px";
        btn.style.fontSize = "16px";
        btn.onclick = () => selectAnswer(idx, btn);
        app.appendChild(btn);
    });

    const nextBtn = document.createElement('button');
    nextBtn.textContent = currentQuestion === quizData.length - 1 ? "Finish Quiz" : "Next";
    nextBtn.style.marginTop = "20px";
    nextBtn.style.padding = "10px 20px";
    nextBtn.style.fontSize = "16px";
    nextBtn.disabled = true;
    nextBtn.onclick = nextQuestion;
    nextBtn.id = "nextBtn";
    app.appendChild(nextBtn);

    const scoreEl = document.createElement('div');
    scoreEl.textContent = `Score: ${score}`;
    scoreEl.style.marginTop = "15px";
    app.appendChild(scoreEl);
}

function selectAnswer(selectedIdx, btn) {
    const q = quizData[currentQuestion];
    const buttons = app.querySelectorAll('button:not(#nextBtn)');
    buttons.forEach((b, idx) => {
        b.disabled = true;
        if (idx === q.answer) b.style.background = "#c8e6c9";
        if (idx === selectedIdx && idx !== q.answer) b.style.background = "#ffcdd2";
    });
    if (selectedIdx === q.answer) score++;
    document.getElementById('nextBtn').disabled = false;
}

function nextQuestion() {
    currentQuestion++;
    if (currentQuestion < quizData.length) {
        showQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    app.innerHTML = `<h2>Quiz Completed!</h2>
        <p>Your Score: ${score} / ${quizData.length}</p>
        <button id="restartBtn" style="padding:10px 20px;font-size:16px;">Restart Quiz</button>`;
    document.getElementById('restartBtn').onclick = restartQuiz;
}

function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    showQuestion();
}

// Start the quiz
showQuestion();