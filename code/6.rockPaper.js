console.log("working")

let compWins = 0;
let userWins = 0;

function checkResult(value){
    let moves = ['rock', 'paper', 'scissor']
    let computerMove = moves[Math.floor(Math.random() * 3)]
    let result = ''

    const beats = {
        rock: 'scissor',
        paper: 'rock',
        scissor: 'paper'
    }

    if(computerMove === value){
        result = 'tie'
    }else if(computerMove === beats[value]){
        result = 'win'
        userWins += 1
        document.querySelector('#user-wins').textContent = userWins
    }else{
        result = 'lose'
        compWins += 1
        document.querySelector('#comp-wins').textContent = compWins
    }


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
