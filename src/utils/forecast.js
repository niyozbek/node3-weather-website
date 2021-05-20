const request = require('request')

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
            const { temperature, feelslike, humidity } = body.current
            const description = body.current.weather_descriptions[0]
            callback(undefined, description + '. It is currently ' + temperature + ' degrees out. It feels like ' + feelslike + ' degrees out. The humidity is ' + humidity + '%.')
        }
    })
}

module.exports = forecast