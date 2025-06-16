const a1 = []
const a2 = new Array(3);
const a3 = Array.from("abc,def,ghijkl")
const a4 = [[1,2],[3,4]]

function logger() {
  let i = 0;
  const interval = setInterval(() => { // here set interval returns id(a number) , its not being assigned to interval const
    if (i < a3.length) {
      process.stdout.write(a3[i]);
      i++;
    } else {
      clearInterval(interval);
    }
  }, 200);
}

logger()

// swapping

let a = 1;
let b = 2;

[a,b] = [b,a];

console.log(a,b)

// rest ...

const [head, ...tail] = [1,2,3,4,5,6,7,8]
console.log(head)

// idk 
const arr1 = [1,2,3,4,5,6,7,8]

console.log(arr1.pop()) // mutating
