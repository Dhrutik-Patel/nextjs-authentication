import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: [true, 'Username is required'],
            unique: true,
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true,
        },
        password: {
            type: String,
            required: [true, 'Password is required'],
        },
        avatar: {
            type: String,
            required: false,
            default: 'https://firebasestorage.googleapis.com/v0/b/tesla-clone-2808.appspot.com/o/user.png?alt=media&token=476996af-3798-4556-a9cb-0cd3117563f6',
        },
        isVerified: {
            type: Boolean,
            required: true,
            default: false,
        },
        isAdmin: {
            type: Boolean,
            required: true,
            default: false,
        },
        forgotPasswordToken: String,
        forgotPasswordTokenExpires: Date,
        verifyEmailToken: String,
        verifyEmailTokenExpires: Date,
    },
    { timestamps: true }
);

const User = mongoose.models['user'] || mongoose.model('user', userSchema);

export default User;
