import React, { useState } from "react";
import styles from "../styles/SearchBar.module.css";

export default function SearchBar({ onSearch }) {
  const [value, setValue] = useState("");

  function submit(e) {
    e.preventDefault();
    onSearch(value.trim());
  }

  return (
    <form className={styles.form} onSubmit={submit}>
      <input
        className={styles.input}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Пошук новин..."
      />
      <button className={styles.btn}>Пошук</button>
    </form>
  );
}
