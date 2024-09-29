import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  status: {
    type: Number,
    enum: [0, 1],
    default: 0,
  },
  username: {
    type: String,
    unique: true,
    sparse: true,
  },
}, {timestamps: true});

const UserModel = mongoose.model('User', userSchema);

export default UserModel;
export const getRegisteredUser = async ({email, username}: {email?: string, username?: string}) => {
    try {
        const query = email ? { email, status: 1 } : { username, status: 1 };
        return await UserModel.findOne(query);
    } catch (error) {
        return null;
    }
};
