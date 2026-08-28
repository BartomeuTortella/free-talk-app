import * as dotenv from 'dotenv';
dotenv.config();

import express from "express";
import mongoose from 'mongoose';


const app = express();

app.use(express.urlencoded());
app.use(express.json());

const start = () => {
    if (!process.env.MONGO_URI) {
        throw new Error("MONGO_URI is required!");
    }

    try {
        mongoose.connect(process.env.MONGO_URI)
    } catch (err) {
        throw new Error('Database error');
    }

    app.listen(8080, () => console.log('Server is up and running on port 8080'));
}


start();

