const request = require('request')

const getWeather = (lat, lng, callback) => {
    request({
        url: `https://api.darksky.net/forecast/e5d2cd4f8d944f0263e11ddd876960b5/${lat},${lng}`,
        json: true
    }, (error, response, body) => {
        if (error) {
            callback('Unable to connect to Forecast.io servers.')
        } else if (response.statusCode === 400) {
            callback('Unable to find that temperature.')
        } else if (response.statusCode === 200) {
            callback(undefined, {
                temperature: body.currently.temperature,
                apparentTemperature: body.currently.apparentTemperature
            })
        }
    })
}

module.exports = {
    getWeather
}