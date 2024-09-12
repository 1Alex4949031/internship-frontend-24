# Базовый образ для Node.js
FROM node:18 AS build-stage

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и устанавливаем зависимости
COPY package.json package-lock.json ./
RUN npm install

# Копируем исходный код React-приложения в контейнер
COPY . .

# Собираем приложение
RUN npm run build

# Этап для финальной сборки
FROM node:18 AS production-stage

# Устанавливаем JSON Server глобально и serve для React
RUN npm install -g json-server serve

# Создаем рабочую директорию
WORKDIR /app

# Копируем собранное приложение из предыдущего шага
COPY --from=build-stage /app/build ./build

# Копируем файл базы данных для JSON Server
COPY db.json ./db.json

# Открываем порты для JSON Server (3333) и React-приложения (3000)
EXPOSE 3000 3333

# Команда для одновременного запуска JSON Server и React-приложения
CMD json-server --watch db.json --port 3333 & serve -s build -l 3000
