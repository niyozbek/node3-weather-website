const request = require('request')

// Forecast information
const forecast = (latitude, longitude, callback) => {
    // encoding transforms the string into url (f.g. ? => %3F)
    const url = 'http://api.weatherstack.com/current?access_key=' + process.env.WEATHERSTACK_ACCESS_KEY + '&query=' + latitude + ',' + longitude + '&units=m'

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location!', undefined)
        } else {
            const { temperature, feelslike, humidity } = body.current
            const { name, country, region } = body.location
            const description = body.current.weather_descriptions[0]
            callback(undefined, { weather: description + '. It is currently ' + temperature + ' degrees out. It feels like ' + feelslike + ' degrees out. The humidity is ' + humidity + '%.', location: { name, country, region } })
        }
    })
}

module.exports = forecast