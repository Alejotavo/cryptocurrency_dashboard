import { createContext, useContext, useEffect, useState } from "react";
import type { Cryptocurrency } from "../models/cryptocurrency";

type UseFavoritesType = {
  favorites: Cryptocurrency[];
  addFavorite: (crypto: Cryptocurrency) => void;
  removeFavorite: (id: string) => void;
};

const FavoritesContext = createContext<UseFavoritesType | undefined>(undefined);

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
};

export const FavoritesProvider = ({ children }: { children: React.ReactNode }) => {

  const [favorites, setFavorites] = useState<Cryptocurrency[]>(() => {
    const stored = localStorage.getItem("favorites");
    return stored ? JSON.parse(stored) : [];
  });

const addFavorite = (crypto: Cryptocurrency) => {
  setFavorites((prev) => {
    if (prev.find((c) => c.id === crypto.id)) return prev;
    return [...prev, crypto];
  });
};


  const removeFavorite = (id: string) => {
    setFavorites((prev) => prev.filter((fav) => fav.id !== id));
  };

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};
