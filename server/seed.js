const { faker } = require('@faker-js/faker');
const { Client } = require('pg');

// Подключение к PostgreSQL
const client = new Client({
  user: 'admin',
  host: 'localhost', // или 'db', если внутри Docker
  database: 'avito_clone',
  password: 'password',
  port: 5432,
});

async function seedDatabase() {
  try {
    await client.connect();
    console.log('Подключено к базе данных!');

    // Очистка таблиц перед заполнением
    await client.query('DELETE FROM properties; DELETE FROM cars; DELETE FROM services; DELETE FROM ads;');

    // Генерация объявлений
    const ads = [];
    for (let i = 0; i < 10; i++) {
      const result = await client.query(
        'INSERT INTO ads (title, description, location, category, image_url) VALUES ($1, $2, $3, $4, $5) RETURNING id',
        [
          faker.commerce.productName(),
          faker.lorem.paragraph(),
          faker.address.city(),
          faker.helpers.arrayElement(['Недвижимость', 'Авто', 'Услуги']),
          faker.image.url(),
        ]
      );
      ads.push({ id: result.rows[0].id, category: result.rows[0].category });
    }

    // Заполнение таблиц в зависимости от категории
    for (const ad of ads) {
      if (ad.category === 'Недвижимость') {
        await client.query(
          'INSERT INTO properties (ad_id, type, area, rooms, price) VALUES ($1, $2, $3, $4, $5)',
          [
            ad.id,
            faker.helpers.arrayElement(['Квартира', 'Дом', 'Коммерческая недвижимость']),
            faker.number.int({ min: 30, max: 300 }),
            faker.number.int({ min: 1, max: 5 }),
            faker.number.int({ min: 1000000, max: 20000000 }),
          ]
        );
      } else if (ad.category === 'Авто') {
        await client.query(
          'INSERT INTO cars (ad_id, brand, model, year, mileage) VALUES ($1, $2, $3, $4, $5)',
          [
            ad.id,
            faker.vehicle.manufacturer(),
            faker.vehicle.model(),
            faker.number.int({ min: 2000, max: 2024 }),
            faker.number.int({ min: 0, max: 300000 }),
          ]
        );
      } else if (ad.category === 'Услуги') {
        await client.query(
          'INSERT INTO services (ad_id, type, experience, cost) VALUES ($1, $2, $3, $4)',
          [
            ad.id,
            faker.person.jobType(),
            faker.number.int({ min: 1, max: 20 }),
            faker.number.int({ min: 500, max: 5000 }),
          ]
        );
      }
    }

    console.log('База данных успешно заполнена случайными данными!');
  } catch (error) {
    console.error('Ошибка при заполнении базы:', error);
  } finally {
    await client.end();
  }
}

seedDatabase();
