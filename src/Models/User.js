import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    _id: mongoose.Types.ObjectId(),
    username: String,
    password: { type: String, minlength: 8 }
});

const User = mongoose.model('User', UserSchema);

export default User;