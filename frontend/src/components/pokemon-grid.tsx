"use client";

import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchPokemons, resetPokemons, setPage } from "@/store/pokemonSlice";
import PokemonCard from "./pokemon-details/pokemon-card";
import { PokemonLoader } from "./pokemon-loader";
import PokemonDetailsDialog from "./pokemon-details/pokemon-details-dialog";
import { AnimatePresence, motion } from "framer-motion";
import { GridMessage } from "./grid-message";

interface PokemonGridProps {
  favoritesOnly: boolean;
  search: string;
}

const PokemonGrid: React.FC<PokemonGridProps> = ({ favoritesOnly, search }) => {
  const dispatch = useAppDispatch();
  const { pokemons, loading, error, page } = useAppSelector(
    (state) => state.pokemon
  );
  const limit = 12;
  const hasNextPage = pokemons.length % limit === 0;

  const { ref: observerRef, inView } = useInView({
    threshold: 0.1,
    rootMargin: "200px",
    triggerOnce: false,
  });

  const [initialized, setInitialized] = useState(false);
  const [isFetchingNextPage, setIsFetchingNextPage] = useState(false);
  const [selectedPokemonId, setSelectedPokemonId] = useState<number | null>(
    null
  );

  // Reset pokemons when search or favoritesOnly change
  useEffect(() => {
    dispatch(resetPokemons());
    dispatch(setPage(0));
    setInitialized(true);
  }, [dispatch, search, favoritesOnly]);

  // Fetch pokemons when page changes
  useEffect(() => {
    if (!initialized) return;

    dispatch(
      fetchPokemons({ offset: page * limit, limit, favoritesOnly, search })
    )
      .unwrap()
      .finally(() => {
        setIsFetchingNextPage(false); // Unlock next fetch
      });
  }, [dispatch, page, favoritesOnly, search, initialized]);

  // Trigger next page when scrolled into view
  useEffect(() => {
    if (
      inView &&
      !loading &&
      initialized &&
      !isFetchingNextPage &&
      hasNextPage
    ) {
      setIsFetchingNextPage(true);
      dispatch(setPage(page + 1));
    }
  }, [
    inView,
    loading,
    initialized,
    isFetchingNextPage,
    dispatch,
    page,
    hasNextPage,
  ]);

  const handleSelectPokemon = (pokemonId: number) => {
    setSelectedPokemonId(pokemonId);
  };

  const handleCloseDialog = () => {
    setSelectedPokemonId(null);
  };

  if ((loading || !initialized) && page === 0) {
    return <PokemonLoader />;
  }

  if (error) {
    return (
      <GridMessage
        title="Oops!"
        description="Something went wrong while loading Pokémon."
        buttonText="Try Again"
        onButtonClick={() => window.location.reload()}
        errorMessage={error}
      />
    );
  }

  if (pokemons.length === 0) {
    return (
      <GridMessage
        title="Oops!"
        description="There are no Pokémon matching your search."
        buttonText="Try Again"
        onButtonClick={() => window.location.reload()}
      />
    );
  }

  return (
    <>
      <AnimatePresence>
        <motion.div
          variants={{
            visible: {
              transition: { staggerChildren: 0.08 },
            },
          }}
          animate="visible"
          className="grid w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center"
        >
          <AnimatePresence mode="sync">
            {pokemons.map((pokemon, index) => (
              <PokemonCard
                key={pokemon.id}
                pokemon={pokemon}
                index={index % limit}
                favoritesOnly={favoritesOnly}
                onSelect={() => handleSelectPokemon(pokemon.id)}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </AnimatePresence>

      {/* Observer div for infinite scroll */}
      {pokemons.length > 0 && hasNextPage && (
        <div ref={observerRef} className="w-full flex justify-center">
          <PokemonLoader />
        </div>
      )}

      <PokemonDetailsDialog
        id={selectedPokemonId}
        isOpen={selectedPokemonId !== null}
        onClose={handleCloseDialog}
        favoritesOnly={favoritesOnly}
      />
    </>
  );
};

export default React.memo(PokemonGrid);
