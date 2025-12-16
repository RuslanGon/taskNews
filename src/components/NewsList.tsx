import React, { useCallback } from "react";
import { Article } from "../api/newsApi";
import NewsItem from "./NewsItem";

interface Props {
  articles: Article[];
  onSelect: (article: Article) => void;
}

export default function NewsList({ articles, onSelect }: Props) {
  const handleSelect = useCallback((article: Article) => {
    onSelect(article);
  }, [onSelect]);

  if (!articles.length) return <p>Нічого не знайдено</p>;

  return (
    <div className="news-list">
      {articles.map((article) => (
        <NewsItem
          key={article.uuid}
          article={article}
          onSelect={() => handleSelect(article)}
        />
      ))}
    </div>
  );
}
