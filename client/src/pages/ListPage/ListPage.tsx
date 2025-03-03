import React, { useEffect, useState } from "react";
import Header from "../../components/header/header";
import "./ListPage.css";
import ListCard from "../../components/ListCard/ListCard";

// Тип объявления
interface Item {
  id: number;
  title: string;
  description: string;
  location: string;
  costs: string;
  category: string;
  firma: string;
  image?: string; // Опциональное поле для фото
  full_name: string;
  rating: number;
}

// Варианты категорий
const categories = ["Все", "Недвижимость", "Авто", "Услуги"];

const ListPage: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Все");

  // Запрос данных с сервера при загрузке
  useEffect(() => {
    fetch("http://localhost:5000/items")
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
      (selectedCategory === "Все" || item.category === selectedCategory) &&
      item.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div className="ListPage">
      <Header />

      <h1>Список объявлений</h1>

      <div className="list-block">
        {/* Пройдем по отфильтрованным объявлениям и передадим их в компонент ListCard */}
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => (
            <ListCard key={item.id} item={item} />
          ))
        ) : (
          <p>Объявления не найдены</p>
        )}
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
    </div>
  );
};

export default ListPage;
