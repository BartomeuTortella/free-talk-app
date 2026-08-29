import { Router } from 'express';
import type { Request, Response, NextFunction } from 'express';
import Post from '../../models/post.js';

const router = Router();

router.get('/post/:id', async (req: Request, res: Response, next: NextFunction) => {

    const { id } = req.params;

    let foundPost;

    try {

        foundPost = await Post.find({ _id: id }).populate('comments');

    } catch (err) {
        return next(new Error('Post find failed'));
    }


    res.status(201).send(foundPost);
});

export { router as getPostRouter };