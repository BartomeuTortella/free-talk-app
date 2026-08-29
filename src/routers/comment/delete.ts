import { Router } from 'express';
import type { Request, Response, NextFunction } from 'express';
import Post from '../../models/post.js';
import Comment from '../../models/comment.js';

const router = Router();

router.delete('/comment/:postId/:commentId', async (req: Request, res: Response, next: NextFunction) => {

    const { postId, commentId } = req.params;

    if (!postId || !commentId) {
        const error = new Error('Id is required') as CustomError;
        error.status = 400;
        return next(error);
    }



    try {

        await Comment.findOneAndDelete({ _id: commentId });
    } catch (err) {
        const error = new Error('Comment delete failed') as CustomError;
        error.status = 500;
        return next(error);
    }

    await Post.findOneAndUpdate(
        { _id: postId },
        { $pull: { comments: commentId } },
        { new: true }
    )

    res.status(2001).send({ success: true });


});

export { router as deleteCommentRouter };