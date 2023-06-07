import express from 'express';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';

const { PORT = 3000 } = process.env;

const app = express();
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  message: 'Слишком много запросов с данного IP, повторите попытку позднее',
});

// express-rate-limit ограничивает количество запросов
app.use(limiter);
// helmet помогает защитить приложения Express, устанавливая заголовки ответа HTTP
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Слушаю порт: ${PORT}`);
});
