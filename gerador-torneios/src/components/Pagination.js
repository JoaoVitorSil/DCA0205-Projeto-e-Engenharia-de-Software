import React from "react";

const Pagination = (props) => {
    const {page, totalPages, onLeftClick, onRightClick} = props
    return (
        <div className="d-flex">
            <button onClick={onLeftClick}><div>◀️</div></button>
            <h4>Rodada {page} de {totalPages}</h4>
            <button onClick={onRightClick}><div>▶️</div></button>
        </div>
    )
}

export default Pagination;