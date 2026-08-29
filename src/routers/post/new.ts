import { Router } from 'express';
import type { Request, Response, NextFunction } from 'express';
import Post from '../../models/post.js';
import { BadRequestError } from '../../../common/index.js';
import User from '../../models/user.js';

const router = Router();

router.post('/post', async (req: Request, res: Response, next: NextFunction) => {

    const { title, content } = req.body;

    if (!title || !content) return next(new BadRequestError('Title and content are required'));

    const newPost = Post.build({ title, content });
    await newPost.save();

    await User.findOneAndUpdate({ _id: req.currentUser!.userId }, { $push: { posts: newPost._id } });

    res.status(201).send(newPost);
});

export { router as newPostRouter };