import { useState } from "react";
import { Search } from "lucide-react";
import "../assets/styles/filter.css";
const PublicacionFilterBar = ({ categories = [], onFilterChange }) => {
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
        <label>Categoría:</label>
        <select
          value={selectedCategory}
          onChange={(e) => {
            setSelectedCategory(e.target.value);
            handleFilterChange();
          }}
        >
          <option value="all">Todas</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat.name}>
              {cat.name}
            </option>
          ))}
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
