import { useState } from "react";
import { MessageCircle, Heart, PlusCircle } from "lucide-react";
import Sidebar from "../../components/sideBar.jsx";
import { Avatar } from "@chakra-ui/react";
import "../../assets/styles/publicaciones/publicacion.css";
import { useFavorites } from "../../context/FavoriteContext.jsx";
import { useComments } from "../../shared/hooks/useComments.jsx";
import { useAddComment } from "../../shared/hooks/useAddComent.jsx";

export const PublicacionCard = ({ publicacion, sessionUserId }) => {
  const { pid, title, textPubli, userPubli, createdAt, categories } =
    publicacion;
  const isOwner = sessionUserId === userPubli?._id;

  const { toggleFavorite, isFavorite } = useFavorites();
  const { addComment } = useAddComment();
  const { comments, isFetching, error } = useComments(pid);
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [isAddingComment, setIsAddingComment] = useState(false);
  const handleShowComments = () => {
    setShowComments(!showComments);
  };
  const handleAddComment = async () => {
    if (newComment.trim()) {
      const commentData = {
        textComent: newComment,
        userWhoComent: sessionUserId,
        publicacionComent: pid,
      };
      await addComment(commentData);
      setNewComment("");
      setIsAddingComment(false);
    }
  };
  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

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
          <button onClick={handleShowComments}>
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

        {showComments && (
          <div className="comments-section">
            {isFetching && <div>Cargando comentarios...</div>}
            {error && <div>Error al cargar comentarios: {error}</div>}
            {comments.length > 0 ? (
              <div className="comments-container">
                {comments.map((comment) => (
                  <div key={comment.coid} className="comment-card">
                    <div className="comment-content">
                      <p className="comment-username">
                        <strong>{comment.userWhoComent?.name}</strong>
                      </p>
                      <p className="comment-text">{comment.textComent}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div>No hay comentarios aún.</div>
            )}

            {!isAddingComment ? (
              <button
                onClick={() => setIsAddingComment(true)}
                style={{ marginTop: "10px" }}
              >
                <PlusCircle size={20} style={{ marginRight: "6px" }} />
                Agregar Comentario
              </button>
            ) : (
              <div>
                <input
                  type="text"
                  value={newComment}
                  onChange={handleCommentChange}
                  placeholder="Escribe tu comentario..."
                  style={{ width: "100%", marginTop: "10px" }}
                />
                <button
                  onClick={handleAddComment}
                  style={{ marginTop: "10px" }}
                >
                  Comentar
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
