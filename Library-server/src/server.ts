import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import { config } from './config';
import mongoose from 'mongoose';
import { registerRoutes } from './Routes';

const PORT = config.server.port;

const app: Express = express();

app.use(express.json());
app.use(cors());

(async function startup() {
    try {
        await mongoose.connect(config.mongo.url);
        console.log("Connected to the database successfully");
        registerRoutes(app);
    } catch (error) {
        console.log("Could not make a connection to the database");
        console.error(error);
    }
})();

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
