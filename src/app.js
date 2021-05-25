const path = require('path')
const express = require('express')
const hbs = require('hbs')

const app = express()
const port = process.env.PORT

// Define paths for Express config
const publicDirectory = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')

// The custom directors for viewsPath instead of views
app.set('views', viewsPath)

hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectory))

const creator = 'Niyozbek Obidov'

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: creator
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About page',
        name: creator
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text',
        title: 'Help page',
        name: creator
    })
})

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }
    const address = req.query.address

    geocode(address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }
            res.send({
                forecast: forecastData.weather,
                location,
                address
            })
        })
    })
})

app.get('/weather-current', (req, res) => {
    if (!req.query.longitude || !req.query.latitude) {
        return res.send({
            error: 'You must provide latitude and longitude'
        })
    }
    const { latitude, longitude } = req.query

    forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
            return res.send({ error })
        }
        res.send({
            forecast: forecastData.weather,
            location: forecastData.location.name + ', ' + forecastData.location.region + ', ' + forecastData.location.country,
            address: forecastData.location.name + ', ' + forecastData.location.region + ', ' + forecastData.location.country
        })
    })
})



app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Help article not found!',
        name: creator
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Page not found!',
        name: creator
    })
})



app.listen(port, () => {
    console.log('Server is up on port ' + port)
})