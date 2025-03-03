    import './ListCard.css'

    const ListCard = () => {
        return (
            <div className="ListCard">
                <div className="left-block">
                    <img src="../../../img/2.jpg" alt="" className="left-img" />
                    <div className="left-info">
                        <div className="info-name-str">Полуось задней оси мерседеса</div>
                        <div className="info-price-str">14 000 ₽</div>
                        <div className="info-firma-str">Mercedes</div>
                        <div className="info-discr-str">Рады приветствовать вас! Наш Часовой сервис при часовом ломбарде, готов предложить различные услуги, а именно: Мы производим ремонт и обслуживание часов любой сложности, Полировку корпусов и браслетов с восстановлением </div>
                        <div className="info-category-str">Запчасти</div>
                    </div>
                </div>
                <div className="right-button">
                    <div className="seller-info">
                        <div className="seller-name">Сергиево-Посадский завод</div>
                        <div className="seller-rating">4.7</div>
                    </div>
                    <button className="open">Открыть</button>
                </div>
            </div>
        )
    }

    export default ListCard