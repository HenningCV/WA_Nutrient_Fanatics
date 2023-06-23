// General
import cors from "cors";
import express from 'express';
import mongoose from "mongoose";
// Swagger
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
// Routers
import { router as usdaRouter } from './routes/usda_api.js'


// Variables
const app = express();

const port = 3000;

const usdaRoute = '/usda'

// Middleware
app.use(express.json());

app.use(cors({ origin:true }));

// DB
await mongoose.connect('mongodb://root:example@mongo:27017/')

// Routes
app.use(usdaRoute, usdaRouter);