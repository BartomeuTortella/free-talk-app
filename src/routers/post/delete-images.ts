import { Router } from 'express';
import type { Request, Response, NextFunction } from 'express';
import Post from '../../models/post.js';
import { BadRequestError } from '../../../common/index.js';

const router = Router();

router.post('/post/:id/delete-images', async (req: Request, res: Response, next: NextFunction) => {

    const { id } = req.params;
    const { imagesIds } = req.body;

    if (!id) return next(new BadRequestError("Post id is required"));

    const post = await Post.findOneAndUpdate(
        { _id: id },
        {
            $pull:
            {
                images:
                {
                    _id: { $in: imagesIds }
                }
            }
        },
        { new: true }
    );


    res.status(200).send(post);

});


export { router as deleteImagesRouter }