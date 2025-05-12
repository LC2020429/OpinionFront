import React from "react";
import "../../assets/styles/categoria/categoriaCard.css";

const CategoriaCard = ({ categoryName, vistasCategory, status }) => {
  if (!status) return null; 

  return (
    <div className="tarjeta-categoria">
      <h3>{categoryName}</h3>
      <p>Vistas: {vistasCategory}</p>
    </div>
  );
};

export default CategoriaCard;
