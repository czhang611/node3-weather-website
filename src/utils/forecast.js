const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=6fe17a32677abdaaa2243c25e3711a1c&query='  + latitude + ',' + longitude + '&units=f';
    request({ url, json: true}, (error, {body}) => {
    // request({ url: url, json: true}, (error, response) => {
        if (error) {
            callback('Unable to connect to weather forecast services!', undefined);
        } else if (body.request.results === 0) {
            callback('Unable to find the location. Try another search.', undefined);
            // callback('Unable to find the location. Try another search.', undefined);
        } else {
            callback(undefined, {
                location: body.request.query,
                weather: body.current.weather_descriptions[0],
                temperature: body.current.temperature, 
                feels_like: body.current.feelslike
                // location: response.body.request.query,
                // weather: response.body.current.weather_descriptions[0],
                // temperature: response.body.current.temperature, 
                // feels_like: response.body.current.feelslike
            });
        }
    })
}

// const forecast = (address, callback) => {
//     const url = 'http://api.weatherstack.com/current?access_key=6fe17a32677abdaaa2243c25e3711a1c&query='  + encodeURIComponent(address) + '&units=f';
//     request({ url: url, json: true}, (error, response) => {
//         if (error) {
//             callback('Unable to connect to weather forecast services!', undefined);
//         } else if (response.body.request.results === 0) {
//             callback('Unable to find the location. Try another search.', undefined);
//         } else {
//             callback(undefined, {
//                 location: response.body.request.query,
//                 weather: response.body.current.weather_descriptions[0],
//                 temperature: response.body.current.temperature, 
//                 feels_like: response.body.current.feelslike
//             });
//         }
//     })
// }

module.exports = forecast;