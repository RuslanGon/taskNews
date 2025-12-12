const API_KEY = "ВАШ_API_КЛЮЧ_ТУТ";  // вставь сюда свой ключ
const BASE = "https://newsapi.org/v2";

async function request(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error("API error");
  return res.json();
}

export function fetchTopHeadlines(category = "general") {
  return request(
    `${BASE}/top-headlines?country=us&category=${category}&pageSize=20&apiKey=${API_KEY}`
  );
}

export function fetchEverything(query) {
  return request(
    `${BASE}/everything?q=${query}&sortBy=publishedAt&pageSize=20&language=en&apiKey=${API_KEY}`
  );
}
