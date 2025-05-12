import React, { useState, useEffect } from "react";
import { Box, Flex, Heading, Spinner } from "@chakra-ui/react";
import Sidebar from "../components/sideBar";
import { PublicacionCard } from "../components/publicacion/publicacion";
import { usePublicaciones } from "../shared/hooks/usePPublicaciones.jsx";
import PublicacionFilterBar from "../components/filter.jsx";

import "../assets/styles/dashboard.css";

const Dashboard = () => {
  const { publicaciones, isFetching } = usePublicaciones();
  const [filters, setFilters] = useState({
    searchText: "",
    category: "all",
    sortOrder: "desc",
  });

  const [filteredPublicaciones, setFilteredPublicaciones] = useState([]);
  const [favoritos, setFavoritos] = useState(() => {
    const savedFavoritos = localStorage.getItem("favoritos");
    return savedFavoritos ? JSON.parse(savedFavoritos) : [];
  });

  const toggleFavorito = (publicacionId) => {
    setFavoritos((prevFavoritos) => {
      const newFavoritos = prevFavoritos.includes(publicacionId)
        ? prevFavoritos.filter((id) => id !== publicacionId)
        : [...prevFavoritos, publicacionId];

      localStorage.setItem("favoritos", JSON.stringify(newFavoritos));
      return newFavoritos;
    });
  };

  useEffect(() => {
    if (!publicaciones) return;

    let result = [...publicaciones];

    if (filters.category !== "all") {
      result = result.filter((pub) =>
        pub.categories.some((c) => c.name === filters.category)
      );
    }

    if (filters.searchText.trim()) {
      const lower = filters.searchText.toLowerCase();
      result = result.filter(
        (pub) =>
          pub.title.toLowerCase().includes(lower) ||
          pub.textPubli.toLowerCase().includes(lower)
      );
    }

    result.sort((a, b) =>
      filters.sortOrder === "asc"
        ? new Date(a.createdAt) - new Date(b.createdAt)
        : new Date(b.createdAt) - new Date(a.createdAt)
    );

    setFilteredPublicaciones(result);
  }, [filters, publicaciones]);

  return (
    <Flex>
      <Sidebar />

      <Box flex="1" p={6} bg="gray.50" minHeight="100vh">
        <Heading mb={4}>Publicaciones</Heading>

        <PublicacionFilterBar
          categories={
            publicaciones
              ? Array.from(
                  new Map(
                    publicaciones
                      .flatMap((p) => p.categories)
                      .map((c) => [c.name, c])
                  ).values()
                )
              : []
          }
          onFilterChange={(newFilters) => setFilters(newFilters)}
        />

        {isFetching ? (
          <Spinner />
        ) : (
          filteredPublicaciones.map((publicacion) => (
            <Box key={publicacion.pid} mb={4}>
              <PublicacionCard
                publicacion={publicacion}
                isFavorito={favoritos.includes(publicacion.pid)} 
                toggleFavorito={toggleFavorito} 
              />
            </Box>
          ))
        )}
      </Box>
    </Flex>
  );
};

export default Dashboard;
