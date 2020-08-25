const request = require('request');

const geocode = (address, callback) => {
    // const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoiY3poYW5nNjExIiwiYSI6ImNrZTc3dzNnejE3Z3cycnBsbG05dWtvaWgifQ.7IaeqsxL2Hn6CviwbE4YqQ&limit=1';
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiY3poYW5nNjExIiwiYSI6ImNrZTc3dzNnejE3Z3cycnBsbG05dWtvaWgifQ.7IaeqsxL2Hn6CviwbE4YqQ&limit=1';

    request({ url, json: true}, (error, {body}) => {
    // request({ url: url, json: true}, (error, response) => {
        if (error) {
            callback('Unable to connect to location services!', undefined);
        } else if (body.features.length === 0) {
        // } else if (response.body.features.length === 0) {
            callback('Unable to find the location. Try another search.', undefined);
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0], 
                location: body.features[0].place_name
                // latitude: response.body.features[0].center[1],
                // longitude: response.body.features[0].center[0], 
                // location: response.body.features[0].place_name
            });
        }
    })
}

module.exports = geocode;
