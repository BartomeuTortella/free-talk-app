import { Router } from 'express';
import type { Request, Response, NextFunction } from 'express';
import Post from '../../models/post.js';

const router = Router();

router.delete('/post/:id', async (req: Request, res: Response, next: NextFunction) => {

    const { id } = req.params;

    if (!id) {
        const error = new Error('Id is required') as CustomError;
        error.status = 400;
        return next(error);
    }



    try {

        await Post.findOneAndDelete({ _id: id });

    } catch (err) {
        const error = new Error('Post delete failed') as CustomError;
        error.status = 500;
        return next(error);
    }


    res.status(2001).send({ success: true });


});

export { router as deletePostRouter };