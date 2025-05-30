"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface PokemonCardSkeletonProps {
  index?: number;
}

export function PokemonCardSkeleton({ index = 0 }: PokemonCardSkeletonProps) {
  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate="visible"
      transition={{
        delay: Math.min(index * 0.05, 0.2),
        ease: "easeInOut",
        duration: 0.3,
      }}
      viewport={{ once: true }}
      className="max-w-sm rounded relative w-full"
    >
      <motion.div className="h-full perspective-1000">
        <motion.div className="h-full">
          <Card className="overflow-hidden h-full border-0 rounded-2xl shadow-lg bg-card dark:bg-card/50 backdrop-blur-sm transition-all duration-300">
            <div className="relative pt-6 px-6 bg-muted rounded-t-2xl">
              <div className="absolute top-3 right-3 z-10">
                <Skeleton className="h-9 w-9 rounded-full bg-white/50" />
              </div>
              <div className="flex justify-center items-center p-4 h-[180px]">
                <Skeleton className="h-[150px] w-[150px] rounded-full bg-white/30" />
              </div>
            </div>
            <div className="p-5">
              <div className="flex justify-between items-start mb-2">
                <Skeleton className="h-7 w-32 bg-muted" />
                <Skeleton className="h-6 w-10 rounded-full bg-muted" />
              </div>
              <div className="flex flex-wrap gap-2 mt-3">
                <Skeleton className="h-6 w-16 rounded-full bg-muted" />
                <Skeleton className="h-6 w-16 rounded-full bg-muted" />
              </div>
            </div>
          </Card>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
