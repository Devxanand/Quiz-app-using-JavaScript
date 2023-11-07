const questions = [
  {
    question:"When did world war 2 start?",
    answers:[
        {text:"1938", correct:true},
        {text:"1942", correct:false},
        {text:"1939", correct:false},
        {text:"1945", correct:false},
    ]
  },
  {
    question:"what is the formula of ethene?",
    answers:[
        {text:"C2H2", correct:false},
        {text:"C2H6", correct:false},
        {text:"C2H4", correct:true},
        {text:"C2H3", correct:false},
    ]
  },
  {
    question:"current is scaler or vactor?",
    answers:[
        {text:"Scaler", correct:true},
        {text:"Vector", correct:false},
        {text:"Both", correct:false},
        {text:"None of These", correct:false},
    ]
  },
  {
    question:"What is name of  16th element of the Periodic-Table?",
    answers:[
        {text:"Chlorine", correct:false},
        {text:"Sulpur", correct:true},
        {text:"Argon", correct:false},
        {text:"Phosphorus", correct:false},
    ]
  }
];

const questionElement = document.getElementById("questions")
const answersBtn = document.getElementById("answersBtn")
const nextBtn = document.querySelector(".next-button")
const prevBtn = document.querySelector(".prev-button")

let currentQuestionIndex=0;
let score = 0;

function QuizStart(){
     currentQuestionIndex = 0;
     score = 0;
     nextBtn.innerHTML= "Next";
     ShowQuestion();

}

function ShowQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.
    question;
   
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answersBtn.appendChild(button);
        if (answer.correct){
          button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    })

}

async function resetState(){
       while(answersBtn.firstChild){
        answersBtn.removeChild(answersBtn.firstChild)
}
}
function selectAnswer(e){
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if(isCorrect){
    selectedBtn.classList.add("correct");
    score++;
  }else{
    selectedBtn.classList.add("incorrect");
  }
  Array.from(answersBtn.children).forEach(button =>{
    if(button.dataset.correct === "true"){
      button.classList.add("correct");
    }
    button.disabled = true;
  });
}

function showScore(){
  resetState();
  questionElement.innerHTML = `You scored ${score} out of ${questions.length}`;
  nextBtn.innerHTML = "play Again";
  nextBtn.style.display = "block";
}

function handleNextButton(){
  currentQuestionIndex++;
  if(currentQuestionIndex < questions.length){
    ShowQuestion();
  }else{
    showScore();
  }
}


nextBtn.addEventListener("click", ()=>{
  if(currentQuestionIndex < questions.length){
    handleNextButton();
  }else{
    QuizStart();
  }
})

QuizStart()