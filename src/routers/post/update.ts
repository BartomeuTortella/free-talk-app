import { Router } from 'express';
import type { Request, Response, NextFunction } from 'express';
import Post from '../../models/post.js';

const router = Router();

router.put('/post/:id', async (req: Request, res: Response, next: NextFunction) => {

    const { id } = req.params;
    const { title, content } = req.body;

    if (!id) {
        const error = new Error('Id is required') as CustomError;
        error.status = 400;
        return next(error);
    }

    if (!title || !content) {
        const error = new Error('Title and content are required') as CustomError;
        error.status = 400;
        return next(error);
    }

    let updatedPost;

    try {

        updatedPost = await Post.findOneAndUpdate({ _id: id }, { $set: { title, content } }, { new: true });

    } catch (err) {
        const error = new Error('Post update failed') as CustomError;
        error.status = 500;
       return next(error);
    }


    res.status(200).send(updatedPost);


});

export { router as updatePostRouter };