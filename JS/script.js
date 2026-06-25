const startScreen = document.getElementById("start-screen");
const quizContainer = document.getElementById("quiz-container");
const startButton = document.getElementById("start-btn");
const homeButton = document.getElementById("home-btn");
const questions = [
    {
        question: "What is HTML?",
        answers: [
            { text: "Programming Language", correct: false },
            { text: "Markup Language", correct: true },
            { text: "Database", correct: false },
            { text: "Operating System", correct: false }
        ]
    },
    {
        question: "Which language is used for styling?",
        answers: [
            { text: "HTML", correct: false },
            { text: "Python", correct: false },
            { text: "CSS", correct: true },
            { text: "C++", correct: false }
        ]
    },
    {
        question: "What does CSS stand for?",
        answers: [
            { text: "Computer Style Sheets", correct: false },
            { text: "Creative Style System", correct: false },
            { text: "Cascading Style Sheets", correct: true },
            { text: "Colorful Style Sheets", correct: false }
        ]
    }, 
    {
        question: "Which method is used to print in console?",
        answers: [
            { text: "print()", correct: false },
            { text: "console.log()", correct: true },
            { text: "write()", correct: false },
            { text: "document.print()", correct: false }
        ]
    },
    {
        question: "Which keyword is used to declare a variable?",
        answers: [
            { text: "var", correct: true },
            { text: "loop", correct: false },
            { text: "function", correct: false },
            { text: "tag", correct: false }
        ]
    },
    {
        question: "Which operator is used for comparison?",
        answers: [
            { text: "=", correct: false },
            { text: "==", correct: true },
            { text: "+", correct: false },
            { text: "%", correct: false }
        ]
    },
    {
        question: "Which loop repeats until condition becomes false?",
        answers: [
            { text: "if", correct: false },
            { text: "switch", correct: false },
            { text: "while", correct: true },
            { text: "break", correct: false }
        ]
    },
    {
        question: "Which property is used to change background color?",
        answers: [
            { text: "bgcolor", correct: false },
            { text: "background-color", correct: true },
            { text: "color", correct: false },
            { text: "background-style", correct: false }
        ]
    },
    {
        question: "Which function shows popup message?",
        answers: [
            { text: "prompt()", correct: false },
            { text: "alert()", correct: true },
            { text: "confirm()", correct: false },
            { text: "log()", correct: false }
        ]
    },
    {
        question: "Which symbol is used for ID selector in CSS?",
        answers: [
            { text: ".", correct: false },
            { text: "#", correct: true },
            { text: "*", correct: false },
            { text: "$", correct: false }
        ]
    },
    {
        question: "Which method takes input from user?",
        answers: [
            { text: "alert()", correct: false },
            { text: "console.log()", correct: false },
            { text: "prompt()", correct: true },
            { text: "write()", correct: false }
    ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const backButton = document.getElementById("back-btn");
let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    showQuestion();
}

function showQuestion(){
    resetState();
    backButton.style.display =
    currentQuestionIndex === 0 ? "none" : "inline-block";
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.innerHTML = currentQuestion.question;
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    answerButtons.innerHTML = "";
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.style.background = "green";
        score++;
    }
    else{
        selectedBtn.style.background = "red";
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.style.background = "green";
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}
    nextButton.addEventListener("click", () => {
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }
    else{
        questionElement.innerHTML =
        `Quiz Finished!<br>
         Your Score is ${score} out of ${questions.length}`;
        answerButtons.innerHTML = "";
        nextButton.style.display = "none";
    }
});
    backButton.addEventListener("click", () => {
    if(currentQuestionIndex > 0){
        currentQuestionIndex--;
        showQuestion();
    }
});
    startButton.addEventListener("click", () => {
    startScreen.style.display = "none";
    quizContainer.style.display = "block";
    homeButton.style.display = "inline-block";
    startQuiz();
});
    homeButton.addEventListener("click", () => {
    quizContainer.style.display = "none";
    startScreen.style.display = "block";
    currentQuestionIndex = 0;
    score = 0;
});

