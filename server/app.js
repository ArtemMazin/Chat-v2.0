import express from 'express';
import cors from 'cors';
import http from 'http';
import { Server } from 'socket.io';
import mongoose from 'mongoose';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import { errors } from 'celebrate';
import router from './routes/index';
import handleErrors from './errors/handleErrors';
import dateOptions from './utils/constants';
import { createMessageDB, deleteMessage, getMessagesDB, getPrivatMessagesDB } from './controllers/messages';

const { PORT = 5000 } = process.env;
const users = [];
const messages = {};
const roomID = 'default';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    credentials: true,
    origin: ['http://localhost:3000'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  },
});
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  message: 'Слишком много запросов с данного IP, повторите попытку позднее',
});
app.use(
  cors({
    credentials: true,
    origin: ['http://localhost:3000'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  })
);
// express-rate-limit ограничивает количество запросов
app.use(limiter);
// helmet помогает защитить приложения Express, устанавливая заголовки ответа HTTP
app.use(helmet());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

mongoose.connect('mongodb://127.0.0.1:27017/chatdb');

io.on('connection', (socket) => {
  const { userName, userID } = socket.handshake.auth;
  socket.userID = userID;
  socket.userName = userName;
  messages[roomID] = [];
  messages[socket.userID] = [];

  socket.on('join', async (data) => {
    console.log(`${socket.userName} присоединился`);
    socket.join(socket.userID);

    const messagesDB = await getMessagesDB();
    const privateMessagesDB = await getPrivatMessagesDB();
    messages[socket.userID] = privateMessagesDB;
    messages[roomID] = messagesDB;

    if (data.user._id && data.user.name) {
      const userExists = users.some((user) => user._id === socket.userID);
      if (!userExists) {
        users.push(data.user);
      }

      const MESSAGE_SYSTEM = `${data.user.name} присоединился`;

      messages[roomID].push({ MESSAGE_SYSTEM, users });

      io.emit('join', messages[roomID], messages, users);
    }
  });

  socket.on('sendMessage', ({ message, currentUser }) => {
    const createdAt = Date.now();
    const time = new Date(createdAt).toLocaleDateString('ru-RU', dateOptions);

    const isPrivat = false;
    const owner = currentUser;
    messages[roomID].push({ message, owner, createdAt, time });

    createMessageDB(message, owner, isPrivat, createdAt, time);

    io.emit('updateMessageList', messages[roomID]);
  });

  socket.on('removeMessage', async ({ message }) => {
    messages[roomID] = messages[roomID].filter((m) => m.createdAt !== message.createdAt);

    io.emit('updateMessageList', messages[roomID]);
    deleteMessage(message.createdAt);
  });
  socket.on('removePrivateMessage', async ({ message }) => {
    messages[socket.userID] = messages[socket.userID].filter((m) => m.createdAt !== message.createdAt);
    messages[message.to] = messages[message.to].filter((m) => m.createdAt !== message.createdAt);

    io.emit('updatePrivateMessageList', messages);
    deleteMessage(message.createdAt);
  });

  socket.on('privateMessage', ({ message, to, currentUser }) => {
    const isPrivat = true;
    const owner = currentUser;

    const createdAt = Date.now();
    const time = new Date(createdAt).toLocaleDateString('ru-RU', dateOptions);

    messages[to].push({
      message,
      to,
      owner,
      createdAt,
      time,
    });
    messages[socket.userID].push({
      message,
      to,
      owner,
      createdAt,
      time,
    });

    createMessageDB(message, owner, isPrivat, createdAt, time, to);
    io.to(socket.userID).to(to).emit('updatePrivateMessageList', messages);
  });

  socket.on('disconnect', () => {
    console.log(`${socket.userName} покинул чат`);
  });
});

app.use(router);

app.use(errors());

app.use(handleErrors);

server.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Слушаю порт: ${PORT}`);
});
