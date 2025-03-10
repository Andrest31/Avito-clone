import React from "react";
import "./Footer.css";

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Логотип и описание */}
        <div className="footer-logo">
          <h2>Avito</h2>
          <p>Авито — сайт объявлений России. © ООО «КЕХ еКоммерц» 2007–2025.</p>
          <p>Оплачивая услуги на Авито, вы принимаете оферту.</p>
          <p>Авито использует рекомендательные технологии.</p>

        </div>

        {/* Контакты */}
        <div className="footer-contacts">
          <h3>Контакты</h3>
          <p>Email: support@avito.ru</p>
          <p>Телефон: +7 (900) 123-45-67</p>
        </div>

        {/* Социальные сети */}
        <div className="footer-socials">
          <h3>Мы в соцсетях</h3>
          <div className="social-icons">
            <a href="#" className="icon vk">VK</a>
            <a href="#" className="icon telegram">TG</a>
            <a href="#" className="icon youtube">YT</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
