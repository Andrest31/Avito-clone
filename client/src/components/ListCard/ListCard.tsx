import React from 'react';
import './ListCard.css';

interface ListCardProps {
  item: {
    id: number;
    title: string;
    description: string;
    location: string;
    category: string;
    image?: string;
    firma: string;
    full_name: string;
    costs: string;
    rating: number;

  };
}

const ListCard: React.FC<ListCardProps> = ({ item }) => {

  return (
    <div className="ListCard">
      <div className="left-block">
        <img
          src={item.image || "../../../img/2.jpg"}
          alt={item.title}
          className="left-img"
        />
        <div className="left-info">
          <div className="info-name-str">{item.title}</div>
          <div className="info-price-str">{item.costs}</div> {/* Здесь нужна логика для отображения цены, если она есть */}
          <div className="info-firma-str">{item.firma}</div>
          <div className="info-discr-str">{item.description}</div>
          <div className="info-category-str">{item.category}</div>
        </div>
      </div>
      <div className="right-button">
        <div className="seller-info">
          <div className="seller-name">
            {item.full_name}
          </div> {/* Тут тоже нужно получать данные продавца */}
          <div className="seller-rating">
            {item.rating}
          </div>
        </div>
        <button className="open">Открыть</button>
      </div>
    </div>
  );
};

export default ListCard;
