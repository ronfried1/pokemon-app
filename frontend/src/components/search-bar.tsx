"use client";

import React, { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useDebounce } from "../hooks/use-debounce";

const DEBOUNCE_DELAY = 300;

interface SearchBarProps {
  onSearch?: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [inputValue, setInputValue] = useState("");

  const debouncedInput = useDebounce(inputValue, DEBOUNCE_DELAY);

  // Whenever debouncedInput changes, call onSearch
  React.useEffect(() => {
    if (onSearch) {
      onSearch(debouncedInput.trim());
    }
  }, [debouncedInput, onSearch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleClear = () => {
    setInputValue("");
    if (onSearch) {
      onSearch("");
    }
  };

  return (
    <div className="relative w-full">
      <Input
        type="text"
        placeholder="Search Pokémon by name..."
        value={inputValue}
        onChange={handleChange}
        className="pr-24 w-full"
        aria-label="Search Pokémon"
      />
      {inputValue && (
        <Button
          variant="ghost"
          size="sm"
          className="absolute right-2 top-1/2 -translate-y-1/2"
          onClick={handleClear}
          aria-label="Clear search"
        >
          Clear
        </Button>
      )}
    </div>
  );
};

export default React.memo(SearchBar);
