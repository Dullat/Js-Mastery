// https://davidwalsh.name/promises


// there is always two things 1 promis make and 2 promise reciver
// 1 promis Maker can be fun that returns a promis and 2 can be anything

// 1 Promise maker / async logic
// phases of promis
// * Pending state
// * resolved
// * rejcted
function getWeather(weather) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('Sunny')
        }, 2000)
    })
}

function getWeatherIcon(weather) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            switch (weather) {
                case 'Sunny':
                    resolve('☀️')
                    break
                case 'Rainy':
                    resolve('🌧️')
                    break
                case 'Cloudy':
                    resolve('☁️')
                    break
                default:
                    reject('NO icon found')
            }
        }, 1000)
    })
}



// 2 Reciver

let promise = getWeather()
promise.then(getWeatherIcon)  // then can take two arguments , here first fun is called when resolved and 2nd when rejcted
    .then(onSuccess, onError)
    .then(() => { console.log('Everything executed successfully') })


function onSuccess(data) {
    console.log(`Sucess: ${data}`)
}

function onError(err) {
    console.log(`Failed: ${err}`)
}


// catch and finnaly

class CatchFinally {
    constructor() {
        this.promis;
    }

    getData() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // resolve('dullat')
                reject("error occured at generating data")
            }, 1000)
        })
    }

    processData(data) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(`processed: ${data}`)
                // reject("error occured at processing data")
            }, 1000)
        })
    }
}

let p2 = new CatchFinally()
p2.getData()
    .then(p2.processData)
    .then(data => {
        console.log(data)
    })
    .catch(error =>{
        console.log(error)
    })
    .finally(() => {
        p2 = null
        console.log(p2)
    })