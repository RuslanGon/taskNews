import React, { useState, useEffect } from "react";
import styles from "../styles/SearchBar.module.css";
import { useDebounce } from "../hooks/useDebounce";

interface Props {
  onSearch: (query: string) => void;
}

export default function SearchBar({ onSearch }: Props) {
  const [value, setValue] = useState("");
  const debouncedValue = useDebounce(value, 500);

  useEffect(() => {
    onSearch(debouncedValue.trim());
  }, [debouncedValue, onSearch]);

  return (
    <input
      className={styles.input}
      placeholder="Пошук новин..."
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}
