import {Router} from "express";

import {searchByName, searchByFdcId} from "../controller/caloriesController.js";


const router = Router();

// Get food-ID
router.get('/search/:name', searchByName);

// Get calories
router.get('/get/:fdcid', searchByFdcId);

router.get('/', (req, res) =>{
    res.send('This path does not provide any content, use the 27004/api-docs path to find valid routes')
})


export {router};