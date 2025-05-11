import React, { useState } from "react";
import { useCategorias } from "../../shared/hooks/useCategorias.jsx";
import  Sidebar  from "../../components/sideBar.jsx";

const Categorias = () => {
  const { categorias, isLoading, error } = useCategorias();
  const [verTodas, setVerTodas] = useState(false);

  const handleVerTodas = () => setVerTodas(true);

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const categoriasFiltradas = verTodas ? categorias : categorias.filter(c => c.status === true);

  return (
    <div>
    <Sidebar />
      <div className="categorias-lista">
        {categoriasFiltradas.map((categoria) => (
          <categoriaCard
            key={categoria.categoryName}
            categoryName={categoria.categoryName}
            vistasCategory={categoria.vistasCategory}
            status={categoria.status}
          />
        ))}
      </div>
      {!verTodas && (
        <button onClick={handleVerTodas}>Ver todas las categorías</button>
      )}
    </div>
  );
};

export default Categorias;
