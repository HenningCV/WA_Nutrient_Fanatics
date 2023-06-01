import express from 'express';


import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

import cors from "cors";

const app = express();

app.use(cors({ origin:true }));

import {router as greetingsRouter} from './routes/greeting.js'

const port = 3000;

app.use("/greetings", greetingsRouter);

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