import DBmessage from '../models/message';

const getMessagesDB = () => DBmessage.find({}).populate('owner');

const createMessageDB = (message, owner) => DBmessage.create({ message, owner });

export { getMessagesDB, createMessageDB };
