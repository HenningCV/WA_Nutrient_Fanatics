// General
import cors from "cors";
import express from 'express';
import mongoose from "mongoose";
// Swagger
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
// Routers
import { router as homeRouter } from './routes/home.js'
import { router as ipRouter } from './routes/ip_api.js'
import { router as recipesRouter } from '../recipes/src/routes/recipes.js'
import { router as usdaRouter } from './routes/usda_api.js'


// Variables
const app = express();

const port = 3000;
const homeRoute = '/home';
const recipesRoute = '/recipes';
const usdaRoute = '/usda'
const ipRoute = '/ip';

// Middleware
app.use(express.json());

app.use(cors({ origin:true }));

// DB
await mongoose.connect('mongodb://root:example@mongo:27017/')

// Routes
app.use(homeRoute, homeRouter);
app.use(recipesRoute, recipesRouter);
app.use(usdaRoute, usdaRouter);
app.use(ipRoute, ipRouter);
// Redirect
app.get('/', (req, res) => res.redirect(homeRoute));


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
            url: 'http://localhost:3000',
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
    console.log(`Example app listening at http://localhost:${port}`)
})