import { Router } from 'express';
import type { Request, Response, NextFunction } from 'express';
import Comment from '../../models/comment.js';
import Post from '../../models/post.js';
import { BadRequestError } from '../../../common/index.js';

const router = Router();

router.post('/comment/:postId', async (req: Request, res: Response, next: NextFunction) => {

    const { userName, content } = req.body;
    const { postId } = req.params;

    if (!postId) return next(new BadRequestError("PostId is required"));


    if (!content) return next(new BadRequestError("Content is required"));

    const newComment = new Comment({ userName: userName ? userName : 'Anonymous', content });

    await newComment.save();

    const updatedPost = await Post.findOneAndUpdate(
        { _id: postId },
        { $push: { comments: newComment } },
        { new: true }
    );

    res.status(201).send(updatedPost);
});

export { router as newCommentRouter };