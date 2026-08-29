import { Router } from 'express';
import type { Request, Response, NextFunction } from 'express';
import Post from '../../models/post.js';
import { BadRequestError } from '../../../common/index.js';

const router = Router();

router.post('/post', async (req: Request, res: Response, next: NextFunction) => {

    const { title, content } = req.body;

    if (!title || !content) return next(new BadRequestError('Title and content are required'));

    const newPost = new Post({ title, content });

    await newPost.save();

    res.status(201).send(newPost);
});

export { router as newPostRouter };