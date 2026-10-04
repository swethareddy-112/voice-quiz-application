```javascript
const questions = [
    {
        question: "What is the capital of India?",
        options: [
            "Mumbai",
            "New Delhi",
            "Chennai",
            "Kolkata"
        ],
        answer: "B"
    },

    {
        question: "Which planet is known as the Red Planet?",
        options: [
            "Earth",
            "Jupiter",
            "Mars",
            "Venus"
        ],
        answer: "C"
    },

    {
        question: "Which language is used to style web pages?",
        options: [
            "HTML",
            "Python",
            "CSS",
            "Java"
        ],
        answer: "C"
    },

    {
        question: "How many days are there in a week?",
        options: [
            "5",
            "6",
            "7",
            "8"
        ],
        answer: "C"
    },

    {
        question: "Which device is used to input sound into a computer?",
        options: [
            "Monitor",
            "Keyboard",
            "Printer",
            "Microphone"
        ],
        answer: "D"
    }
];

let currentQuestion = 0;
let score = 0;
let selectedAnswer = "";

const questionElement =
    document.getElementById("question");

const optionsElement =
    document.getElementById("options");

const questionNumber =
    document.getElementById("questionNumber");

const totalQuestions =
    document.getElementById("totalQuestions");

const voiceBtn =
    document.getElementById("voiceBtn");

const nextBtn =
    document.getElementById("nextBtn");

const statusElement =
    document.getElementById("status");

const userAnswer =
    document.getElementById("userAnswer");

const resultElement =
    document.getElementById("result");

const scoreElement =
    document.getElementById("score");

totalQuestions.textContent = questions.length;


/* Load Question */

function loadQuestion() {

    const q = questions[currentQuestion];

    questionElement.textContent = q.question;

    questionNumber.textContent =
        currentQuestion + 1;

    optionsElement.innerHTML = "";

    selectedAnswer = "";

    userAnswer.textContent = "---";

    statusElement.textContent =
        "Click the button and say A, B, C or D.";

    q.options.forEach((option, index) => {

        const letter =
            String.fromCharCode(65 + index);

        const div =
            document.createElement("div");

        div.className = "option";

        div.innerHTML =
            `<strong>${letter}.</strong> ${option}`;

        optionsElement.appendChild(div);
    });
}


/* Speech Recognition */

const SpeechRecognition =
    window.SpeechRecognition ||
    window.webkitSpeechRecognition;

let recognition;

if (!SpeechRecognition) {

    voiceBtn.disabled = true;

    statusElement.textContent =
        "Speech recognition is not supported. Please use Google Chrome.";

} else {

    recognition = new SpeechRecognition();

    recognition.continuous = false;

    recognition.interimResults = false;

    recognition.lang = "en-IN";


    voiceBtn.addEventListener("click", () => {

        try {

            recognition.start();

            voiceBtn.textContent =
                "🔴 Listening...";

            voiceBtn.classList.add("listening");

            statusElement.textContent =
                "🎙️ Listening... Say A, B, C or D.";

        } catch (error) {

            console.log(error);

        }

    });


    recognition.onresult = (event) => {

        const speech =
            event.results[0][0].transcript
            .toLowerCase()
            .trim();

        processAnswer(speech);
    };


    recognition.onend = () => {

        voiceBtn.textContent =
            "🎤 Speak Answer";

        voiceBtn.classList.remove("listening");
    };


    recognition.onerror = (event) => {

        statusElement.textContent =
            "❌ Error: " + event.error;

        voiceBtn.textContent =
            "🎤 Speak Answer";

        voiceBtn.classList.remove("listening");
    };
}


/* Process Answer */

function processAnswer(speech) {

    let answer = "";

    if (
        speech === "a" ||
        speech.includes("option a") ||
        speech.includes("answer a")
    ) {
        answer = "A";
    }

    else if (
        speech === "b" ||
        speech.includes("option b") ||
        speech.includes("answer b")
    ) {
        answer = "B";
    }

    else if (
        speech === "c" ||
        speech.includes("option c") ||
        speech.includes("answer c")
    ) {
        answer = "C";
    }

    else if (
        speech === "d" ||
        speech.includes("option d") ||
        speech.includes("answer d")
    ) {
        answer = "D";
    }

    else {

        statusElement.textContent =
            "❌ Please say A, B, C or D.";

        return;
    }

    selectedAnswer = answer;

    userAnswer.textContent = answer;

    statusElement.textContent =
        "You selected option " + answer + ".";

}


/* Next Question */

nextBtn.addEventListener("click", () => {

    if (!selectedAnswer) {

        statusElement.textContent =
            "⚠️ Please answer the question first.";

        return;
    }

    if (
        selectedAnswer ===
        questions[currentQuestion].answer
    ) {

        score++;
    }

    currentQuestion++;

    if (currentQuestion < questions.length) {

        loadQuestion();

    } else {

        showResult();
    }

});


/* Show Result */

function showResult() {

    document.querySelector(".question-box").style.display =
        "none";

    optionsElement.style.display =
        "none";

    voiceBtn.style.display =
        "none";

    nextBtn.style.display =
        "none";

    document.querySelector(".answer-box").style.display =
        "none";

    statusElement.style.display =
        "none";

    resultElement.classList.remove("hidden");

    scoreElement.textContent =
        score + " / " + questions.length;

    speak(
        "Quiz completed. Your score is " +
        score +
        " out of " +
        questions.length
    );
}


/* Text To Speech */

function speak(text) {

    if ("speechSynthesis" in window) {

        window.speechSynthesis.cancel();

        const speech =
            new SpeechSynthesisUtterance(text);

        speech.lang = "en-IN";

        speech.rate = 1;

        window.speechSynthesis.speak(speech);
    }
}


/* Restart Quiz */

function restartQuiz() {

    currentQuestion = 0;

    score = 0;

    resultElement.classList.add("hidden");

    document.querySelector(".question-box").style.display =
        "block";

    optionsElement.style.display =
        "grid";

    voiceBtn.style.display =
        "inline-block";

    nextBtn.style.display =
        "inline-block";

    document.querySelector(".answer-box").style.display =
        "block";

    statusElement.style.display =
        "block";

    loadQuestion();
}


/* Start */

loadQuestion();
```
