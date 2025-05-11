import { Link } from "react-router-dom";
import "../assets/styles/Sidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-content">
        <div className="sidebar-item">
          <Link to="/categoria">Categorías</Link>
        </div>

        <div className="sidebar-item">
          <Link to="/cuentas">Cuentas</Link>
        </div>
        <div className="sidebar-item">
          <Link to="/favoritos">Favoritos</Link>
        </div>
        <div className="sidebar-item">
          <Link to="/dashboard">Publicaciones</Link>
        </div>
      </div>

      <div className="sidebar-item-perfil">
        <Link to="/perfil">Perfil</Link>
      </div>
    </div>
  );
};

export default Sidebar;
