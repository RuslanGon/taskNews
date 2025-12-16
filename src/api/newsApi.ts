const BASE = "https://api.thenewsapi.com/v1/news";
const API_TOKEN = import.meta.env.VITE_NEWS_API_TOKEN;

export interface Article {
  uuid: string;
  title: string;
  description: string;
  content: string;
  image_url: string;
  published_at: string;
  source: string;
  url: string;
  categories: string[];
}

interface FetchArticlesParams {
  search?: string;
  categories?: string;
  signal?: AbortSignal;
}

// універсальна функція fetch
async function request(url: string, signal?: AbortSignal) {
  const res = await fetch(url, { signal });
  if (!res.ok) throw new Error("Не вдалося завантажити дані");
  return res.json();
}

// експортуємо fetchArticles
export async function fetchArticles({ search, categories, signal }: FetchArticlesParams) {
  const params = [
    `api_token=${API_TOKEN}`,
    "limit=30",
    "language=en",
    search ? `search=${encodeURIComponent(search)}` : null,
    categories ? `categories=${encodeURIComponent(categories)}` : null,
  ].filter(Boolean);

  const url = `${BASE}/all?${params.join("&")}`;
  return request(url, signal);
}
