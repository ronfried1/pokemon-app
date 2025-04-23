"use client";

import React from "react";
import { motion } from "framer-motion";
import { PokemonStat } from "@/types/details-pokemon";

interface PokemonStatsProps {
  stats: PokemonStat[];
}

const PokemonStats: React.FC<PokemonStatsProps> = ({ stats }) => {
  return (
    <div className="space-y-4">
      <h2 className="text-lg md:text-xl font-bold mb-4 text-foreground">
        Statistics
      </h2>
      <div className="space-y-4 md:space-y-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.stat.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
          >
            <div className="flex justify-between mb-1 md:mb-2">
              <span className="text-xs md:text-sm font-medium capitalize text-foreground/90">
                {stat.stat.name.replace(/-/g, " ")}
              </span>
              <span className="text-xs md:text-sm font-bold text-foreground">
                {stat.base_stat}
              </span>
            </div>
            <div className="relative h-2 md:h-3 w-full bg-muted rounded-full overflow-hidden">
              <motion.div
                className={`absolute top-0 left-0 h-full rounded-full ${
                  stat.base_stat < 50
                    ? "bg-gradient-to-r from-red-500 to-red-400"
                    : stat.base_stat < 90
                    ? "bg-gradient-to-r from-yellow-500 to-yellow-400"
                    : "bg-gradient-to-r from-green-500 to-green-400"
                }`}
                initial={{ width: 0 }}
                animate={{
                  width: `${(stat.base_stat / 255) * 100}%`,
                }}
                transition={{ duration: 1, delay: index * 0.1 }}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default React.memo(PokemonStats);
