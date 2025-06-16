// scop is basically where you can access the variable, for example where can i access the "b"
// best video "https://youtu.be/uH-tVP8MUs8?si=KXDaolZZY0M2uO1W"
// global context, local exection context


function createCounter() {
    let counter = 0
    return function () {   // We returned the anonymous function, and that function closed over the variable counter, so it retains a reference to it — even though counter is not returned itself.
        counter += 1
        console.log(counter)
    }
}

`
The closure doesn’t copy the value of counter, it retains a reference to it even createCounter is destroyed.

So when counter += 1 is executed:

It updates the same original counter variable from the createCounter's scope
`

const counter = createCounter() // here we get onlyreturned fun
counter() // but that returned fun has remembered its lexical env
counter() // 2
counter() // 3





function fun1() {
    console.log(a)

    function fun2() {
        console.log(a)    // scop chaining
    }

    fun2()
}

let a = 12
fun1()

// btw you can create factory funs with clousers

function createStudent(para) {
    return {
        getName: function () {
            return para.name
        },
        getAge: function () {
            return para.name
        },
    }
}

const student1 = createStudent({ name: "dullat", age: "idk" })

console.log(student1, "\n", student1.getAge())


{
    // security issue
    function createStudent(para) {
        return {
            getName: function () {
                return para.name
            },
            getAge: function () {
                return para.age
            },
        }
    }

    const obj = { name: "dullat", age: "idk" }

    const student1 = createStudent(obj)
    obj.age = 89; // here  <-------------------------------<

    console.log(student1, "\n", student1.getAge())
}

{
    // what you can do?
    function createStudent(para) {
        const privateData = { ...para }; // shallow copy

        return {
            getName: function () {
                return privateData.name;
            },
            getAge: function () {
                return privateData.age;
            },
        };
    }

}



