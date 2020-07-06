// ES6 class 
class Question {
    constructor(question, answers, correct){
        this.question = question;
        this.answers = answers;
        this.correct = correct;
    }

displayAnswers(){
        let i = 0
        document.querySelector('.question').innerHTML = `<div class="q1" id=${i}>${this.question}</div>`
        let answers = this.answers
    for(let el of answers){
        let html = `<div class="name" id=${i}>${el}</div>`
        document.querySelector('.answers').insertAdjacentHTML('beforeend', html)
        i++ 
    }
}

displayCorrectandWrongALert(id){
    
    if(id == this.correct) {
        document.querySelector('.correct').style.display = 'flex';
        document.querySelector('.answers').style.display = 'none'
        score++
        
    }else if(id !== this.correct){
        document.querySelector('.wrong').style.display = 'flex';
        document.querySelector('.answers').style.display = 'none'
    }
  }
}

//Question instances and questions array defined in questions.js

let runningQuestion;
let gamePlaying;
let score = 0
let score1;
let score2;


const btn1 = document.querySelector('.button1');

btn1.addEventListener("click", onButtonClick);
function onButtonClick() {

            document.querySelector('.correct').style.display = 'none';
            document.querySelector('.wrong').style.display = 'none';
            document.querySelector('.answers').style.display = 'flex'

        if (gamePlaying === true && runningQuestion < questions.length - 1) {
            runningQuestion++;
            displayQuestion();
        } 
        else{
            renderScores()
        }
            showResetScoresAlert()
}


function displayQuestion() {
            clearAnswers();
            questions[runningQuestion].displayAnswers();

            if(runningQuestion === questions.length - 1){
                btn1.textContent = 'Last Question!';
            }
}    


document.querySelector('.answers').addEventListener('click', possibleAnswers)
function possibleAnswers(e){
     if(e.target && e.target.matches(".name")){
         let item = e.target.id
         let id = parseInt(item)
         questions[runningQuestion].displayCorrectandWrongALert(id) 
    }
         document.querySelector('.count').textContent = score + ' / ' + questions.length
    
     if(runningQuestion >= questions.length - 1){
            btn1.textContent = 'Try Again?';
        }
}


function renderScores() {
    if(document.querySelector('.count2').textContent === '0'){
           score1 = score 
           document.querySelector('.count2').textContent = score1 + ' / ' + questions.length
           resetGame();
   }else if(document.querySelector('.count2').textContent !== '0' ){
           score2 = score
           document.querySelector('.count3').textContent = score2 + ' / ' + questions.length
           highScore()
   }
   
}


function showResetScoresAlert(){
            
     if(document.querySelector('.count2').textContent !== '0' && document.querySelector('.count3').textContent !== '0'){
            document.querySelector('.question').style.display = 'none'
            document.querySelector('.answers').style.display = 'none'
            document.querySelector('.resetScores').style.display = 'flex'
            score = 0
            document.querySelector('.count').textContent = '0'
            document.querySelector('.button2').removeEventListener('click', resetGame)
            btn1.removeEventListener('click', onButtonClick)
            btn1.textContent = 'Next Question';
    }
}


function clearAnswers() {
            document.querySelectorAll('.name').forEach( el => {
            el.remove()
    })
}


document.querySelector('.button3').addEventListener('click', resetAttempts)
function resetAttempts(e) {
            score1 = 0
            score2 = 0
            document.querySelector('.count2').textContent = '0'
            document.querySelector('.count3').textContent = '0'
            document.querySelector('.question').style.display = 'block'
            document.querySelector('.answers').style.display = 'flex'
            document.querySelector('.resetScores').style.display = 'none'
            document.querySelector('.button2').addEventListener('click', resetGame)
            btn1.addEventListener('click', onButtonClick)
            resetGame()
}


document.querySelector('.button2').addEventListener('click', resetGame)
function resetGame() {
            document.querySelector('.resetScores').style.display = 'none'
            document.querySelector('.answers').style.display = 'flex';
            document.querySelector('.question').style.display = 'block'
            btn1.textContent = 'Next Question'
            document.querySelector('.count').textContent = '0'
            score = 0;
            document.querySelector('.wrong').style.display = 'none';
            document.querySelector('.correct').style.display = 'none';
            clearAnswers()

            runningQuestion = 0
            questions[runningQuestion].displayAnswers()
}


document.querySelector('.start').addEventListener('click', start)
function start() {
            document.querySelector('.overlay').style.display = 'none'
            document.querySelector('.count').textContent = score 
            gamePlaying = true
            runningQuestion = 0;
            questions[runningQuestion].displayAnswers()
}


function highScore() {
    if(score1 >= '15' && score2 >= '20'){
        clearAnswers()
        document.querySelector('.wrong').style.display = 'none';
        document.querySelector('.correct').style.display = 'none';
        addOverlay()
    }
}

function addOverlay(){
        document.querySelector('.resetScores').classList.add('x')
}


document.querySelector('.resetScores').addEventListener('click', removeOverlay)
function removeOverlay(e){
    if(e.target.matches('.x')){
        document.querySelector('.resetScores').classList.remove('x')
    }
    
}

