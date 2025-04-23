import { motion } from "framer-motion";
import { Button } from "./ui/button";

interface GridMessageProps {
  title: string;
  description: string;
  buttonText: string;
  onButtonClick: () => void;
  errorMessage?: string;
}

export const GridMessage: React.FC<GridMessageProps> = ({
  title,
  description,
  buttonText,
  onButtonClick,
  errorMessage,
}) => {
  return (
    <motion.div
      className="text-center py-20 bg-card/80 backdrop-blur-sm rounded-xl shadow-md"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-bold mb-4 text-foreground">{title}</h2>
      <p className="text-muted-foreground mb-6">{description}</p>
      {errorMessage && (
        <p className="text-sm text-destructive mb-4">Error: {errorMessage}</p>
      )}
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Button
          onClick={onButtonClick}
          className="bg-primary hover:bg-primary/90 transition-all duration-300"
        >
          {buttonText}
        </Button>
      </motion.div>
    </motion.div>
  );
};
