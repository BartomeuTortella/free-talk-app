import { Router } from 'express';
import type { Request, Response, NextFunction } from 'express';
import Post from '../../models/post.js';

const router = Router();

router.get('/post/:id', async (req: Request, res: Response, next: NextFunction) => {

    const { id } = req.params;

    let foundPost;

    try {
        foundPost = await Post.find({ _id: id });

    } catch (err) {
        const error = new Error('Post find failed') as CustomError;
        error.status = 500;
        return next(error);
    }


    res.status(200).send(foundPost);
});

export { router as getPostRouter };