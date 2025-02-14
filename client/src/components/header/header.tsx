import './header.css'

const Header = () => {
  return (
    
    <div className="header">
        <div className="AvitoLogo">Avito</div>
        <div className="AllCategoriesButton">Все категории</div>
        <input type="text" className="searchInput" placeholder='Поиск'/>
        <button className="Submit">Найти</button>
        <button className="AddOne">+ Разместить объявление</button>
    </div>
  );
};

export default Header;
