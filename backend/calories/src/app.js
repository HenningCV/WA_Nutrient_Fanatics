// General
import cors from "cors";
import express from 'express';
// Swagger
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
//Routers
import {router as caloriesRouter} from './routes/caloriesRouter.js';

// Variables
const app = express();

const port = 20074;

const calorieRoute = '/calories'

// Middleware
app.use(express.json());

app.use(cors({origin: true}));

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

app.use(calorieRoute, caloriesRouter)
app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(specs)
);


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})