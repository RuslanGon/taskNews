import React, { useState, useEffect, useCallback } from "react";
import styles from "./styles/App.module.css";
import SearchBar from "./components/SearchBar";
import NewsList from "./components/NewsList";
import NewsDetail from "./components/NewsDetail";
import { fetchArticles, Article } from "./api/newsApi";

const CATEGORIES = ["general","business","entertainment","health","science","sports","technology"];

export default function App() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [category, setCategory] = useState("general");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadNews = useCallback((cat: string) => {
    const controller = new AbortController();
    setLoading(true);
    setError("");
    setSelectedArticle(null);

    fetchArticles({ categories: cat, signal: controller.signal })
      .then((data) => setArticles(data.data || []))
      .catch((e) => {
        if (e.name !== "AbortError") setError("Помилка завантаження новин");
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, []);

  useEffect(() => { loadNews(category); }, [category, loadNews]);

  const handleSearch = useCallback((q: string) => {
    const controller = new AbortController();
    setLoading(true);
    setError("");
    setSelectedArticle(null);

    fetchArticles({ search: q, signal: controller.signal })
      .then((data) => setArticles(data.data || []))
      .catch((e) => { if (e.name !== "AbortError") setError("Помилка пошуку"); })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, []);

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

      {!selectedArticle ? (
        <NewsList articles={articles} onSelect={setSelectedArticle} />
      ) : (
        <NewsDetail article={selectedArticle} onBack={() => setSelectedArticle(null)} />
      )}
    </div>
  );
}
