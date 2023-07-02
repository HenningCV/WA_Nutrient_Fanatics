// General
import cors from "cors";
import express from 'express';
import mongoose from "mongoose";
// Swagger
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
// Router
import { router as recipesRouter } from './routes/recipes.js';


//
// Variables
const app = express();

const port = 20073;
const recipesRoute = '/recipes';

//
// Middleware
app.use(express.json());

app.use(cors({ origin:true }));

//
// DB
await mongoose.connect('mongodb://root:example@ss2023_wa_derfruehundderspaetaufsteher_database:27017/', {dbName: "derfruehundderspaetaufsteher"});

//
// Routes
app.use(recipesRoute, recipesRouter);
// Redirect
app.get('/', (req, res) => res.redirect(recipesRoute));


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
            url: `http://localhost:${port}`,
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
    console.log(`Recipes-API is listening at http://localhost:${port}`)
});