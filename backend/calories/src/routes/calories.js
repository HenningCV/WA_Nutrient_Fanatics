import {Router} from "express";

import {searchByName, searchByFdcId} from "../controller/calories.js";


const router = Router();

// Get food-ID
router.get('/search', searchByName);

// Get calories
router.get('/get', searchByFdcId);

router.get('/', (req, res) =>{
    res.send('This path does not provide any content, use the 27004/api-docs path to find valid routes')
})


export {router};