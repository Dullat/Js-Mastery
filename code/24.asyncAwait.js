function getData() {
    return new Promise((resolve, reject) => {
        let boo = false
        setTimeout(() => {
            boo ? resolve("success") : reject("Error : hahaha")
        }, 1000)
    })
}

// getData().then(data => {
//     console.log(data)
// })

async function loadData() {
    const res = await getData() // await pauses the execution of the async function until the Promise is resolved (or rejected, if you handle errors)
        .then(res => {
            console.log(res)
        })
        .catch(err => {
            console.log(err);
        })

    console.log(res) // issue , if error it will still run and log undefined, and you cant really use it
}

loadData()

// with fetch

async function getWeather() {
    try {
        const res = await fetch('https://api.weather.gov/gridpoints/OKX/35,35/forecast?units=us')
        if (!res.ok) {
            if (res.status === 404) {
                throw new Error(`Server could not find the requested resource: ${res.status} Valid domain, bad endpoint: Resource not found`)
            } else if (res.status === 500) {
                throw new Error(`${res.status}, Valid domain, server Crash: internal error`);

            }
        }
        const data = await res.json()
        const todayForecast = data.properties.periods.find(p => p.name == 'Today')

        if (!todayForecast) {
            console.warn(`'Today' forecast not found`)
            return;
        } else {
            console.log(todayForecast);

        }
    } catch (error) {
        console.log(error)
    }
}

const p = getWeather()
console.log(p);  // each async fun return a promis even if you dont return promise from inside or use await


// async awit are used together but there are some cases, you shoud check MDN documentation

// tut https://youtu.be/spvYqO_Kp9Q?list=PL1PqvM2UQiMoGNTaxFMSK2cih633lpFKP&t=823

import weatherData from './24.1.await.js'

console.log(weatherData.status, 'imported data')

console.log('end')