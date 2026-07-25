import {config} from 'dotenv';
import {expand} from 'dotenv-expand';

// парсинг env, т.к внутри него мы используем
expand(config());

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import IORedis from "ioredis"
import type {StringValue} from '../src/lib/utils/ms';
import {ms} from '../src/lib/utils/ms';
import RedisStore from "connect-redis";
import session from "express-session";
import {mainRouter} from "./src/routes";
import {errorHandlerMiddleware} from "./src/middlewares/error-middleware";
import {deleteExpiredToken} from "./src/lib/utils/delete-expired-tokens";

const app = express();
const PORT = process.env.APPLICATION_PORT;
const redisClient = new IORedis(process.env.REDIS_URI!);

// белый список (откуда сервер может обрабатывать запросы)
const whitelist = [process.env.ALLOWED_ORIGIN];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || whitelist.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Blocked by CORS'));
    }
  },
  credentials: true
}));
app.use(express.json());
app.use(cookieParser(process.env.COOKIES_SECRET)); // Добавили секрет для подписи обычных кук

// настройка обработки сессий
app.use(
  session({
    store: new RedisStore({
      client: redisClient,
      prefix: process.env.SESSION_FOLDER, // 'sessions:'
    }),
    secret: process.env.SESSION_SECRET!,   // 'secret'
    name: process.env.SESSION_NAME,       // 'session'
    resave: true, // сохраняем сессию, даже если она не меняется
    saveUninitialized: false, // не сохранять пустые сессии
    cookie: {
      domain: process.env.SESSION_DOMAIN, // 'localhost'
      maxAge: ms(process.env.SESSION_MAX_AGE as StringValue),
      httpOnly: process.env.SESSION_HTTP_ONLY === 'true', // нельзя получить на фронте, только для http запросов
      secure: process.env.SESSION_SECURE === 'true', // разрешает отправку только через https://
      sameSite: 'lax', // отключает фоновые запросы с других сайтов на наш
    },
  })
);

// Подключение ОДНОГО главного роутера, который внутри себя содержит все остальные
app.use('/api', mainRouter);

// Обработчик серверных ошибок
app.use(errorHandlerMiddleware);

// Удаление истекших токенов в фоне
deleteExpiredToken();

// Запуск сервера
app.listen(PORT, () => {
  console.log(`сервер запущен на http://localhost:${PORT}`);
});