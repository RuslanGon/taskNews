export function formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleString("uk-UA", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  }
  