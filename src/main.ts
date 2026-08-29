import * as dotenv from 'dotenv';
dotenv.config();

import express from "express";
import mongoose from 'mongoose';
import type { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import cookieSession from 'cookie-session';

import {
    newPostRouter,
    deletePostRouter,
    updatePostRouter,
    getPostRouter,
    newCommentRouter,
    deleteCommentRouter,
    signinRouter,
    signupRouter,
    currentUserRouter,
    signoutRouter,
    deleteImagesRouter,
    addImageRouter
} from './routers/index.js';

import { currentUser, errorHandler, NotFoundError, requireAuth } from '../common/index.js';

const app = express();

app.use(
    cors(
        {
            origin: "*",
            optionsSuccessStatus: 200
        }
    )
);

app.set('trust proxy', true)

app.use(express.urlencoded());
app.use(express.json());

app.use(cookieSession({
    signed: false,
    secure: false
}));

app.use(currentUser);

app.use(signinRouter);
app.use(signupRouter);
app.use(currentUserRouter);
app.use(signoutRouter);

app.use(requireAuth, newPostRouter);
app.use(requireAuth, deletePostRouter);
app.use(requireAuth, updatePostRouter);
app.use(requireAuth, addImageRouter);
app.use(requireAuth, deleteImagesRouter);

app.use(getPostRouter);

app.use(requireAuth, newCommentRouter);
app.use(requireAuth, deleteCommentRouter);

app.all('/{*splat}', (req: Request, res: Response, next: NextFunction) => {
    next(new NotFoundError());
});

app.use(errorHandler);

const start = () => {
    if (!process.env.MONGO_URI) {
        throw new Error("MONGO_URI is required!");
    }
    if (!process.env.JWT_KEY) {
        throw new Error("JWT_KEY is required!");
    }

    try {
        mongoose.connect(process.env.MONGO_URI)
    } catch (err) {
        throw new Error('Database error');
    }

    app.listen(8080, () => console.log('Server is up and running on port 8080'));
}


start();

