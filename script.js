let userSeq = [];
let gameSeq = [];

let started = false;
let level = 0;
let highestScore = 0;

let btns = ["yellow", "red", "blue", "green"];
let h2 = document.querySelector("h2");

document.addEventListener("keypress",function(){
  if(started == false){
  started = true;

  levelUp();
 }
});

function gameFlash(btn){
  btn.classList.add("flash");
  setTimeout(function(){
    btn.classList.remove("flash");
  },150);
}

function userFlash(btn){
  btn.classList.add("userflash");
  setTimeout(function(){
    btn.classList.remove("userflash");
  },150); 
}

function levelUp(){
  userSeq = [];
  level++;
  h2.innerText = `level ${level}`;

  let randIdx = Math.floor(Math.random()*4);
  let randColor = btns[randIdx];
  let randBtn = document.querySelector(`.${randColor}`);
  gameSeq.push(randColor);
  gameFlash(randBtn);
} 

function checkAns(idx){
  if(userSeq[idx] === gameSeq[idx]){
    if (userSeq.length == gameSeq.length) {
      if (level > highestScore) {
        highestScore = level; // Update highest score if needed
    }
    userSeq = [];
    setTimeout(levelUp, 1000); // Delay before moving to the next level
}
    }
  else{
    h2.innerText =  `Game Over!Your score is ${level} Press any key to play Again`;
    document.querySelector("body").style.backgroundColor = "red";
    setTimeout(function () {
      document.querySelector("body").style.backgroundColor = "white";
    }, 150);
    updateHighestScore();
    reset();
  }
  }

function btnPress(){
  let btn = this;
  userFlash(btn);
  let userColor = btn.getAttribute("id");
  userSeq.push(userColor);
  checkAns(userSeq.length - 1);
}

let allBtns = document.querySelectorAll('.btn');
for(btn of allBtns){
  btn.addEventListener("click",btnPress);
}

function updateHighestScore() {
  let highestScoreDisplay = document.getElementById('highest-score');
  highestScoreDisplay.textContent = `Highest Score: ${highestScore}`;
}
function reset() {
  started = false;
  gameSeq = [];
  userSeq = [];
  level = 0;
}