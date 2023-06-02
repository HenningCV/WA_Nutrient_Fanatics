import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
    console.log(res);

    res.send("This is the recipe-page!")
});

export { router };