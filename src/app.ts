import * as dotenv from 'dotenv';
dotenv.config();

import express from "express";
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


export { app };