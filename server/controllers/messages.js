import DBmessage from '../models/message';

const getMessagesDB = () => DBmessage.find({ isPrivat: false }).populate('owner');
const getPrivatMessagesDB = () => DBmessage.find({ isPrivat: true }).populate('owner');

const createMessageDB = (message, owner, isPrivat, to) => DBmessage.create({ message, owner, isPrivat, to });

export { getMessagesDB, getPrivatMessagesDB, createMessageDB };
