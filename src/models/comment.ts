import mongoose from 'mongoose';

export interface CommentDoc extends mongoose.Document {
    userName: string,
    content: string
}

export interface CreateCommentDTO {
    userName: string,
    content: string
}

export interface CommentModel extends mongoose.Model<CommentDoc> {
    build(createCommentDTO: CreateCommentDTO): CommentDoc;
}

const commentSchema = new mongoose.Schema({
    userName: {
        type: String
    },
    content: {
        type: String,
        required: true
    }
});

commentSchema.statics.build = (createCommentDTO: CreateCommentDTO) => {
    new Comment(createCommentDTO)
}

const Comment = mongoose.model<CommentDoc, CommentModel>('Comment', commentSchema);

export default Comment;