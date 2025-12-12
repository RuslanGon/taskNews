import React from "react";
import styles from "../styles/NewsDetail.module.css";

export default function NewsDetail({ article, onBack }) {
  return (
    <div className={styles.detail}>
      <button className={styles.back} onClick={onBack}>
        ← Назад
      </button>
      <h2>{article.title}</h2>
      {article.image_url && (
        <img className={styles.image} src={article.image_url} alt={article.title} />
      )}
      <p className={styles.meta}>
        {article.source} • {new Date(article.published_at).toLocaleString()}
      </p>
      <p className={styles.text}>{article.content || article.description}</p>
      <a href={article.url} target="_blank" rel="noreferrer">
      Читати повністю →
      </a>
    </div>
  );
}
