const lookUpValue = document.querySelector("#lookup-value");
const checkBtn = document.querySelector("#check-btn");
const guesses = document.querySelector(".guesses");
const displayMsg = document.querySelector(".display-msg");
const startBtn = document.querySelector("#start-btn");
let chances = document.querySelector("#chances");
const randomNumber = Math.floor(Math.random() * 51);
console.log(randomNumber);


checkBtn.addEventListener("click", function () {
    valueConerter(lookUpValue.value);
});



//FUNCTION THAT DECREASE THE CHANCES
let numberOfChances = 10;
function chanceDecreaser() {
    if (numberOfChances == 1){
        numberOfChances = numberOfChances - 1
        chances.textContent = numberOfChances;
        valueConerter(lookUpValue.value);
        gameEnd();
    } else {
        numberOfChances = numberOfChances - 1
        chances.textContent = numberOfChances;
        displayMsg.style.display = "block";
        guesses.style.display = "block";
    }
}


//FUNCTION THAT CONVERT THE USER VALUE INTO NUMBER
function valueConerter(guess) {
    if (isNaN(guess)) {
        alert("Not a valid number");
    }else if(guess ==""){
        alert("Please write a number")
    }
     else {
        let number = Number(guess);
        lookUpValue.value = "";
        lookUpValue.focus();
        chanceDecreaser();
        checkNumber(number);
    }
}


//FUNCTION THAT GENERATE RANDOM COLOR CODE

function randomColorGenerator(){
    let code = "#";
    let codeValues = "0123456789ABCDEF";

    for (let key = 0; key < 6; key++) {
        let randomNumber = Math.floor(Math.random()*16);        
        let randomChar = codeValues[randomNumber];
        code += randomChar;
    }

    return code;
}


//FUNCTION THAT CHECKS THE USER VALUE
function checkNumber(number) {
let hexCode = randomColorGenerator(); 
    if (randomNumber > number && randomNumber - number < 10) {
        displayMsg.textContent = `you are very close`;
        guesses.innerHTML += `<span id="previous-guess" style="color:${hexCode}">${number}, </span>`
    } else if (randomNumber > number) {
        displayMsg.textContent = `you are very far from the number`;
        guesses.innerHTML += `<span id="previous-guess" style="color:${hexCode}">${number}, </span>`
    } else if (randomNumber === number) {
        displayMsg.textContent = `Great you gussed it right`;
        confettiAnimation();
        guesses.innerHTML += `<span id="previous-guess" style="color:${hexCode}">${number}, </span>`
        startBtn.style.display = "block";
    } else if (randomNumber < number && number - randomNumber < 10) {
        displayMsg.textContent = `you are very close`
        guesses.innerHTML += `<span id="previous-guess" style="color:${hexCode}">${number}, </span>`
    } else {
        displayMsg.textContent = `you are very far from the number`;
        guesses.innerHTML += `<span id="previous-guess" style="color:${hexCode}">${number}, </span>`
    }
}


//FUNCTION THAT ENDS THE GAME
function gameEnd() {
    displayMsg.innerHTML = `<p id="endgame-msg">You have 0 chances left please restart the game
                             by clickig the below button</p>
                             <h6>Random number was ${randomNumber}</h6>`
    lookUpValue.setAttribute("disabled", "disabled");
    lookUpValue.value = "";
    lookUpValue.style.backgroundColor = "gray";
    lookUpValue.style.opacity = "0.4";
    startBtn.style.display = "block";
}


//FUNCTION THAT CREATES THE CONFETTI EFFECT
function confettiAnimation(){
    confetti({
        particleCount:1000,
        spread:150,
        origin:{y:1}
    })
}


startBtn.addEventListener("click", function () {
    location.reload();
});

