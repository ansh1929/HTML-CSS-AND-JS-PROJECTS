const bubbleArea = document.querySelector(".bubble-container");
const firstBtn = document.querySelector("#first-btn");
const secondBtn = document.querySelector("#second-btn");
const number = document.querySelector("#number");
const score = document.querySelector("#score");
const timer = document.querySelector("#timer");
const gameDescription = document.querySelector(".game-description");
const bubbleWrapper = document.querySelector(".bubble-wrapper");
const gameDiscriptionWrapper = document.querySelector(".game-discription-wrapper")

//TIMER FUNCTION
function gameTimer(){
    let initialTimer = 60;
    let myTimer = setInterval(() => {

        if(initialTimer>0){
            initialTimer = initialTimer-1;
            timer.textContent = initialTimer;
        }
        else{
            clearInterval(myTimer)
            endGame();
        }

    },1000);
};

//RANDOM NUMBER FUNCTION
let randomNumber;
function randomNumberGenerator(){
    randomNumber = Math.floor(Math.random()*10);
    number.textContent = randomNumber;
}


//RANDOM HEX CODE FOR RANDOM COLOR
function randomColorGenerator(){
    let hexCode = "#"
    let colorCodes = "0123456789abcdef"
    for (let index = 0; index < 6; index++) {
        hexCode += colorCodes[Math.floor(Math.random()*16)]
    }
    return hexCode
}


//BUBBLE MAKER FUNCTION
function bubbleMaker() {
    let bubbleContainer = ""
    for (let index = 0; index < 225; index++) {
        const randomNumber = Math.floor(Math.random()*10);
        const code = randomColorGenerator();

        if(code == "#000000"){
            code = "#ffffff";
        }else if(code == "#000000"){
            code ="#ffffff";
            let bubble = `<div class="bubble" style="background-color: ${code}">
                            ${randomNumber} 
                          </div>`;
            bubbleContainer += bubble; 
        }else{
            let bubble = `<div class="bubble" style="background-color: ${code}">
                            ${randomNumber} 
                          </div>`;
            bubbleContainer += bubble;
        }
    }    
    bubbleArea.innerHTML = bubbleContainer;
}



//SCORE INCREMENT LOGIC FUNCTION
let initialScore = 0;
bubbleArea.addEventListener("click",function(e){
    if(e.target.innerText==randomNumber){
        randomNumberGenerator();
        bubbleMaker();
        initialScore = initialScore+10;
        score.textContent = initialScore;
    }
    else{
        alert("You have clicked the wrong value")
    }
})



//START GAME FUNCTION
function startGame(){
    bubbleWrapper.style.display = "block";
    gameDiscriptionWrapper.style.display = "none";
    bubbleMaker();
    gameTimer();
    randomNumberGenerator();
    firstBtn.setAttribute("disabled","disabled");
    secondBtn.setAttribute("disabled","disabled");
}

firstBtn.addEventListener("click",startGame);
secondBtn.addEventListener("click",startGame);

//ENDGAME FUNCTION
function endGame(){
    firstBtn.removeAttribute("disabled");
    secondBtn.removeAttribute("disabled");
    number.textContent = 0;
    score.textContent = 0;
    bubbleWrapper.style.display = "none";
    gameDiscriptionWrapper.style.display = "block";
    gameDescription.innerHTML = `<h1>Your game has finished</h1>
                                 <h3>Your score is ${initialScore}<h3>                             `
}