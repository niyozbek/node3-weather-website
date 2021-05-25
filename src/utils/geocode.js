const request = require('request')

// Location information
const geocode = (address, callback) => {
    // encoding transforms the string into url (f.g. ? => %3F)
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=' + process.env.GEOCODE_ACCESS_TOKEN + '&limit=1'

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to geocoding service!', undefined)
        } else if (body.error) {
            callback('Unable to find location!', undefined)
        } else if (body.features.length == 0) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode