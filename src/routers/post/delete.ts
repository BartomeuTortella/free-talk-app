import { Router } from 'express';
import type { Request, Response, NextFunction } from 'express';
import Post from '../../models/post.js';
import { BadRequestError } from '../../../common/index.js';
import User, { type UserDoc } from '../../models/user.js';

const router = Router();

router.delete('/post/:id', async (req: Request, res: Response, next: NextFunction) => {

    const { id } = req.params;

    if (!id) return next(new BadRequestError("Id is required"));


    try {

        await Post.findOneAndDelete({ _id: id });

    } catch (err) {
        return next(new Error('Post delete failed'));
    }

    const user = await User.findOneAndUpdate({ _id: req.currentUser!.userId }, { $pull: { posts: id } }, { new: true });


    if (!user) return next(new Error());

    res.status(201).send(user);
});

export { router as deletePostRouter };