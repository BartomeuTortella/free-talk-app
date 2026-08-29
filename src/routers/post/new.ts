import { Router } from 'express';
import type { Request, Response, NextFunction } from 'express';
import Post from '../../models/post.js';
import { BadRequestError, uploadImages } from '../../../common/index.js';
import User from '../../models/user.js';
import fs from 'fs';
import path from 'path';

const router = Router();

router.post('/post', uploadImages, async (req: Request, res: Response, next: NextFunction) => {

    const { title, content } = req.body;

    if (!req.files) return next(new BadRequestError("Images are required"));
    if (!title || !content) return next(new BadRequestError('Title and content are required'));

    let images: Array<Express.Multer.File>;

    if (typeof req.files === 'object') {
        images = Object.values(req.files)
    } else {
        images = req.files ? [...req.files] : []
    }


    const newPost = Post.build({
        title,
        content,
        images: images.map((file: Express.Multer.File) => {
            let srcObj = { src: `data:${file.mimetype};base64,${fs.readFileSync(path.join('uploads/' + file.filename)).toBase64()}` };
            fs.unlink(path.join('uploads/' + file.filename), () => { });
            return srcObj;
        })
    });

    await newPost.save();

    await User.findOneAndUpdate({ _id: req.currentUser!.userId }, { $push: { posts: newPost._id } });

    res.status(201).send(newPost);
});

export { router as newPostRouter };