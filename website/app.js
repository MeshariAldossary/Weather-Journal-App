/* Global Variables */

const API_KEY="6134317c10db877014543c36d6f4d45d";
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather?";
const COUNTRY_CODE = 'US';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

let generateButton = document.querySelector("#generate");

// add a click event listener to the generate button
generateButton.addEventListener('click', (e) => {
    // revent default form submission
    e.preventDefault();

    // get zip code
    let zipCode = document.querySelector("#zip").value;

    // fetch weather data from openweathermap
    fetchWeatherData(zipCode);
});

// function to retreive weather data from openweather map
const fetchWeatherData = async zipCode =>{
    fetch(BASE_URL + `zip=${zipCode},${COUNTRY_CODE}&appid=${API_KEY}`) // promise
    .then( response => { // executes when weather data is succesfully retreived
        if(response.status == 200){
            return response.json(); // convert data to json
        }else{
            throw new Error(response.statusText); // thow error whenever the request is not successfull
        }
    })
    .then(data => { // resolves after weather data has been reterived, sends the data to our Nope App
        let userResponse = document.querySelector('#feelings').value;
        return submitWeatherDataToAPI({"temp" : data.main.temp, "date": newDate, "userResponse": userResponse });
    })
    .then(response => { // resolves when data has been successfully sent to our Node App
        if(response.status == 200){
            updateUI();
        }

        else{ throw new Error(response.statusText) } // Posting data to Node app was not successfull
    })
    .catch( err =>{
        console.log(err);
    });
}

// function to send user data to our Node App, return Promise
const submitWeatherDataToAPI = async (data) => {    
    return fetch("/project-data", {
        method: "POST",
        headers: new Headers({'content-type': 'application/json'}), 
        body: JSON.stringify(data)
    });
}


// function to update UI
const updateUI = async () => {
    fetch("/project-data")
    .then(response => { // fetch data from Node API
        if(response.status == 200){
           return response.json();
        }else{
            console.log(response.statusText)
        }
        console.log(response);
    }).then(data => { // Update the UI after response is converted to JSON
        document.querySelector("#date").innerHTML = `Date: ${data.date}`;
        document.querySelector("#temp").innerHTML = `Temp: ${data.temp}`;
        document.querySelector("#content").innerHTML = `Content: ${data.userResponse}`;
    })
    .catch(err => {
        console.log(err);
    });
}

