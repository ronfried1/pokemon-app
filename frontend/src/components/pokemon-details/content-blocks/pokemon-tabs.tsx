"use client";

import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { PokemonDetails } from "@/types/details-pokemon";
import PokemonStats from "./tabs/pokemon-stats";
import PokemonMoves from "./tabs/pokemon-moves";
import PokemonEvolutionChain from "./tabs/pokemon-evolution";

interface PokemonTabsProps {
  pokemon: PokemonDetails;
}

const PokemonTabs: React.FC<PokemonTabsProps> = ({ pokemon }) => {
  return (
    <Tabs defaultValue="statistics">
      <TabsList className="grid w-full grid-cols-3 mb-4 md:mb-8">
        <TabsTrigger value="statistics">Statistics</TabsTrigger>
        <TabsTrigger value="movements">Movements</TabsTrigger>
        <TabsTrigger value="evolution">Evolution</TabsTrigger>
      </TabsList>

      <TabsContent value="statistics">
        <PokemonStats stats={pokemon.stats} />
      </TabsContent>

      <TabsContent value="movements">
        <PokemonMoves moves={pokemon.moves} />
      </TabsContent>

      <TabsContent value="evolution">
        <PokemonEvolutionChain evolutionChain={pokemon.evolutionChain} />
      </TabsContent>
    </Tabs>
  );
};

export default React.memo(PokemonTabs);
