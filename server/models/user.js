import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  userPassword: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 30,
  },
});

export default mongoose.model('user', userSchema);
