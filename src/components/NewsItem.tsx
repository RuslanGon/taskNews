import React from "react";
import { Article } from "../api/newsApi";
import styles from "../styles/NewsItem.module.css";
import { formatDate } from "../utils/formatDate";

interface Props {
  article: Article;
  onSelect: () => void;
}

export default function NewsItem({ article, onSelect }: Props) {
  return (
    <div className={styles.item} onClick={onSelect}>
      {article.image_url && (
        <img className={styles.thumb} src={article.image_url} alt={article.title} />
      )}
      <div>
        <h3>{article.title}</h3>
        <p className={styles.meta}>
          {article.source} • {formatDate(article.published_at)}
        </p>
        <p>{article.description}</p>
      </div>
    </div>
  );
}
