const request = require('request')

//
// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)

// Forecast information
const forecast = (latitude, longitude, callback) => {
    // encoding transforms the string into url (f.g. ? => %3F)
    const url = 'http://api.weatherstack.com/current?access_key=f60c5be566c464236f2e9c2e71649bfd&query=' + latitude + ',' + longitude + '&units=m'

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location!', undefined)
        } else {
            const { temperature, feelslike } = body.current
            const description = body.current.weather_descriptions[0]
            callback(undefined, description + '. It is currently ' + temperature + ' degrees out. It feels like ' + feelslike + ' degrees out.')
        }
    })
}

module.exports = forecast