import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

// Типы объявлений
const ItemTypes = {
  REAL_ESTATE: "Недвижимость",
  AUTO: "Авто",
  SERVICES: "Услуги",
};

// Тип данных объявления
interface Item {
  id?: number;
  name: string;
  description: string;
  location: string;
  type: string;
}

const FormPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  const [form, setForm] = useState<Item>({
    name: "",
    description: "",
    location: "",
    type: ItemTypes.REAL_ESTATE,
  });

  const [error, setError] = useState("");

  // Если есть id, загружаем данные для редактирования
  useEffect(() => {
    if (id) {
      fetch(`http://localhost:3000/items/${id}`)
        .then((res) => res.json())
        .then((data) => setForm(data))
        .catch(() => setError("Ошибка загрузки"));
    }
  }, [id]);

  // Функция отправки формы
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name || !form.description || !form.location || !form.type) {
      setError("Все поля обязательны");
      return;
    }

    const method = id ? "PUT" : "POST";
    const url = id ? `http://localhost:3000/items/${id}` : "http://localhost:3000/items";

    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })
      .then(() => navigate("/list"))
      .catch(() => setError("Ошибка сохранения"));
  };

  return (
    <div>
      <h1>{id ? "Редактировать объявление" : "Добавить объявление"}</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <label>Название:</label>
        <input
          type="text"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />

        <label>Описание:</label>
        <textarea
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          required
        />

        <label>Локация:</label>
        <input
          type="text"
          value={form.location}
          onChange={(e) => setForm({ ...form, location: e.target.value })}
          required
        />

        <label>Категория:</label>
        <select
          value={form.type}
          onChange={(e) => setForm({ ...form, type: e.target.value })}
        >
          {Object.values(ItemTypes).map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>

        <button type="submit">{id ? "Сохранить" : "Создать"}</button>
      </form>

      <button onClick={() => navigate("/list")}>Отмена</button>
    </div>
  );
};

export default FormPage;
    