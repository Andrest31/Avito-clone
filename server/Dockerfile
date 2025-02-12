# Используем Node.js 20
FROM node:20

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json перед установкой зависимостей
COPY package.json package-lock.json ./

# Удаляем кеш NPM и устанавливаем зависимости
RUN npm cache clean --force && npm install

# Копируем весь код сервера
COPY . .

# Открываем порт 5000
EXPOSE 5000

# Проверяем, есть ли node_modules перед запуском
RUN ls -la && ls node_modules

# Запускаем сервер
CMD ["npm", "start"]
