# Используем Node.js 20
FROM node:20

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и устанавливаем зависимости
COPY package.json package-lock.json ./
RUN npm install

# Копируем весь код проекта
COPY . .

# Запускаем Vite
CMD ["npm", "run", "dev"]
