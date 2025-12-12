import React from "react";
import NewsItem from "./NewsItem";
import styles from "../styles/NewsList.module.css";

export default function NewsList({ articles, onSelect }) {
  if (!articles.length) return <p>Нічого не знайдено</p>;

  return (
    <div className={styles.list}>
      {articles.map((a, i) => (
        <NewsItem key={i} article={a} onSelect={() => onSelect(a)} />
      ))}
    </div>
  );
}
