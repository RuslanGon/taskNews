// src/App.tsx
import React, { useState, useEffect, useCallback } from "react";
import styles from "./styles/App.module.css";
import SearchBar from "./components/SearchBar";
import NewsList from "./components/NewsList";
import NewsDetail from "./components/NewsDetail";
import { fetchArticles, Article } from "./api/newsApi";
import { useAbortableFetch } from "./hooks/useAbortableFetch";

const CATEGORIES = ["general", "business", "entertainment", "health", "science", "sports", "technology"];

export default function App() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [category, setCategory] = useState("general");

  const { fetchData, loading, error } = useAbortableFetch<{ data: Article[] }>();

  const loadArticles = useCallback(
    (params: { search?: string; categories?: string }) => {
      fetchData((signal) => fetchArticles({ ...params, signal }))
        .then((res) => {
          if (res) setArticles(res.data || []);
        });
    },
    [fetchData]
  );

  useEffect(() => {
    loadArticles({ categories: category });
  }, [category, loadArticles]);

  const handleSearch = useCallback((query: string) => {
    loadArticles({ search: query });
  }, [loadArticles]);

  return (
    <div className={styles.app}>
      <h1 className={styles.mainText}>Новини світу</h1>

      <SearchBar onSearch={handleSearch} />

      <div className={styles.categories}>
        {CATEGORIES.map((c) => (
          <button
            key={c}
            className={c === category ? styles.activeBtn : styles.catBtn}
            onClick={() => setCategory(c)}
          >
            {c}
          </button>
        ))}
      </div>

      {loading && <p className={styles.loading}>Завантаження...</p>}
      {error && <p className={styles.error}>{error}</p>}

      {selectedArticle ? (
        <NewsDetail article={selectedArticle} onBack={() => setSelectedArticle(null)} />
      ) : (
        <NewsList articles={articles} onSelect={setSelectedArticle} />
      )}
    </div>
  );
}
