const path = require('path');
const express = require('express');
const hbs = require('hbs')
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');


const app = express();
const port = process.env.PORT || 3000;

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Chunfu Zhang'
    });
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Chunfu Zhang'
    });

})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helfful text.',
        title: 'Help document',
        name: 'Chunfu Zhnag'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }

    let address = req.query.address;

    geocode(address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return console.log(error);
        } else {
            forecast(latitude, longitude, (error, data) => {
                if (error) {
                    return console.log(error);
                } else {
                    console.log(data);
                    res.send({
                        location: location,
                        address: address,
                        forecast: data.weather,
                        temperature: data.temperature,
                        feels_like: data.feels_like,
                        wind_speed: data.wind_speed,
                        wind_degree: data.wind_degree,
                        wind_dir: data.wind_dir,
                        pressure: data.pressure,
                        precipitation: data.precipitation,
                        humidity: data.humidity,
                        cloudcover: data.cloudcover,
                        uv_index: data.uvindex,
                        visibility: data.visibility
                    })
                }
            })
        }
        
    })    
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search);
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Chunfu Zhang',
        error: 'Help article not found'
    });
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Chunfu Zhnag',
        error: 'Page not found'
    });
})

app.listen(port, () => {
    console.log('Server is up on port' + port);
})