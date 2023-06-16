import { Router } from "express";


const router = Router();
const google_api_key = 'AIzaSyCN7ddag0RoJSSQIyQlU71FG95PUepQnYY';

// Variables
let user_ip = "";
let user_latitude = "";
let user_longitude = "";
let distance = "";
let duration = "";


// Get User-IP
router.get("/", async (req, res) => {
    await getUserIP();

    return res.status(200).json({
        user_ip: user_ip
    })
})

// Convert User-IP into Geo-Coordinates
router.get("/coordinates", async (req, res) => {
    await getUserIP();
    await convertIPIntoCoordinates();

    return res.status(200).json({
        user_latitude: user_latitude,
        user_longitude: user_longitude
    })
})

// Convert User-IP into Geo-Coordinates
router.get("/calculate-distance", async (req, res) => {
    //await getUserIP();
    //await convertIPIntoCoordinates();
    await calculateDistance();

    return res.status(200).json({
        user_latitude: user_latitude,
        user_longitude: user_longitude
    })
})


export { router };


async function getUserIP() {
    console.log(`Requesting: https://api.db-ip.com/v2/free/self`);

    await fetch(`https://api.db-ip.com/v2/free/self`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
        }
    })
        .then(response => response.json())
        .then(response => {
            user_ip = response["ipAddress"];
            console.log('UserIP: ' + user_ip);
        })
        .catch(function (err) {
            console.log('Unable to fetch IP - ', err);
        });
}

async function convertIPIntoCoordinates() {
    console.log(`Requesting: https://ipapi.co/${user_ip}/json`);

    await fetch(`https://ipapi.co/${user_ip}/json`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
        }
    })
        .then(response => response.json())
        .then(response => {
            user_latitude = response["latitude"];
            user_longitude = response["longitude"];
            console.log('Lat: '+ user_latitude + ' | Long: ' + user_longitude);
        })
        .catch(function (err) {
            console.log('Unable to fetch coordinates - ', err);
        });
}


async function calculateDistance() {
    // initialize services

    const url = 'https://distance-calculator.p.rapidapi.com/distance/simple?lat_1=47.373535&long_1=8.541109&lat_2=42.335321&long_2=-71.023516&unit=miles&decimal_places=2';
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'X-RapidAPI-Key': 'SIGN-UP-FOR-KEY',
            'X-RapidAPI-Host': 'distance-calculator.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.text();
        console.log(result);
    } catch (error) {
        console.error(error);
    }
}

