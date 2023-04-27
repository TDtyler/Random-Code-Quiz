const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text'));

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
    {
        question: "Who was the first team to win the CFP?",
        choice1: "Alabama",
        choice2: "Clemson",
        choice3: "Ohio State",
        choice4: "Georgia",
        answer: 3
    },
    {
        question: "Which General led the Continental Army in the Revolutionary War?",
        choice1: "George Washington",
        choice2: "Francisco Franco",
        choice3: "Napoleon Bonaparte",
        choice4: "Julius Cesar",
        answer: 1
    },
    {
        question: "Which of these beers are made in Pennsylvania?",
        choice1: "Budweiser",
        choice2: "Yuengling",
        choice3: "Heineken",
        choice4: "Shiner Bock",
        answer: 2
    }
]


const Max_Questions = 3;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    console.log(availableQuestions);
    getNewQuestion();
}

getNewQuestion = () => {

    if(availableQuestions.length === 0 || questionCounter >Max_Questions) {
        return window.location.assign("end.html");
    }

    questionCounter++;
    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach(choice => {
        const number = choice.dataset["number"];
        choice.innerText = currentQuestion["choice" + number];
    });

    availableQuestions.splice(questionIndex, 1);
    acceptingAnswers = true;
};

choices.forEach(choice => {
    choice.addEventListener("click", e => {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"];

        const classToApply = 
            selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";
        
        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 1000);
    });
});



startGame();
