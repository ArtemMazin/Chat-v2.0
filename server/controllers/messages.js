import DBmessage from '../models/message';

const getMessagesDB = () => DBmessage.find({ isPrivat: false }).populate('owner');

const getPrivatMessagesDB = () => DBmessage.find({ isPrivat: true }).populate('owner');

const createMessageDB = (message, owner, isPrivat, createdAt, to) =>
  DBmessage.create({
    message,
    owner,
    isPrivat,
    createdAt,
    to,
  });

const deleteMessage = async (date) =>
  await DBmessage.findOne({ createdAt: date }).then((mess) => DBmessage.deleteOne(mess));

export { getMessagesDB, getPrivatMessagesDB, createMessageDB, deleteMessage };
