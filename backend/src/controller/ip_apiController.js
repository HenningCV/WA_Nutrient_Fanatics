
const api_key = '38785147a4msha98e770b4549d36p152685jsne7396351e0a5';

// Variables
let user_ip = '';
let user_latitude = '';
let user_longitude = '';
let destination_latitude = '50.97780304758311';
let destination_longitude = '11.037050604755112';
let distance = '';


/**
 * @swagger
 * /ip:
 *   get:
 *     summary: Returns user-IP
 *     description: Returns the IP of the current user
 *     responses:
 *       '200':
 *         description: The user IP
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: 93.230.152.51
 */
// Get User-IP
export const getUserIP = async (req, res) => {

    console.log('Requesting: https://api.db-ip.com/v2/free/self');

    await fetch('https://api.db-ip.com/v2/free/self', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
        }
    })
        .then(response => response.json())
        .then(response => {
            user_ip = response['ipAddress'];
            console.log('UserIP: ' + user_ip);

            return res.status(200).json(user_ip);
        })
        .catch(error => {
            console.log('Error fetching user-IP: ', error);
        });
};


/**
 * @swagger
 * /ip/coordinates:
 *   get:
 *     summary: Converts user-IP into geo-coordinates
 *     description: Gets the current user-IP and converts it into latitude and longitude-coordinates
 *     responses:
 *       '200':
 *         description: Converted coordinate-object
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user_latitude:
 *                   type: string
 *                   example: 50.9937
 *                 user_longitude:
 *                   type: string
 *                   example: 11.0211
 */
// Convert User-IP into Geo-Coordinates
export const convertIPIntoCoordinates = async (req, res) => {

    await getUserIP();

    console.log(`Requesting: https://ipapi.co/${user_ip}/json`);

    await fetch(`https://ipapi.co/${user_ip}/json`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
        }
    })
        .then(response => response.json())
        .then(response => {
            user_latitude  = response['latitude'];
            user_longitude = response['longitude'];
            console.log('Lat: '+ user_latitude + ' | Long: ' + user_longitude);

            return res.status(200).json({
                user_latitude: user_latitude,
                user_longitude: user_longitude
            });
        })
        .catch(error => {
            console.log('Error fetching coordinates: ', error);
        });
}


/**
 * @swagger
 * /ip/calculate-distance:
 *   get:
 *     summary: Get the distance between your position and the closest supermarket
 *     description: Gets the current user-ip, converts them into geo-coordinates and calculates the distance to the next supermarket
 *     responses:
 *       '200':
 *         description: Distance to the next supermarket
 *         content:
 *           text/plain:
 *             schema:
 *               type: float
 *               example: 2.09
 */
// Convert User-IP into Geo-Coordinates
export const calculateDistance = async (req, res) => {

    await getUserIP();
    await convertIPIntoCoordinates();

    console.log(`Requesting: https://distance-calculator.p.rapidapi.com/distance/simple?lat_1=${user_latitude}&long_1=${user_longitude}&lat_2=${destination_latitude}&long_2=${destination_longitude}&unit=kilometers&decimal_places=2`);

    // https://rapidapi.com/ApiOcean/api/distance-calculator/
    const url = `https://distance-calculator.p.rapidapi.com/distance/simple?lat_1=${user_latitude}&long_1=${user_longitude}&lat_2=${destination_latitude}&long_2=${destination_longitude}&unit=kilometers&decimal_places=2`;
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'X-RapidAPI-Key': api_key,
            'X-RapidAPI-Host': 'distance-calculator.p.rapidapi.com'
        }
    };

    await fetch(url, options)
        .then(response => response.json())
        .then(response => {
            distance = response['distance'];
            console.log('Distance: ' + distance + 'km');

            return res.status(200).json(distance);
        })
        .catch(error => {
            console.log('Error fetching distance: ', error);
        });
}