const request = require('request')

const geoCodeAddress = (address) => {
    return new Promise((resolve, reject) => {
        request({
            url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&sensor=true&key=AIzaSyB_WGMGjiitquSYQ5AZVWMrQmjG8i5cWfE`,
            json: true
        }, (error, response, body) => {
            if (error) {
                reject('Unable to connect to Google servers.')
            } else if (body.status === 'ZERO_RESULTS') {
                reject('Unable to find that address.')
            } else if (body.status === 'OK') {
                resolve({
                    address: body.results[0].formatted_address,
                    latitude: body.results[0].geometry.location.lat,
                    longitude: body.results[0].geometry.location.lng
                })
            }
        })
    })
}

geoCodeAddress('48306').then((location) => {
    console.log(JSON.stringify(location, undefined, 2))
}, (errorMessage) => {
    console.log(errorMessage)
})