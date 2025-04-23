import React, { useState } from "react";
import { PokemonDetails } from "@/types/details-pokemon";
import { useAppDispatch } from "@/store/hooks";
import { toggleFavorite } from "@/store/pokemonSlice";
import { toast } from "sonner";
import PokemonHeader from "./content-blocks/pokemon-header";
import PokemonImages from "./content-blocks/pokemon-images";
import PokemonTabs from "./content-blocks/pokemon-tabs";

// import { toast } from "sonner"; // optional toast for nice UX

interface PokemonDetailsContentProps {
  pokemon: PokemonDetails;
  favoritesOnly?: boolean;
}

const PokemonDetailsContent: React.FC<PokemonDetailsContentProps> = ({
  pokemon,
  favoritesOnly = false,
}) => {
  const dispatch = useAppDispatch();
  const [optimisticIsFav, setOptimisticIsFav] = useState(pokemon.isFavorite);

  const handleToggleFavorite = async () => {
    const newIsFavorite = !optimisticIsFav;
    setOptimisticIsFav(newIsFavorite);
    try {
      await dispatch(
        toggleFavorite({
          id: pokemon.id,
          isFavorite: newIsFavorite,
          name: pokemon.name,
          favoritesOnly: favoritesOnly,
        })
      ).unwrap();
      toast.success(
        newIsFavorite ? "Added to favorites ❤️" : "Removed from favorites ❌"
      );
    } catch (err) {
      console.log(err);
      toast.error("Failed to update favorite. Please try again.");
    }
  };

  return (
    <div className="grid md:grid-cols-2">
      <div className="flex flex-col">
        <PokemonImages
          sprites={pokemon.sprites}
          name={pokemon.name}
          isFavorite={optimisticIsFav}
          onToggleFavorite={handleToggleFavorite}
          types={pokemon.types}
        />

        <PokemonHeader
          name={pokemon.name}
          id={pokemon.id}
          types={pokemon.types}
          description={pokemon.description}
          height={pokemon.height}
          weight={pokemon.weight}
          baseExperience={pokemon.base_experience}
          abilities={pokemon.abilities}
        />
      </div>

      <div className="bg-muted p-4 md:p-6">
        <PokemonTabs pokemon={pokemon} />
      </div>
    </div>
  );
};

export default React.memo(PokemonDetailsContent);
