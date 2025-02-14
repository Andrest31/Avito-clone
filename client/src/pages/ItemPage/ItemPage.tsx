import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

// Тип объявления
interface Item {
  id: number;
  name: string;
  description: string;
  location: string;
  type: string;
  image?: string;
}

const ItemPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [item, setItem] = useState<Item | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:3000/items/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setItem(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) return <p>Загрузка...</p>;
  if (!item) return <p>Объявление не найдено</p>;

  return (
    <div>
      <h1>{item.name}</h1>
      <img src={item.image || "https://via.placeholder.com/300"} alt={item.name} width={300} />
      <p><strong>Категория:</strong> {item.type}</p>
      <p><strong>Локация:</strong> {item.location}</p>
      <p><strong>Описание:</strong> {item.description}</p>
      <Link to={`/form?id=${item.id}`}>Редактировать</Link>
      <br />
      <Link to="/list">Назад к списку</Link>
    </div>
  );
};

export default ItemPage;
