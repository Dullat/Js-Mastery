console.log("working")

const score = {
    compWins: 0,
    userWins: 0,
    ties: 0,
    reset() {
        Object.keys(this).forEach(key => {
            if (typeof this[key] === 'number') this[key] = 0
            localStorage.removeItem("score")
        }
        )
    }
}

function loadLocalScore(){
    const saved = localStorage.getItem("score")
    if (!saved) {
         console.warn("No localy saved score")
         return 
    }

    try{
        const parsed = JSON.parse(saved)
        if(parsed && typeof parsed === 'object'){
            Object.assign(score, parsed)
        }
    }catch(e){
        console.error("Failed to parse score from local storage", e)
    }
}

const saveScoreLocaly = () => {
    localStorage.setItem("score", JSON.stringify(score))
}

// console.log(updateUI)

window.onload = () => {
    loadLocalScore()
    updateUI()
    console.log(score);
    
}

const updateUI = () => {
    document.querySelector('#comp-score').textContent = score.compWins
    document.querySelector('#player-score').textContent = score.userWins
}

const resetScore = () => {
    score.reset()
    updateUI()
}

function checkResult(value) {
    let moves = ['rock', 'paper', 'scissor']
    let computerMove = moves[Math.floor(Math.random() * 3)]
    let result = ''

    const beats = {
        rock: 'scissor',
        paper: 'rock',
        scissor: 'paper'
    }

    if (computerMove === value) {
        result = 'tie'
        score.ties += 1
    } else if (computerMove === beats[value]) {
        result = 'win'
        score.userWins += 1
    } else {
        result = 'lose'
        score.compWins += 1
    }

    updateUI()

    saveScoreLocaly()


    console.log(result)
}

// ####### shorter code #############
// const checkResult = (value) => {
//   const moves = ['rock', 'paper', 'scissor'];
//   const beats = { rock: 'scissor', paper: 'rock', scissor: 'paper' };
//   const computerMove = moves[Math.floor(Math.random() * 3)];

//   const result =
//     value === computerMove ? 'tie' :
//     beats[value] === computerMove ? 'win' : 'lose';

//   console.log(`Computer chose ${computerMove}, you chose ${value} → You ${result}`);
// };
