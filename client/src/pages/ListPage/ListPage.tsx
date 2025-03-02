import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/header/header";
import "./ListPage.css";
import ListCard from "../../components/ListCard/ListCard";

// Тип объявления
interface Item {
  id: number;
  name: string;
  description: string;
  location: string;
  type: string;
  image?: string; // Опциональное поле для фото
}

// Варианты категорий
const categories = ["Все", "Недвижимость", "Авто", "Услуги"];

const ListPage: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Все");

  // Запрос данных с сервера при загрузке
  useEffect(() => {
    fetch("http://localhost:3000/items")
      .then((res) => res.json())
      .then((data) => {
        console.log("Полученные данные:", data); // 🔹 Вывод в консоль
        setItems(data);
      })
      .catch((err) => console.error("Ошибка загрузки:", err));
  }, []);

  // Фильтрация объявлений
  const filteredItems = items.filter((item) => {
    return (
      (selectedCategory === "Все" || item.type === selectedCategory) &&
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div className="ListPage">
      <Header />

      <h1>Список объявлений</h1>

      <div className="list-block">
        <ListCard />
        <ListCard />
      </div>

      {/* Фильтр по категории */}
      <select onChange={(e) => setSelectedCategory(e.target.value)} value={selectedCategory}>
        {categories.map((cat) => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>

      {/* Поле поиска */}
      <input
        type="text"
        placeholder="Поиск по названию..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      {/* Отображение списка */}
      <ul>
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => (
            <li key={item.id}>
              <img src={item.image || "https://via.placeholder.com/100"} alt={item.name} width={100} />
              <h3>{item.name}</h3>
              <p>{item.location} - {item.type}</p>
              <Link to={`/item/${item.id}`}>Открыть</Link>
            </li>
          ))
        ) : (
          <p>Объявления не найдены</p>
        )}
      </ul>
    </div>
  );
};

export default ListPage;
