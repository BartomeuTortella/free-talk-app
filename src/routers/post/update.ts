import { Router } from 'express';
import type { Request, Response, NextFunction } from 'express';
import Post from '../../models/post.js';
import { BadRequestError } from '../../../common/index.js';

const router = Router();

router.put('/post/:id', async (req: Request, res: Response, next: NextFunction) => {

    const { id } = req.params;
    const { title, content } = req.body;

    if (!id) return next(new BadRequestError("Id is required"));

    if (!title || !content) return next(new BadRequestError('Title and content are required'));

    let updatedPost;

    try {

        updatedPost = await Post.findOneAndUpdate({ _id: id }, { $set: { title, content } }, { new: true });

    } catch (err) {
        return next(new Error('Post update failed'));
    }


    res.status(200).send(updatedPost);


});

export { router as updatePostRouter };