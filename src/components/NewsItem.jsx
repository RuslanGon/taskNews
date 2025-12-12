import React from "react";
import styles from "../styles/NewsItem.module.css";

export default function NewsItem({ article, onSelect }) {
  return (
    <div className={styles.item} onClick={onSelect}>
      {article.urlToImage && (
        <img className={styles.thumb} src={article.urlToImage} alt="" />
      )}

      <div>
        <h3 className={styles.title}>{article.title}</h3>
        <p className={styles.meta}>
          {article.source?.name} •{" "}
          {new Date(article.publishedAt).toLocaleString()}
        </p>
        <p className={styles.desc}>{article.description}</p>
      </div>
    </div>
  );
}
