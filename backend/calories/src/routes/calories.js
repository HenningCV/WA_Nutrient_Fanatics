import {Router} from "express";

import {searchByName, searchByFdcId} from "../controller/calories.js";


const router = Router();

// Get food-ID
router.get('/search', searchByName);

// Get calories
router.get('/get', searchByFdcId);


export {router};