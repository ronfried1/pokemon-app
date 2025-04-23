import React from "react";
import { Link } from "react-router-dom";
import { ModeToggle } from "./mode-toggle";

const NavBar: React.FC = () => {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center">
          <Link
            to="/"
            onClick={() => window.location.reload()}
            className="mr-6 text-xl font-bold text-foreground hover:opacity-80 transition-opacity"
          >
            Pokémon Manager
          </Link>
        </div>

        <div className="flex items-center space-x-2">
          <ModeToggle />
        </div>
      </div>
    </header>
  );
};

export default NavBar;
