import React from "react";
import styles from "../styles/NewsDetail.module.css";

export default function NewsDetail({ article, onBack }) {
  return (
    <div className={styles.detail}>
      <button className={styles.back} onClick={onBack}>
        ← Назад
      </button>

      <h2>{article.title}</h2>

      {article.urlToImage && (
        <img className={styles.image} src={article.urlToImage} alt="" />
      )}

      <p className={styles.meta}>
        {article.source?.name} •{" "}
        {new Date(article.publishedAt).toLocaleString()}
      </p>

      <p className={styles.text}>{article.content || article.description}</p>

      <a href={article.url} target="_blank" rel="noreferrer">
        Читати повністю →
      </a>
    </div>
  );
}
