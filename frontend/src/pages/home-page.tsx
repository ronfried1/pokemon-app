import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import PokemonGrid from "@/components/pokemon-grid";
import SearchBar from "@/components/search-bar";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchFavorites } from "@/store/pokemonSlice";

function HomePage() {
  const [search, setSearch] = useState("");
  const [favoritesOnly, setFavoritesOnly] = useState(false);
  const dispatch = useAppDispatch();
  const favorites = useAppSelector((state) => state.pokemon.favorites);
  const favoriteCount = favorites.length;

  useEffect(() => {
    dispatch(fetchFavorites());
  }, [dispatch]);

  const handleSearchChange = (value: string) => {
    setSearch(value);
  };

  const handleShowAll = () => {
    setFavoritesOnly(false);
  };

  const handleShowFavorites = () => {
    setFavoritesOnly(true);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="mb-4 text-2xl font-bold">Gotta Catch 'Em All</h1>
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex-grow">
            <SearchBar onSearch={handleSearchChange} />
          </div>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleShowAll}
              disabled={!search && favoriteCount === 0}
              className="h-10"
            >
              Show All
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleShowFavorites}
              disabled={favoriteCount === 0}
              className="h-10"
            >
              Show Favorites ({favoriteCount})
            </Button>
          </div>
        </div>
      </div>

      <PokemonGrid favoritesOnly={favoritesOnly} search={search} />
    </div>
  );
}

export default HomePage;
