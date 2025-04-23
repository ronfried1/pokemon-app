"use client";

import React from "react";
import { motion } from "framer-motion";
import { PokemonMove } from "@/types/details-pokemon";
import { Badge } from "@/components/ui/badge";

interface PokemonMovesProps {
  moves: PokemonMove[];
}

const PokemonMoves: React.FC<PokemonMovesProps> = ({ moves }) => {
  return (
    <div>
      <h2 className="text-lg md:text-xl font-bold mb-4 text-foreground">
        Movements
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-3">
        {moves.slice(0, 20).map((move, index) => (
          <motion.div
            key={move.move.name}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05, duration: 0.3 }}
          >
            <Badge
              variant="outline"
              className="justify-start py-2 px-3 capitalize w-full text-left bg-secondary/50 hover:bg-secondary transition-colors duration-200"
            >
              {move.move.name.replace(/-/g, " ")}
            </Badge>
          </motion.div>
        ))}
      </div>

      <p className="text-sm text-muted-foreground mt-4 text-center">
        Showing {moves.length < 20 ? moves.length : 20} of {moves.length} moves
      </p>
    </div>
  );
};

export default React.memo(PokemonMoves);
