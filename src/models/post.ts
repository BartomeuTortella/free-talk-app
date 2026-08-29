import mongoose from 'mongoose';
import type { UserDoc } from './user.js';
import type { CommentDoc } from './comment.js';


export interface PostDoc extends mongoose.Document {
    title: string,
    content: string,
    comments: Array<CommentDoc>
}


export interface CreatePostDTO {
    title: string,
    content: string
}
export interface PostModel extends mongoose.Model<PostDoc> {
    build(createPostDTO: CreatePostDTO): PostDoc;
}

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ]
});

postSchema.statics.build = (createPostDTO: CreatePostDTO) => {
    new Post(createPostDTO);
}

const Post = mongoose.model<PostDoc, PostModel>('Post', postSchema);

export default Post;