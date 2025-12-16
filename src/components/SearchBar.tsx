import React, { useState, useEffect, useMemo } from "react";
import styles from "../styles/SearchBar.module.css";
import { useDebounce } from "../hooks/useDebounce";

interface Props {
  onSearch: (query: string) => void;
}

export default function SearchBar({ onSearch }: Props) {
  const [value, setValue] = useState("");

  const debouncedValue = useDebounce(value, 500);

  const trimmedValue = useMemo(() => debouncedValue.trim(), [debouncedValue]);

  useEffect(() => {
    onSearch(trimmedValue);
  }, [trimmedValue, onSearch]);

  const handleSearchClick = () => {
    onSearch(value.trim());
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearchClick();
    }
  };

  return (
    <div className={styles.searchWrapper}>
      <input
        className={styles.input}
        placeholder="Пошук новин..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyPress={handleKeyPress}
      />
      <button className={styles.searchBtn} onClick={handleSearchClick}>
        🔍
      </button>
    </div>
  );
}
