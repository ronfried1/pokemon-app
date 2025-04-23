"use client";

import { PokemonEvolution } from "@/types/details-pokemon";
import React from "react";

interface PokemonEvolutionProps {
  evolutionChain: PokemonEvolution[];
}

const PokemonEvolutionChain: React.FC<PokemonEvolutionProps> = ({
  evolutionChain,
}) => {
  if (!evolutionChain || evolutionChain.length === 0) {
    return (
      <p className="text-muted-foreground">
        Evolution information not available in this version.
      </p>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-lg md:text-xl font-bold mb-4 text-foreground">
        Evolution Chain
      </h2>
      <div className="flex flex-wrap justify-center gap-2 md:gap-4">
        {evolutionChain.map((evolution) => (
          <div key={evolution.id} className="flex flex-col items-center">
            <img
              src={evolution.spriteUrl}
              alt={evolution.name}
              className="h-16 w-16 md:h-24 md:w-24"
            />
            <p className="text-center capitalize text-xs md:text-base text-foreground">
              {evolution.name}
            </p>
            <span className="text-[10px] md:text-xs text-muted-foreground">
              {evolution.condition ? evolution.condition : "level 1"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default React.memo(PokemonEvolutionChain);
