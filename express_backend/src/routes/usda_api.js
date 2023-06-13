
import {Router} from "express";

const router = Router();
const api_key = 'Xxb4xFDH9WKXigQ6yxhYdknrwHKW2U1kcSlNhAWJ'

router.get("/search", (req, res) => {
    let food = req.query.food;
    console.log("Query parameter: " + food);
    fetch(`https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${api_key}&query=${food}`)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            console.log("Got fdcID: " + data.foods[0].fdcId);
            res.json(data.foods[0].fdcId);
        })

})

router.get("/get", (req,res)=>{
    let fdc_id = req.query.fdcid;
    console.log("Query Parameter: " + fdc_id);
    fetch(`https://api.nal.usda.gov/fdc/v1/food/${fdc_id}?api_key=${api_key}`)
        .then((response) =>{
            return response.json();
        })
        .then((data)=>{
            console.log("Fetch result: " + data.foodNutrients)
            res.json(data.foodNutrients);
        })

})

export {router}