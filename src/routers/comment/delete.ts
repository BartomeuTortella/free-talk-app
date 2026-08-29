import { Router } from 'express';
import type { Request, Response, NextFunction } from 'express';
import Post from '../../models/post.js';
import Comment from '../../models/comment.js';
import { BadRequestError } from '../../../common/index.js';

const router = Router();

router.delete('/comment/:postId/:commentId', async (req: Request, res: Response, next: NextFunction) => {

    const { postId, commentId } = req.params;

    if (!postId || !commentId) return next(new BadRequestError("PostId and commentId are required"));

    try {

        await Comment.findOneAndDelete({ _id: commentId });
    } catch (err) {
        return next(new Error("Comment cannot be updated"));
    }

    const post = await Post.findOneAndUpdate(
        { _id: postId },
        { $pull: { comments: commentId } },
        { new: true }
    )

    if (!post) return next(new Error());

    res.status(201).send(post);


});

export { router as deleteCommentRouter };