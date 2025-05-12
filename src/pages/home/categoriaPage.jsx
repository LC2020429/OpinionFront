import React, { useState } from "react";
import { useCategories } from "../../shared/hooks/useCategorias.jsx";
import Sidebar from "../../components/sideBar.jsx";
import CategoriaCard from "../../components/categorias/categoriaCard.jsx";
import "../../assets/styles/categoria/categoriaPage.css";

const Categorias = () => {
  const { categories, isFetching, error } = useCategories(); 
  const [verTodas, setVerTodas] = useState(false);

  const handleVerTodas = () => setVerTodas(true);

  if (isFetching) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const categoriasFiltradas =
    Array.isArray(categories) && verTodas
      ? categories
      : Array.isArray(categories)
      ? categories.filter((c) => c.status === true)
      : [];

  return (
    <div>
      <Sidebar />
      <div className="categorias-lista">
        {categoriasFiltradas.length === 0 ? (
          <div>No hay categorías disponibles</div>
        ) : (
          categoriasFiltradas.map((categoria) => (
            <CategoriaCard
              key={categoria._id}
              categoryName={categoria.categoryName}
              vistasCategory={categoria.vistasCategory}
              status={categoria.status}
            />
          ))
        )}
      </div>
      {!verTodas && (
        <button onClick={handleVerTodas}>Ver todas las categorías</button>
      )}
    </div>
  );
};

export default Categorias;
