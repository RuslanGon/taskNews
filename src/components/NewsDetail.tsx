import React from "react";
import { Article } from "../api/newsApi";
import styles from "../styles/NewsDetail.module.css";
import { formatDate } from "../utils/formatDate";

interface Props {
  article: Article;
  onBack: () => void;
}

export default function NewsDetail({ article, onBack }: Props) {
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
        {article.source} • {formatDate(article.published_at)}
      </p>
      <p>{article.content || article.description}</p>
      <a href={article.url} target="_blank" rel="noreferrer">
        Читати повністю →
      </a>
    </div>
  );
}
