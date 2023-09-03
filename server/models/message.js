import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true,
  },

  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },

  to: {
    type: String,
  },

  isPrivat: {
    type: Boolean,
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('DBmessage', messageSchema);
