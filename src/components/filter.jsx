import React, { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { useCategories } from "../shared/hooks/useCategorias.jsx";
import "../assets/styles/filter.css";

const PublicacionFilterBar = ({ onFilterChange }) => {
  const { categories, isFetching, error } = useCategories(); 
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortOrder, setSortOrder] = useState("desc");

  const handleFilterChange = () => {
    onFilterChange({
      searchText,
      category: selectedCategory,
      sortOrder,
    });
  };

  useEffect(() => {
    handleFilterChange(); 
  }, [categories, selectedCategory, sortOrder, searchText]);

  if (isFetching) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="filter-bar">
      <div className="filter-item">
        <label>Buscar:</label>
        <div className="search-container">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            placeholder="Buscar publicaciones..."
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
              handleFilterChange();
            }}
          />
        </div>
      </div>

      <div className="filter-item">
        <label>Cursos:</label>
        <select
          value={selectedCategory}
          onChange={(e) => {
            setSelectedCategory(e.target.value);
            handleFilterChange();
          }}
        >
          <option value="all">Todas</option>
          {categories && categories.length > 0 ? (
            categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.categoryName || cat.name}{" "}
                {/* Asegúrate de que estos campos existan */}
              </option>
            ))
          ) : (
            <option disabled>No hay categorías disponibles</option>
          )}
        </select>
      </div>

      <div className="filter-item">
        <label>Ordenar por:</label>
        <select
          value={sortOrder}
          onChange={(e) => {
            setSortOrder(e.target.value);
            handleFilterChange();
          }}
        >
          <option value="desc">Más nuevas</option>
          <option value="asc">Más antiguas</option>
        </select>
      </div>
    </div>
  );
};

export default PublicacionFilterBar;
