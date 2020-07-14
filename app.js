// ES6 class 
class Question {
    constructor(question, num,  answers, correct){
        this.question = question;
        this.answers = answers;
        this.correct = correct;
        this.num = num
    }

displayQandA(){
        let i = 0
        document.querySelector('.question').innerHTML = `<div class='q1' id=${this.num}>${this.num}. ${this.question}</div>`;
        let answers = this.answers
    for(let el of answers){
        let html = `<div class="name" id=${i}>${el}</div>`
        document.querySelector('.answers').insertAdjacentHTML('beforeend', html)
        i++ 
    }
}

displayCorrectOrWrongALert(id){
    
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

//Variables
let runningQuestion;
let gamePlaying;
let score = 0
let score1;
let score2;


document.querySelector('.start').addEventListener('click', start)
function start() {
    
            document.querySelector('.overlay').style.display = 'none'
            document.querySelector('.container').style.display = 'flex'
            document.querySelector('.count').textContent = score 
            
            gamePlaying = true
            runningQuestion = 0;
            questions[runningQuestion].displayQandA()
            
            document.querySelector('.header2').style.display = 'flex'

            gsapAnimation()
            
            setTimeout( ()=> {
                document.querySelector('.header2').style.display = 'none'
            }, 10000)
            
}


//GSAP animation, sliding and rotating elements.

function gsapAnimation() {
    /*
const timeline = gsap.timeline({defaults: {duration: .5, opacity: 0, rotation: 90}})
    timeline
         .from('.Q',  {  x: -500})
         .from('.U',  {  x:  500})
         .from('.I',  {  x: -500})
         .from('.Z',  {  x:  500})
    */
     gsap.from('.header2',  {duration: 2, y: '-100vh'});
     gsap.to('.header2', {duration: 2, delay: 5, autoAlpha: 1, autoAlpha: 0})
     
}


//Next question, last question and try again button
const btn1 = document.querySelector('.button1');
btn1.addEventListener("click", onButtonClick);
function onButtonClick() {
            
            document.querySelector('.correct').style.display = 'none';
            document.querySelector('.wrong').style.display = 'none';
            document.querySelector('.answers').style.display = 'flex'

        if (gamePlaying === true && runningQuestion < questions.length - 1) {
            runningQuestion++;
            displayQuestionAndAnswers();
        }
        else if(btn1.textContent === 'Last Question!') {
            btn1.textContent = 'Try Again?'
        } 
        else{
            renderScores()
        }
            showResetScoresAlert()
}


//Displays the question and the answers
function displayQuestionAndAnswers() {
            clearAnswers();
            questions[runningQuestion].displayQandA();
            if(runningQuestion === questions.length - 1){
                btn1.textContent = 'Last Question!';
            }
    
}    



//Click right answer and update score
document.querySelector('.answers').addEventListener('click', possibleAnswers)
function possibleAnswers(e){
    
     if(e.target && e.target.matches(".name")){
          let item = e.target.id
          id = parseInt(item)
          questions[runningQuestion].displayCorrectOrWrongALert(id) 
    }
          document.querySelector('.count').textContent = score + ' / ' + questions.length
    
     if(runningQuestion >= questions.length - 1){
            btn1.textContent = 'Try Again?';
        }
}

//Display score first attempt and second attempt
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

//Overlay Resety Scores, resets whole game to initial state
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
            questions[runningQuestion].displayQandA()
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



/*
/////// Alternative solution //////////////////////////////////////////////

document.querySelector('.button1').addEventListener('click', nextQuestion)
function nextQuestion(e) {
    if(gamePlaying === true && runningQuestion <= questions.length - 1){
        clearAnswers()
        document.querySelector('.button1').textContent = 'Next Question'
        runningQuestion++
        questions[runningQuestion].displayAnswers()
    }
    if(runningQuestion >= questions.length - 1){
        document.querySelector('.button1').textContent = 'Try again!'
        runningQuestion = - 1
    }
}

////// Stackoverflow help //////////////////////////////////////////////////

const btn1 = document.querySelector('.button1')

btn1.addEventListener("click", onButtonClick);

function isLastQuestion() { return runningQuestion >= questions.length - 1; }

function onButtonClick() {
  if (gamePlaying === true && !isLastQuestion()) {
    runningQuestion++;
    displayQuestion();
  } else {
    resetGame();
  }
}

function displayQuestion() {
    clearAnswers();
    btn1.textContent = isLastQuestion() ? 'Try again' : 'Next Question';
    questions[runningQuestion].displayAnswers();
}
*/