const questionArray = [
    {
        question: 'A complete graph can have',
        options: [
            "n2 spanning trees", 
            "nn - 2 spanning trees", 
            "n spanning trees", 
            "None of the above"
        ],
        answer: '1',
        score: 1
    },
    {
        question: "What is the full form of CSS?",
        options: [
            "Java", 
            "JavaScript", 
            "Both", 
            "None of the above"
        ],
        answer: '3',
        score: 1
    },
    {
        question: 'How to include JavaScript in HTML document?',
        options: [
            "script", 
            "style", 
            "body", 
            "html"
        ],
        answer: '0',
        score: 1
    },
    {
        question: 'How to declare variable in JavaScript?',
        options: [
            "let",
             "var",
            "const", 
            "None of the above"
        ],
        answer: '1',
        score: 1
    },
    {
        question: 'How do you define objects in javascript?',
        options: [
            "()", "{}", "[]", "//"
        ],
        answer: '1',
        score: 1
    },
    {
        question: "What is the value of '2'+2 ?",
        options: [
            "22", "0", "2", "2+2"
        ],
        answer: '0',
        score: 1
    },
    {
        question: "What is the value of '2'-1?",
        options: [
            "21", "12", "1", "2"
        ],
        answer: '2',
        score: 1
    },
    {
        question: "How to check if value is Nan in JavaScript?",
        options: [
            "isNotaNumber(val)", "isNan(val)", "Nan(val)", "None of above"
        ],
        answer: '1',
        score: 1
    },
    {
        question: 'What does <= mean in JavaScript?',
        options: [
            "Arrow Function", "Equation", "Both", "None"
        ],
        answer: '0',
        score: 1
    },
    {
        question: "DOM stands for?",
        options: [
            "Document Overview Model", "Detail Object Mode", "Document Object Model", "Detail Object Model"
        ],
        answer: '2',
        score: 1
    }
];

let quizScore = 0;
const questionDiv = document.getElementById("question");
const optionBox = document.getElementsByClassName("questionBox__optionBox");
const submitBtn = document.getElementById("submit");
const restartBtn = document.getElementById("reset");
const formTag = document.querySelector('form');
const statusDiv = document.getElementById('status');
const resetBtn = document.getElementById("reset");
//const answers=document.querySelector('.ansr');
let qno = 0;

const setResetRadio = (status) => {
    if(status=='set') {
        for (let option of optionBox) {
            option.firstElementChild.setAttribute('disabled', '');
        }
    } else {
        for (let option of optionBox) {
            option.firstElementChild.removeAttribute('disabled');
            formTag.option.value = null;
        }
    }
}

const toggleStatus = (show, val) => {
    if(show) {
        if(val=='correct') {
            statusDiv.innerText = 'Correct';
            statusDiv.classList.toggle('hide');
            statusDiv.classList.add('right');
            statusDiv.classList.remove('wrong');
        } else {
            statusDiv.innerText = 'Incorrect';
            statusDiv.classList.toggle('hide');
            statusDiv.classList.add('wrong');
            statusDiv.classList.remove('right');
        }
    }
    else {
        element.classList.toggle('hide');
    }
}

const toggleSubmit = (bool) => {
    if(bool) {
        submitBtn.innerText = 'Next';
        submitBtn.classList.add('next');
        submitBtn.classList.remove('submit');
    } else {
        submitBtn.innerText = "Submit";
        submitBtn.classList.add('submit');
        submitBtn.classList.remove('next');
    }
}
const checkAnswer = ({ answer, score }, value) => {
    const status = document.getElementById("status");
    setResetRadio('set');
    if(answer==value-1) {
        quizScore += score;
        toggleStatus(true, 'correct');
    } else {
        toggleStatus(true, 'incorrect');
    }
}

const setQuestion = ({ question, options }) => {
    questionDiv.innerText = question;
    for (let i = 0; i < 4; i++) {
        labelDiv = optionBox[i].lastElementChild;
        labelDiv.innerText = options[i];
    }
}

setQuestion(questionArray[qno]);

const nextQuestion = () => {
    ++qno;
    setQuestion(questionArray[qno]);
    setResetRadio('reset');
    toggleSubmit(false);
    toggleStatus(statusDiv, false);
}

const showAnswers = () => {
    const card = document.querySelector('.questionBox');
    card.innerHTML = "<ul>";
    questionArray.forEach((question) => {
        const html = `
        <li>${question.question} <div class="answerLabel">${question.options[question.answer]}</div></li>
        `;
        card.innerHTML += html;
    });
    card.innerHTML += "</ul>";
};

formTag.addEventListener('submit', (e) => {
    e.preventDefault();
    if(!formTag.option.value) alert('Please select a option');
    else if(submitBtn.classList.contains('submit')) {
        checkAnswer(questionArray[qno], formTag.option.value);
        toggleSubmit(true);
        // console.log(quizScore);
        // console.log("q",qno);
    }
    else if(submitBtn.classList.contains('next') && qno < questionArray.length-1) {
        nextQuestion();
        formTag.reset();
    } else if(submitBtn.classList.contains('next')){ 
        showAnswers();
        resetBtn.classList.remove("hide");
        resetBtn.classList.add('restart');
        document.getElementById("header__text").innerText = `Score : ${quizScore}`;
    }
});

resetBtn.addEventListener('click', () => {
    document.location.reload();
});