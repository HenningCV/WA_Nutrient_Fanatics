// General
import cors from "cors";
import express, {request, response} from 'express';
import mongoose from "mongoose";
// Swagger
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
// Custom
import { router as homeRouter } from './routes/home.js'
import { router as recipesRouter } from './routes/recipes.js'


// Variables
const app = express();
const port = 3000;

const homeRoute = '/home';
const recipesRoute = '/recipes';


await mongoose.connect('mongodb://root:example@mongo:27017')


app.use(cors({ origin:true }));

app.use(homeRoute, homeRouter);
app.use(recipesRoute, recipesRouter);

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