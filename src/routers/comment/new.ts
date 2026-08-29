import { Router } from 'express';
import type { Request, Response, NextFunction } from 'express';
import Comment from '../../models/comment.js';
import Post from '../../models/post.js';

const router = Router();

router.post('/comment/:postId', async (req: Request, res: Response, next: NextFunction) => {

    const { userName, content } = req.body;
    const { postId } = req.params;

    if (!postId) {
        const error = new Error('Post id is required') as CustomError;
        error.status = 400;
        return next(error);
    }

    if (!content) {
        const error = new Error('Content is required') as CustomError;
        error.status = 400;
        return next(error);
    }

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