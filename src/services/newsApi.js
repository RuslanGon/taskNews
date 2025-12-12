const API_TOKEN = "IjFkvDrveOnmzzIZSeK8L8DZK25hZ90OAUQMAEfo";
const BASE = "https://api.thenewsapi.com/v1/news";

// загальний запит
async function request(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error("Неможливо завантажити дані");
  return res.json();
}

// отримати новини за ключовим словом або категорією
export function fetchArticles({ search, categories }) {
  let url = `${BASE}/all?api_token=${API_TOKEN}&limit=30&language=en`;

  if (search) {
    url += `&search=${encodeURIComponent(search)}`;
  }
  
  if (categories) {
    url += `&categories=${encodeURIComponent(categories)}`;
  }

  return request(url);
}
