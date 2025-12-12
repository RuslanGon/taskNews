import React, { useEffect, useState } from "react";
import styles from "./styles/App.module.css";
import SearchBar from "./components/SearchBar";
import NewsList from "./components/NewsList";
import NewsDetail from "./components/NewsDetail";
import { fetchTopHeadlines, fetchEverything } from "./services/newsApi";

const CATEGORIES = [
  "general",
  "business",
  "entertainment",
  "health",
  "science",
  "sports",
  "technology",
];

export default function App() {
  const [articles, setArticles] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [category, setCategory] = useState("general");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    loadNews(category);
  }, [category]);

  async function loadNews(cat) {
    setLoading(true);
    setError("");
    try {
      const data = await fetchTopHeadlines(cat);
      setArticles(data.articles || []);
    } catch (e) {
      setError("Помилка завантаження новин");
    } finally {
      setLoading(false);
    }
  }

  async function handleSearch(value) {
    if (!value) return loadNews(category);
    setLoading(true);
    setError("");
    try {
      const data = await fetchEverything(value);
      setArticles(data.articles || []);
    } catch (e) {
      setError("Помилка пошуку");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.app}>
      <h1>Новини світу</h1>

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
