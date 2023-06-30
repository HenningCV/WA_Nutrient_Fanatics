// General
import cors from "cors";
import express from 'express';
// Swagger
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
// Router
import { router as ip_apiRouter } from './routes/ip_api.js';


//
// Variables
const app = express();

const port = 20077;
const ip_apiRoute = '/ip';

//
// Middleware
app.use(express.json());

app.use(cors({ origin:true }));


//
// Routes
app.use(ip_apiRoute, ip_apiRouter);
// Redirect
app.get('/', (req, res) => res.redirect(ip_apiRouter));


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
    console.log(`IP-API is listening at http://localhost:${port}`)
});