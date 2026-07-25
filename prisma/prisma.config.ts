// import { config } from 'dotenv';
// import { expand } from 'dotenv-expand';
// expand(config());
//
// import 'dotenv/config'; // Загружает переменные окружения
// import { defineConfig, env } from 'prisma/config'; // Импортирует нужные утилиты
//
// export default defineConfig({
//   schema: './prisma/schema.prisma', // Указывает путь к схеме
//   datasource: {
//     url: env('DATABASE_URL'), // Берет строку подключения из .env
//   },
// });

// import { config } from 'dotenv';
// import { expand } from 'dotenv-expand';
// expand(config());
//
// import 'dotenv/config'; // Загружает переменные окружения
// import { defineConfig } from 'prisma/config'; // Импортирует нужные утилиты
//
// export default defineConfig({
//   schema: './prisma/schema.prisma', // Указывает путь к схеме
//   datasource: {
//     url: process.env.DATABASE_URL, // Берет строку подключения из .env
//   },
// });

import { config } from 'dotenv';
import { expand } from 'dotenv-expand';
expand(config()); // Этот метод правильно раскроет ${POSTGRES_URI}

import { defineConfig, env } from 'prisma/config';

export default defineConfig({
  schema: './schema.prisma',
  datasource: {
    url: env('DATABASE_URL'),
  },
});