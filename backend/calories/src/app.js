// General
import cors from "cors";
import express from 'express';
import mongoose from "mongoose";
// Swagger
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
//Routers
import {router as caloriesRouter} from './routes/calories.js';

// Variables
const app = express();

const port = 20074;

const usdaRoute = '/calories'

// Middleware
app.use(express.json());

app.use(cors({origin: true}));

// DB
await mongoose.connect('mongodb://root:example@ss2023_wa_derfruehundderspaetaufsteher_database:27017/', {dbName: "derfruehundderspaetaufsteher"})


//
// Swagger
const options = {
    definition: {
        openapi: "3.0.1",
        info: {
            title: "Express API with Swagger",
            version: "0.1.0",
            description: "This is a simple CRUD API application made with Express and documented with Swagger",
        },
    },
    servers: [
        {
            url: 'http://localhost:20074',
            description: 'Development server',
        },
    ],
    apis: ["./src/**/*.js"],
};

const specs = swaggerJsDoc(options);

// Routes

app.use(usdaRoute, caloriesRouter)
app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(specs)
);


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})