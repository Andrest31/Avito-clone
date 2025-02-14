FROM node:18-alpine

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json (если есть)
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install --only=production

# Копируем исходный код
COPY . .

# Указываем порт, который будет использоваться в контейнере
EXPOSE 3000

# Запуск приложения
CMD ["npm", "start"]
