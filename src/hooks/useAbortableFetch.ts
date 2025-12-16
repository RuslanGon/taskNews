import { useRef, useState, useCallback } from "react";

export function useAbortableFetch<T>() {
  const controllerRef = useRef<AbortController | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(
    async (fetchFn: (signal: AbortSignal) => Promise<T>): Promise<T | null> => {
      controllerRef.current?.abort();
      const controller = new AbortController();
      controllerRef.current = controller;

      setLoading(true);
      setError(null);

      try {
        const result = await fetchFn(controller.signal);
        return result;
      } catch (e: any) {
        if (e.name === "AbortError") {
          return null;
        }
        setError(e.message || "Невідома помилка");
        return null;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return { fetchData, loading, error };
}
