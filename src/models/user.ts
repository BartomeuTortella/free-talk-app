import mongoose from 'mongoose';
import { authenticationService } from '../../common/index.js';
import type { PostDoc } from './post.js';


export interface UserDoc extends mongoose.Document {
    email: string,
    password: string,
    posts: Array<PostDoc>
}

export interface CreateUserDTO {
    email: string,
    password: string
}

export interface UserModel extends mongoose.Model<UserDoc> {

    build(dto: CreateUserDTO): UserDoc;
}

const userSchema = new mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'PostI' }]
});

userSchema.pre('save', async function () {
    if (this.isModified('password') || this.isNew) {
        const hashedPwd = authenticationService.pwsToHash(
            this.get('password')
        );

        this.set('password', hashedPwd);
    }
});

userSchema.statics.build = (createUserDTO: CreateUserDTO) => {
    return new User(createUserDTO);
}

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

export default User;