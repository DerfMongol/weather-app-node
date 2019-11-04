const yargs = require('yargs')
const axios = require('axios')

const geocode = require('./geocode/geocode')
const weather = require('./weather/weather')

const argv = yargs
    .options({
        a: {
            demand: true,
            alias: 'address',
            describe: 'Address to fetch weather for',
            string: true
        }
    })
    .help()
    .alias('help', 'h')
    .argv

    const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(argv.address)}&sensor=true&key=AIzaSyB_WGMGjiitquSYQ5AZVWMrQmjG8i5cWfE`
    
    axios.get(geocodeUrl).then((response) => {
        if (response.data.status === 'ZERO_RESULTS') {
            throw new Error('Unable to find that address.')
        }
        let lat = response.data.results[0].geometry.location.lat
        let lng = response.data.results[0].geometry.location.lng
        const weatherUrl = `https://api.darksky.net/forecast/e5d2cd4f8d944f0263e11ddd876960b5/${lat},${lng}`
        console.log(response.data.results[0].formatted_address)
        return axios.get(weatherUrl)
    }).then((response) => {
        const temperature = response.data.currently.temperature
        const apparentTemperature = response.data.currently.apparentTemperature
        console.log(`It's currently ${temperature}. It feels like ${apparentTemperature}.`)
    }).catch((e) => {
        if (e.code === 'ECONNREFUSED') {
            console.log('Unable to connect to API servers.')
        } else {
            console.log(e.message)
        }
        
    })