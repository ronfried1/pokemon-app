"use client";

import React, { useState, useRef, useEffect, useMemo } from "react";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Heart } from "lucide-react";
import { motion } from "framer-motion";
import { Pokemon } from "../../types/pokemon";
import { useAppDispatch } from "../../store/hooks";
import { toggleFavorite } from "../../store/pokemonSlice";
import { typeColors, getTypeName } from "../../lib/utils";
import { toast } from "sonner";
import { useMediaQuery } from "@/hooks/use-media-query";

interface PokemonCardProps {
  pokemon: Pokemon;
  index: number;
  onSelect: (id: number) => void;
  favoritesOnly: boolean;
}

function PokemonCard({
  pokemon,
  index,
  onSelect,
  favoritesOnly,
}: PokemonCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [optimisticIsFav, setOptimisticIsFav] = useState(pokemon.isFavorite);
  const dispatch = useAppDispatch();

  const mainType = useMemo(
    () => getTypeName(pokemon.types?.[0] || ""),
    [pokemon.types]
  );
  const gradientClass = useMemo(
    () => typeColors[mainType] || "bg-gradient-to-r from-gray-400 to-gray-500",
    [mainType]
  );

  useEffect(() => {
    setOptimisticIsFav(pokemon.isFavorite);
  }, [pokemon.isFavorite]);

  const handleToggleFavorite = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const newIsFavorite = !optimisticIsFav;
    setOptimisticIsFav(newIsFavorite);

    try {
      await dispatch(
        toggleFavorite({
          id: pokemon.id,
          name: pokemon.name,
          isFavorite: newIsFavorite,
          favoritesOnly,
        })
      ).unwrap();

      toast.success(
        newIsFavorite ? "Added to favorites ❤️" : "Removed from favorites ❌"
      );
    } catch (error) {
      console.error("Failed to update favorite", error);
      setOptimisticIsFav(pokemon.isFavorite);
      toast.error("Failed to update favorite. Please try again.");
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const rotateX = (e.clientY - rect.top - rect.height / 2) / 10;
    const rotateY = (rect.width / 2 - (e.clientX - rect.left)) / 10;
    setRotation({ x: rotateX, y: rotateY });
  };

  const resetRotation = () => {
    setRotation({ x: 0, y: 0 });
    setIsHovered(false);
  };

  if (!pokemon.spriteUrl) {
    return (
      <Card className="overflow-hidden h-full border-0 rounded-2xl shadow-lg bg-white/90 backdrop-blur-sm flex items-center justify-center">
        <h3 className="font-bold text-xl capitalize">Loading...</h3>
      </Card>
    );
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 75 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8, y: 50 }}
      transition={{
        delay: index * 0.1,
        ease: "easeInOut",
        duration: 0.5,
      }}
      onClick={() => onSelect(pokemon.id)}
      className="max-w-sm rounded relative w-full cursor-pointer"
    >
      <motion.div
        ref={cardRef}
        className="h-full perspective-1000"
        onMouseMove={!isMobile ? handleMouseMove : undefined}
        onMouseEnter={!isMobile ? () => setIsHovered(true) : undefined}
        onMouseLeave={!isMobile ? resetRotation : undefined}
        whileHover={!isMobile ? { scale: 1.05, zIndex: 10 } : undefined}
        whileTap={{ scale: 0.98 }}
      >
        <motion.div
          style={{
            rotateX: isHovered ? rotation.x : 0,
            rotateY: isHovered ? rotation.y : 0,
          }}
          transition={{ type: "spring", stiffness: 300, damping: 15 }}
          className="h-full"
        >
          <Card className="overflow-hidden h-full border-0 rounded-2xl shadow-lg bg-card dark:bg-card/50 backdrop-blur-sm transition-all duration-300">
            <div
              className={`relative pt-6 px-6 ${gradientClass} rounded-t-2xl`}
            >
              <motion.button
                onClick={handleToggleFavorite}
                className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white/80 hover:bg-white shadow-md"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.8 }}
              >
                <Heart
                  className={`h-5 w-5 transition-colors duration-200 ${
                    optimisticIsFav
                      ? "fill-red-500 text-red-500"
                      : "text-gray-400"
                  }`}
                />
              </motion.button>
              <div className="flex justify-center items-center p-4 h-[180px]">
                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{
                    repeat: Infinity,
                    duration: 2,
                    ease: "easeInOut",
                  }}
                  className="h-full flex items-center justify-center"
                >
                  <img
                    src={pokemon.spriteUrl || "/placeholder.svg"}
                    alt={pokemon.name}
                    className="object-contain drop-shadow-lg max-h-[150px] w-auto"
                  />
                </motion.div>
              </div>
            </div>
            <div className="p-5">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-xl capitalize">
                  {pokemon.name.replace(/-/g, " ")}
                </h3>
                <span className="text-sm font-medium bg-muted px-2 py-1 rounded-full">
                  #{pokemon.id}
                </span>
              </div>
              <div className="flex flex-wrap gap-2 mt-3">
                {pokemon.types?.map((type, idx: number) => {
                  const typeName = getTypeName(type);
                  return (
                    <Badge
                      key={idx}
                      className={`${
                        typeColors[typeName] || "bg-gray-500"
                      } text-white px-3 py-1 text-xs font-medium`}
                    >
                      {typeName}
                    </Badge>
                  );
                })}
              </div>
            </div>
          </Card>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default React.memo(PokemonCard);
