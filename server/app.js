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
import DBmessage from './models/message';

const { PORT = 5000 } = process.env;
const users = [];

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
  let roomID = '';

  socket.on('join', (data) => {
    if (data.user._id && data.user.name) {
      const userExists = users.some((user) => user._id === data.user._id);
      if (!userExists) {
        users.push(data.user);
      }
      roomID = data.user._id;

      socket.join(roomID);
      const MESSAGE_SYSTEM = `${data.user.name} присоединился`;

      io.emit('join', { MESSAGE_SYSTEM, users });
    }
  });

  socket.on('sendMessage', ({ message, currentUser }) => {
    const text = message;
    const owner = currentUser;
    DBmessage.create({ text, owner });
    io.emit('messageList', { message, owner });
  });

  socket.on('privateMessage', ({ message, selectedUserID }) => {
    io.to(roomID).to(selectedUserID).emit('privateMessageList', { message, selectedUserID, roomID });
  });
});

app.use(router);

app.use(errors());

app.use(handleErrors);

server.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Слушаю порт: ${PORT}`);
});
