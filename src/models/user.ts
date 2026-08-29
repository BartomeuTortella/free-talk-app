import mongoose from 'mongoose';
import { authenticationService } from '../../common/index.js';


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


const User = mongoose.model('User', userSchema);

export default User;