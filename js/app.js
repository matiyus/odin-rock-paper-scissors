let playerScore = 0;
let computerScore = 0;
let choiceTranslationSymbols = ["Rock","Paper","Scissors"];

let decisionMatrix = [
    [[0,0], [-1,1], [1,-1]],
    [[1,-1],[0,0],[-1,1]],
    [[-1,1],[1,-1],[0,0]]
];


const rockBtn = document.getElementById('rockBtn');
const paperBtn = document.getElementById('paperBtn')
const scissorsBtn = document.getElementById('scissorsBtn')
const nextRoundBtn = document.getElementById('nextRoundBtn')

const outcomeSubtitle = document.querySelector('.outcome-subtitle');
const outcomeTitle = document.querySelector('.outcome-title');
const playerChoice = document.querySelector('.player-choice')
const computerChoice = document.querySelector('.computer-choice')
const computerScoreText = document.querySelector('.computer-score')
const playerScoreText = document.querySelector('.player-score')

const closeModalButton = document.getElementById('close-modal');
const modalContainer = document.getElementById('modalContainer');
const modalText = document.getElementById('modalText')
window.addEventListener('click',function(event){

    if(event.target == modalContainer){
        modalContainer.style.display = 'none';
    }

})

rockBtn.addEventListener('click',() => handleClick(0))
paperBtn.addEventListener('click',() => handleClick(1))
scissorsBtn.addEventListener('click',() => handleClick(2))

closeModalButton.addEventListener('click',()=> {
    modalContainer.style.display = 'none'
    resetData()
})


function isGameOver(){
    if(playerScore == 5 || computerScore == 5){
        return true
    }
}

function resetData(){
    playerScore = 0
    computerScore =0
    outcomeSubtitle.textContent = "First to 5 wins the game"
    outcomeTitle.textContent = "Choose your weapon!"
    playerChoice.textContent = "❔"
    computerChoice.textContent = "❔"
    playerScoreText.textContent = "Player: 0"
    computerScoreText.textContent = "Computer: 0"

}

function openModal(){
    modalContainer.style.display = 'flex';
    if(playerScore > computerScore){
        modalText.textContent = 'You win!'
    } else{
        modalText.textContent = 'You lost..'
    }

}


function handleClick(playerSelection){

    if(isGameOver()){
        openModal()
        return
    }
    playRound(playerSelection,getComputerSelection())
    if(isGameOver()){
        openModal()
        return
    }
    
    
}



function playRound(playerSelection,computerSelection){

    switch(playerSelection){
        case 0:
            playerChoice.textContent = "✊"
            break
        case 1:
            playerChoice.textContent = "✋"
            break
        case 2:
            playerChoice.textContent ="✌️"
            break
    }

    switch(computerSelection){
        case 0:
            computerChoice.textContent = "✊"
            break
        case 1:
            computerChoice.textContent = "✋"
            break
        case 2:
            computerChoice.textContent ="✌️"
            break
    }

    let playerSelection_outcome = decisionMatrix[playerSelection][computerSelection][0];
    let computerSelection_outcome = decisionMatrix[playerSelection][computerSelection][1];

    console.log(choiceTranslationSymbols[playerSelection] + " vs " + choiceTranslationSymbols[computerSelection]);
    console.log(playerSelection_outcome + " : " + computerSelection_outcome)
    if(playerSelection_outcome == computerSelection_outcome){
        console.log("DRAW");
        outcomeSubtitle.textContent = choiceTranslationSymbols[playerSelection] + " ties with " + choiceTranslationSymbols[computerSelection]
        outcomeTitle.textContent = "Draw!"
    }
    else if(playerSelection_outcome < computerSelection_outcome){
        computerScore++;
        outcomeSubtitle.textContent = choiceTranslationSymbols[computerSelection] + " beats " + choiceTranslationSymbols[playerSelection]
        outcomeTitle.textContent = "Computer wins!"
        computerScoreText.textContent = "Computer: " + computerScore 
        console.log("COMPUTER WINS");
    }
    else if (playerSelection_outcome > computerSelection_outcome){
        playerScore++;
        outcomeSubtitle.textContent = choiceTranslationSymbols[playerSelection] + " beats " + choiceTranslationSymbols[computerSelection]
        outcomeTitle.textContent = "You win!"
        playerScoreText.textContent = "Player: " + playerScore
        console.log("YOU WIN");
    }
}   



function playGame(){
    for(let i =0; i<5;i++){
        console.log("ROUND" + " " + (i+1))
        if(playRound(getHumanChoice(),getComputerSelection()) == -1){
            break;
        }
    }
}


function getRandomInt(max){
    return Math.floor(Math.random()*max);
}

function getComputerSelection(){
    let randomInt = getRandomInt(3);
    if(randomInt == 0){
        return 0;
    }
    else if(randomInt == 1){
        return 1;
    }
    else{
        return 2;
    }
}

function getHumanChoice(){
    
    while(true){
        let choice = prompt("Rock Paper Scissors? (Enter rock / paper / scissors):");
        console.log(choice);
        if(choice == null){
            return -1;
        }
        
        if(choice.toLowerCase() == "rock"){
            return 0;
        }
        else if(choice.toLowerCase()=="paper"){
            return 1;
        }
        else if (choice.toLowerCase() == "scissors"){
            return 2;
        } 
        else {
            alert("ERROR: Please input either rock / paper / scissors");
        }

    }
}



