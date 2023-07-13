import DBmessage from '../models/message';

const getMessages = (req, res, next) => {
  DBmessage.find({})
    .populate('owner')
    .then((message) => res.send({ data: message }))
    .catch(next);
};
export default getMessages;
