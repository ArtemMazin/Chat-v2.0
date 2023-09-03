import DBmessage from '../models/message';

const getMessagesDB = () => DBmessage.find({ isPrivat: false }).populate('owner');
const getPrivatMessagesDB = () => DBmessage.find({ isPrivat: true }).populate('owner');

const createMessageDB = (message, owner, to, isPrivat) => DBmessage.create({ message, owner, to, isPrivat });

export { getMessagesDB, getPrivatMessagesDB, createMessageDB };
