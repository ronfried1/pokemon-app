"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Heart, ArrowLeft, ArrowRight } from "lucide-react";
import { useState, useMemo } from "react";
import { typeColors } from "@/lib/utils";

interface PokemonImagesProps {
  sprites: {
    front_artwork?: string;
    front?: string;
    back?: string;
    front_shiny?: string;
    back_shiny?: string;
  };
  name: string;
  types: string[];
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

export default function PokemonImages({
  sprites,
  name,
  types,
  isFavorite,
  onToggleFavorite,
}: PokemonImagesProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const images = useMemo(() => {
    return [
      sprites.front_artwork,
      sprites.front,
      sprites.back,
      sprites.front_shiny,
      sprites.back_shiny,
    ].filter(Boolean);
  }, [sprites]);

  const mainType = types?.[0] || "normal";
  const gradientClass =
    typeColors[mainType] || "bg-gradient-to-r from-gray-400 to-gray-500";

  const nextImage = () => {
    setActiveImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setActiveImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const imageVariants = {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
    exit: { opacity: 0, scale: 0.8, transition: { duration: 0.3 } },
  };

  return (
    <div
      className={`relative ${gradientClass} p-4 md:p-8 flex justify-center items-center min-h-[250px] md:min-h-[350px]`}
    >
      <motion.button
        onClick={onToggleFavorite}
        className="absolute bottom-4 right-4 sm:top-4 sm:right-4 sm:bottom-auto z-10 p-2 rounded-full bg-background/80 hover:bg-background shadow-md"
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.8 }}
      >
        <Heart
          className={`h-5 w-5 transition-colors duration-300 ${
            isFavorite
              ? "fill-destructive text-destructive"
              : "text-muted-foreground"
          }`}
        />
      </motion.button>

      {images.length > 1 && (
        <>
          <motion.button
            onClick={prevImage}
            className="absolute left-4 z-10 p-2 rounded-full bg-background/80 hover:bg-background shadow-md"
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.8 }}
          >
            <ArrowLeft className="h-5 w-5 text-foreground" />
          </motion.button>

          <motion.button
            onClick={nextImage}
            className="absolute right-4 z-10 p-2 rounded-full bg-background/80 hover:bg-background shadow-md"
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.8 }}
          >
            <ArrowRight className="h-5 w-5 text-foreground" />
          </motion.button>
        </>
      )}

      <AnimatePresence mode="wait">
        <motion.div
          key={activeImageIndex}
          variants={imageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="flex justify-center"
        >
          <motion.div
            animate={{ y: [0, -10, 0], rotate: [0, 2, 0, -2, 0] }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              duration: 5,
              ease: "easeInOut",
            }}
          >
            <img
              src={
                images[activeImageIndex] ||
                "/placeholder.svg?height=200&width=200"
              }
              width={200}
              height={200}
              className="object-contain w-[180px] h-[180px] md:w-[250px] md:h-[250px]"
              alt={name}
            />
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
