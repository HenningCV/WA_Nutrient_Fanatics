import { Router } from "express";

import { getUserIP, convertIPIntoCoordinates, calculateDistance } from "../controller/ip_apiController.js";


const router = Router();

// Get User-IP
router.get('/', getUserIP);

// Convert User-IP into Geo-Coordinates
router.get('/coordinates', convertIPIntoCoordinates);

// Convert User-IP into Geo-Coordinates
router.get('/calculate-distance', calculateDistance);


export { router };