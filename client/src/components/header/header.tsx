import { useState } from "react";
import "./header.css";

interface HeaderProps {
  onSearch: (query: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onSearch }) => {
  const [inputValue, setInputValue] = useState("");

  const handleSearch = () => {
    onSearch(inputValue); // Передаем значение в ListPage при нажатии кнопки
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="header">
      <div className="AvitoLogo">
        <svg width="30" height="30" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
          <path fill="#04E061" d="M 8.305 26.167 a 8.305 8.305 0 1 0 0 -16.61 a 8.305 8.305 0 0 0 0 16.61 Z"></path>
          <path fill="#FF4053" d="M 22.708 25.12 a 5.017 5.017 0 1 0 0 -10.035 a 5.017 5.017 0 0 0 0 10.035 Z"></path>
          <path fill="#965EEB" d="M 9.892 8.48 a 3.106 3.106 0 1 0 0 -6.211 a 3.106 3.106 0 0 0 0 6.211 Z"></path>
          <path fill="#0AF" d="M 20.757 14.004 a 6.752 6.752 0 1 0 0 -13.504 a 6.752 6.752 0 0 0 0 13.504 Z"></path>
        </svg>
      </div>
      <button className="AllCategoriesButton">Все категории</button>
      <input
        type="text"
        className="searchInput"
        placeholder="Поиск"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown} // Слушаем нажатие Enter
      />
      <button className="Submit" onClick={handleSearch}>Найти</button>
      <button className="AddOne">+ Разместить объявление</button>
      <button className="AddOne">Вход</button>
    </div>
  );
};

export default Header;
