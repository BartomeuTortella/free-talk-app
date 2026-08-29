import { Router } from 'express';
import type { Request, Response, NextFunction } from 'express';
import Post from '../../models/post.js';
import { BadRequestError } from '../../../common/index.js';

const router = Router();

router.delete('/post/:id', async (req: Request, res: Response, next: NextFunction) => {

    const { id } = req.params;

    if (!id) return next(new BadRequestError("Id is required"));


    try {

        await Post.findOneAndDelete({ _id: id });

    } catch (err) {
        return next(new Error('Post delete failed'));
    }


    res.status(201).send({ success: true });


});

export { router as deletePostRouter };