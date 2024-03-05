import DBmessage from '../models/message.js';

const getMessagesDB = () => DBmessage.find({ isPrivat: false }).populate('owner');

const getPrivatMessagesDB = () => DBmessage.find({ isPrivat: true }).populate('owner');

const createMessageDB = (message, owner, isPrivat, createdAt, time, to) =>
  DBmessage.create({
    message,
    owner,
    isPrivat,
    createdAt,
    time,
    to,
  });

const deleteMessage = async (date) => {
  const mess = await DBmessage.findOne({ createdAt: date });
  return DBmessage.deleteOne(mess);
};

const updateMessage = async (id, mess) => {
  await DBmessage.updateOne({ createdAt: id }, { $set: { message: mess } });
};
export { getMessagesDB, getPrivatMessagesDB, createMessageDB, deleteMessage, updateMessage };
