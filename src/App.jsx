import React, { useEffect, useState } from "react";
import styles from "./styles/App.module.css";
import SearchBar from "./components/SearchBar";
import NewsList from "./components/NewsList";
import NewsDetail from "./components/NewsDetail";
import { fetchArticles } from "./services/newsApi";

// категории для фильтрации
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

  // загрузка новостей при смене категории
  useEffect(() => {
    loadNews(category);
  }, [category]);

  async function loadNews(cat) {
    setLoading(true);
    setError("");
    setSelectedArticle(null);
    try {
      const data = await fetchArticles({ categories: cat });
      setArticles(data.data || []);
    } catch (e) {
      setError("Ошибка загрузки новостей");
    } finally {
      setLoading(false);
    }
  }

  async function handleSearch(query) {
    if (!query) return loadNews(category);
    setLoading(true);
    setError("");
    setSelectedArticle(null);
    try {
      const data = await fetchArticles({ search: query });
      setArticles(data.data || []);
    } catch (e) {
      setError("Ошибка поиска новостей");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.app}>
      <h1>Новости мира</h1>

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

      {loading && <p className={styles.loading}>Загрузка...</p>}
      {error && <p className={styles.error}>{error}</p>}

      {!selectedArticle ? (
        <NewsList articles={articles} onSelect={setSelectedArticle} />
      ) : (
        <NewsDetail article={selectedArticle} onBack={() => setSelectedArticle(null)} />
      )}
    </div>
  );
}
