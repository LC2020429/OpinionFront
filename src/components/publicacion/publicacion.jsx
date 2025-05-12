import { MessageCircle, Heart } from "lucide-react";
import Sidebar from "../../components/sideBar.jsx";
import { Avatar } from "@chakra-ui/react";
import "../../assets/styles/publicaciones/publicacion.css";
import { useFavorites } from "../../context/FavoriteContext.jsx";

export const PublicacionCard = ({ publicacion, sessionUserId }) => {
  const { pid, title, textPubli, userPubli, createdAt, categories } =
    publicacion;
  const isOwner = sessionUserId === userPubli?._id;

  const { toggleFavorite, isFavorite } = useFavorites(); 

  return (
    <div className="card">
      <Sidebar />

      <div className="card-header">
        <div className="card-user-info">
          <Avatar className="avatar" />
          <p className="card-username">{userPubli?.name}</p>
        </div>
        <p className="card-date">{new Date(createdAt).toLocaleDateString()}</p>
      </div>

      <div className="card-content">
        <h2 className="card-title">{title}</h2>
        <p className="card-text">{textPubli}</p>

        {categories?.length > 0 && (
          <div className="card-categories">
            {categories.map((cat) => (
              <span key={cat._id} className="card-category">
                {cat.name}
              </span>
            ))}
          </div>
        )}

        <div className="card-icons">
          <button>
            <MessageCircle size={20} style={{ marginRight: "6px" }} />
            Comentarios
          </button>

          <button onClick={() => toggleFavorite(pid)}>
            <Heart
              size={20}
              color={isFavorite(pid) ? "red" : "gray"}
              fill={isFavorite(pid) ? "red" : "none"}
              style={{ marginRight: "6px" }}
            />
            Me gusta
          </button>
        </div>
      </div>
    </div>
  );
};
