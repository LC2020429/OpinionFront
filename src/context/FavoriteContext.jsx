import { createContext, useContext, useState, useEffect } from "react";

const FavoriteContext = createContext();

export const FavoriteProvider = ({ children }) => {
  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = localStorage.getItem("favorites");
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  const toggleFavorite = (postId) => {
    setFavorites((prevFavorites) => {
      const updatedFavorites = prevFavorites.includes(postId)
        ? prevFavorites.filter((id) => id !== postId)
        : [...prevFavorites, postId];

      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      return updatedFavorites;
    });
  };

  const isFavorite = (postId) => {
    return favorites.includes(postId);
  };

  return (
    <FavoriteContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoriteContext.Provider>
  );
};

export const useFavorites = () => {
  return useContext(FavoriteContext);
};
