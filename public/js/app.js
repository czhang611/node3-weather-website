// console.log('Client side JavaScript is loading');

// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) => {
//         console.log(data);
//     })
// })


const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

// messageOne.textContent = 'From JavaScript';

weatherForm.addEventListener ('submit', (e) => {
    e.preventDefault();
    
    const location = search.value;
    // const url = 'http://localhost:3000/weather?address=' + location;
    const url = '/weather?address=' + location;

    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';

    fetch(url).then((response) => {
        response.json().then((data) => {
            if(data.error) {
                // console.log(data.error);
                messageOne.textContent = data.error;
            } else {
                console.log(data);
                messageOne.textContent = data.location;
                // console.log(data.location);
                // console.log(data.forecast, ', current temperature: ', data.temperature, ', feels like: ', data.feels_like);
                messageTwo.innerHTML = data.forecast + ', current temperature: ' + data.temperature + '°C, feels like: ' + data.feels_like + "°C.<br>";
                messageTwo.innerHTML += data.wind_dir + " wind (" + data.wind_degree + "°) at " + data.wind_speed + " km/hour. Pressure: " + data.pressure + " mbar.<br>";
                messageTwo.innerHTML += "Precipitation: " + data.precipitation + " mm. Humidity: " + data.humidity + "%. <br>";
                messageTwo.innerHTML += "Cloud cover: " + data.cloudcover + "%. Visibility: " + data.visibility + " km."
            }
        })
    })
})