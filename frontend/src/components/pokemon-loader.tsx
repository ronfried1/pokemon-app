import { motion } from "framer-motion";

export function PokemonLoader() {
  return (
    <div className="flex justify-center items-center py-10">
      <motion.div
        className="relative w-16 h-16 rounded-full border-[3px] border-black shadow-inner bg-gradient-to-b from-gray-100 to-white overflow-hidden"
        animate={{
          rotate: [0, 360],
        }}
        transition={{
          repeat: Infinity,
          duration: 1.2,
          ease: "linear",
        }}
      >
        <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-red-600 to-red-500 border-b-[2px] border-black rounded-t-full" />

        <motion.div
          className="absolute top-1/2 left-1/2 w-6 h-6 rounded-full bg-gradient-to-b from-white to-gray-300 border-[2px] border-black transform -translate-x-1/2 -translate-y-1/2 shadow-md"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [1, 0.8, 1],
          }}
          transition={{
            repeat: Infinity,
            duration: 1.2,
            ease: "easeInOut",
          }}
        />
      </motion.div>
    </div>
  );
}
