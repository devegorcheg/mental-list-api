# Сервер api для приложения Mental-List

## Стек:

- express
- mongoose (MongoDB)

## Как развернуть локально:

- создать в корне проекта папку logs
- установить MongoDB
- установить Node.js

## Локальная разработка api

Локальная разработка подразумевает, что на host установлена MongoDB
Необходимо создать .env с параметрами:

```
MONGO_URL=mongodb://localhost:27017/study
PORT=3001
NODE_ENV=development
```

Запуск:

```
npm i
npm run dev
```
