import React, { useState } from "react";
import "./AuthModal.css";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true); // true - Вход, false - Регистрация
  const [email, setEmail] = useState("");
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = () => {
    if (isLogin) {
      console.log("Вход:", { email, password });
    } else {
      if (password !== confirmPassword) {
        alert("Пароли не совпадают!");
        return;
      }
      console.log("Регистрация:", { email, password });
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="tabs">
          <button
            className={isLogin ? "active" : ""}
            onClick={() => setIsLogin(true)}
          >
            Вход
          </button>
          <button
            className={!isLogin ? "active" : ""}
            onClick={() => setIsLogin(false)}
          >
            Регистрация
          </button>
        </div>

        <h2>{isLogin ? "Вход" : "Регистрация"}</h2>
        <input
          type="login"
          placeholder="Логин"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
        />
        {!isLogin &&(
          <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />)}
        <input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {!isLogin && (
          <input
            type="password"
            placeholder="Подтвердите пароль"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        )}
        <div className="buttons">
          <button className="accept" onClick={handleSubmit}>
            {isLogin ? "Войти" : "Зарегистрироваться"}
          </button>
          <button onClick={onClose} className="close-btn">
            Закрыть
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
