import React from "react";
import styles from "../styles/NewsItem.module.css";

export default function NewsItem({ article, onSelect }) {
  return (
    <div className={styles.item} onClick={onSelect}>
      {article.image_url && (
        <img className={styles.thumb} src={article.image_url} alt={article.title} />
      )}

      <div className={styles.content}>
        <h3 className={styles.title}>{article.title}</h3>
        <p className={styles.meta}>
          {article.source} • {new Date(article.published_at).toLocaleString()}
        </p>
        <p className={styles.desc}>{article.description}</p>
      </div>
    </div>
  );
}
