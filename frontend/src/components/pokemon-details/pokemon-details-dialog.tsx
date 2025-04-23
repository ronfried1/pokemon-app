"use client";

import React, { useEffect, useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { pokemonApi } from "@/lib/api";
import { PokemonDetails } from "@/types/details-pokemon";
import PokemonDetailsContent from "./pokemon-details-content";
import LoadingSkeleton from "../skeletons/pokemon-details-content-skeleton";
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { toast } from "sonner";
import { useAppDispatch } from "@/store/hooks";
import { fetchPokemons } from "@/store/pokemonSlice";

interface PokemonDetailsDialogProps {
  id: number | null;
  isOpen: boolean;
  onClose: () => void;
  favoritesOnly?: boolean;
}

const PokemonDetailsDialog: React.FC<PokemonDetailsDialogProps> = ({
  id,
  isOpen,
  onClose,
  favoritesOnly = false,
}) => {
  const [details, setDetails] = useState<PokemonDetails | null>(null);
  const [loading, setLoading] = useState(false);
  const [initialFavoriteState, setInitialFavoriteState] = useState<
    boolean | null
  >(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setLoading(true);
        const data = await pokemonApi.fetchPokemonDetails(id!);
        setDetails(data);
        setInitialFavoriteState(data.isFavorite);
      } catch (error) {
        console.error("Failed to fetch details", error);
        toast.error("Failed to load Pokémon details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    if (isOpen && id !== null) {
      fetchDetails();
    }
  }, [id, isOpen]);

  const handleDialogClose = () => {
    // If in favorites view and favorite status changed from true to false
    if (
      favoritesOnly &&
      initialFavoriteState === true &&
      details &&
      !details.isFavorite
    ) {
      // Refresh the data to ensure removed item doesn't show in favorites
      dispatch(
        fetchPokemons({ offset: 0, limit: 12, favoritesOnly, search: "" })
      );
    }

    onClose();
  };

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={handleDialogClose}>
      <DialogTitle className="sr-only">Pokemon Details</DialogTitle>
      <DialogDescription className="sr-only">
        View detailed stats and information about a Pokémon
      </DialogDescription>
      <DialogContent className="max-w-4xl p-0 gap-0 overflow-hidden max-h-[90vh] md:max-h-[85vh] overflow-y-auto">
        <ScrollArea className="h-full max-h-[calc(90vh-2rem)] md:max-h-[calc(90vh)]">
          {loading || !details ? (
            <LoadingSkeleton />
          ) : (
            <PokemonDetailsContent
              pokemon={details}
              favoritesOnly={favoritesOnly}
            />
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default PokemonDetailsDialog;
