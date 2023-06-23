// General
import cors from "cors";
import express from 'express';
import mongoose from "mongoose";
// Swagger
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
//Routers
import {router as ingredientRouter} from './routes/ingredientRouter.js'

// Variables
const app = express();

const ingredientRoute = '/ingredients'

const port = 20075

// Middleware
app.use(express.json());

app.use(cors({origin: true}));

// DB
await mongoose.connect('mongodb://root:example@ss2023_wa_derfruehundderspaetaufsteher_database:27017/')

// Routes
app.use(ingredientRoute, ingredientRouter);

app.get("/", (req, res) => res.redirect(ingredientRoute));

//
// Swagger
const options = {
    definition: {
        openapi: "3.0.1",
        info: {
            title: "Express API with Swagger",
            version: "0.1.0",
            description: "This is an ingredient CRUD API application made with Express and documented with Swagger",
        },
    },
    servers: [
        {
            url: 'http://localhost:20075',
            description: 'Development server',
        },
    ],
    apis: ["./src/**/*.js"],
};

const specs = swaggerJsDoc(options);

app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(specs)
);


app.listen(port, () => {
    console.log(`Ingredients app listening at http://localhost:${port}`)
})