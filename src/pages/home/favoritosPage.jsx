import { useFavorites } from "../../context/FavoriteContext.jsx";
import { usePublicaciones } from "../../shared/hooks/usePPublicaciones.jsx";
import { PublicacionCard } from "../../components/publicacion/publicacion.jsx";
import Sidebar from "../../components/sideBar.jsx";
const FavoritosPage = () => {
  const { favorites } = useFavorites();
  const { publicaciones, isFetching } = usePublicaciones();

  if (isFetching) return <div>Cargando publicaciones...</div>;

  const publicacionesFavoritas = publicaciones.filter((pub) =>
    favorites.includes(pub.pid)
  );

  return (
    <div>
      <Sidebar />
      {publicacionesFavoritas.length === 0 ? (
        <h1 style={{ textAlign: "center", marginTop: "20px" , marginLeft: "350px"}}>
          No tienes publicaciones favoritas aún.
        </h1>
      ) : (
        publicacionesFavoritas.map((pub) => (
          <PublicacionCard key={pub.pid} publicacion={pub} />
        ))
      )}
    </div>
  );
};

export default FavoritosPage;
