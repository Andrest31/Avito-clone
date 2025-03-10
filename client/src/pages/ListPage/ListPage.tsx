import React, { useEffect, useState } from "react";
import Header from "../../components/header/header";
import "./ListPage.css";
import ListCard from "../../components/ListCard/ListCard";
import Pagination from "../../components/Pagination/Pagination";

const ITEMS_PER_PAGE = 9;

interface Item {
  id: number;
  title: string;
  description: string;
  location: string;
  category: string;
  firma: string;
  image?: string;
  full_name: string;
  rating: number;
  costs: string;
}

const ListPage: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Все категории");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetch("http://localhost:5000/items")
      .then((res) => res.json())
      .then((data) => setItems(data))
      .catch((err) => console.error("Ошибка загрузки:", err));
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const filteredItems = items.filter(
    (item) =>
      (selectedCategory === "Все категории" || item.category === selectedCategory) &&
      item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE);
  const paginatedItems = filteredItems.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  return (
    <div className="ListPage">
      <Header onSearch={handleSearch} onCategoryChange={handleCategoryChange} />

      <h1>Список объявлений</h1>

      <div className="list-block">
        {paginatedItems.length > 0 ? (
          paginatedItems.map((item) => <ListCard key={item.id} item={item} />)
        ) : (
          <p>Объявления не найдены</p>
        )}
      </div>

      {totalPages > 1 && <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />}
    </div>
  );
};

export default ListPage;
