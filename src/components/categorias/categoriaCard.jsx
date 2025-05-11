import React from "react";

const categoriaCard = ({ categoryName, vistasCategory, status }) => {
  if (!status) return null;

  return (
    <div className="tarjeta-categoria">
      <h3>{categoryName}</h3>
      <p>Vistas: {vistasCategory}</p>
    </div>
  );
};

export default categoriaCard;
