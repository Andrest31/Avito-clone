import './ListCard.css'

const ListCard = () => {
    return (
        <div className="ListCard">
            <div className="left-info">
                <div className="info-str">Name</div>
                <div className="info-str">Discr</div>
                <div className="info-str">Price</div>
                <div className="info-str">4</div>
                <div className="info-str">5</div>
            </div>
            <div className="right-button">
                <button className="open">Открыть</button>
            </div>
        </div>
    )
}

export default ListCard