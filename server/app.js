const express = require('express');
const bodyParser = require('body-parser');
const { Client } = require('pg');
const cors = require('cors');

const ItemTypes = {
  REAL_ESTATE: 'Недвижимость',
  AUTO: 'Авто',
  SERVICES: 'Услуги',
};

const app = express();

// Настройки подключения к PostgreSQL
const client = new Client({
  user: 'admin',           // Ваш пользователь PostgreSQL
  host: 'postgres_db',       // Хост (localhost если работает локально)
  database: 'avito_clone', // Имя базы данных
  password: 'password',    // Ваш пароль
  port: 5432,              // Порт PostgreSQL
});

// Подключение к базе данных
client.connect()
  .then(() => console.log('Подключено к базе данных!'))
  .catch((err) => console.error('Ошибка подключения к базе данных', err));

app.use(cors({
  origin: 'http://localhost:5173', // Порт фронтенда, если другой, замените
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: 'Content-Type',
}));

app.use(bodyParser.json());

// Получение всех объявлений из базы данных
app.get('/items', async (req, res) => {
  console.log('Получение всех объявлений');
  try {
    const result = await client.query('SELECT * FROM ads');
    console.log('Данные получены:', result.rows);
    res.json(result.rows);
  } catch (err) {
    console.error('Ошибка при получении данных из БД:', err);
    res.status(500).send('Ошибка сервера');
  }
});

// Создание нового объявления
app.post('/items', async (req, res) => {
  const { name, description, location, type, ...rest } = req.body;

  if (!name || !description || !location || !type) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const result = await client.query(
      'INSERT INTO ads (title, description, location, category, image_url) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [name, description, location, type, rest.imageUrl]
    );
    const newItem = result.rows[0];
    res.status(201).json(newItem);
  } catch (err) {
    console.error('Ошибка при добавлении объявления в базу данных:', err);
    res.status(500).send('Ошибка сервера');
  }
});

// Получение объявления по его id
app.get('/items/:id', async (req, res) => {
  const itemId = parseInt(req.params.id, 10);

  if (isNaN(itemId)) {
    return res.status(400).json({ error: 'Invalid ID format' });
  }

  try {
    const result = await client.query('SELECT * FROM ads WHERE id = $1', [itemId]);
    if (result.rows.length === 0) {
      return res.status(404).send('Item not found');
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Ошибка при получении объявления:', err);
    res.status(500).send('Ошибка сервера');
  }
});

// Обновление объявления по его id
app.put('/items/:id', async (req, res) => {
  const itemId = parseInt(req.params.id, 10);

  if (isNaN(itemId)) {
    return res.status(400).json({ error: 'Invalid ID format' });
  }

  const { name, description, location, type, ...rest } = req.body;

  try {
    const result = await client.query(
      'UPDATE ads SET title = $1, description = $2, location = $3, category = $4, image_url = $5 WHERE id = $6 RETURNING *',
      [name, description, location, type, rest.imageUrl, itemId]
    );

    if (result.rows.length === 0) {
      return res.status(404).send('Item not found');
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error('Ошибка при обновлении объявления:', err);
    res.status(500).send('Ошибка сервера');
  }
});

// Удаление объявления по его id
app.delete('/items/:id', async (req, res) => {
  const itemId = parseInt(req.params.id, 10);

  if (isNaN(itemId)) {
    return res.status(400).json({ error: 'Invalid ID format' });
  }

  try {
    const result = await client.query('DELETE FROM ads WHERE id = $1 RETURNING *', [itemId]);

    if (result.rows.length === 0) {
      return res.status(404).send('Item not found');
    }

    res.status(204).send();
  } catch (err) {
    console.error('Ошибка при удалении объявления:', err);
    res.status(500).send('Ошибка сервера');
  }
});

// Закрытие подключения к базе данных перед завершением работы сервера
process.on('exit', () => {
  client.end();
});

const PORT = process.env.PORT || 5000;



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
