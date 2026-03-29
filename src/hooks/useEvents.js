import { useEffect, useState } from "react";
import { fetchOpenSheetTab } from "../utils/openSheetFetch";

/** OpenSheet mirrors Google Sheet column headers; keys often include trailing spaces. */
function normalizeSheetRows(rows) {
  if (!Array.isArray(rows)) return [];
  return rows.map((row) => {
    if (!row || typeof row !== "object") return row;
    return Object.fromEntries(
      Object.entries(row).map(([k, v]) => [
        k.trim(),
        typeof v === "string" ? v.trim() : v,
      ])
    );
  });
}

const REFETCH_MS = 5 * 60 * 1000;

export function useEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const load = () => {
      fetchOpenSheetTab("event")
        .then((data) => {
          if (!cancelled) {
            setEvents(normalizeSheetRows(data));
            setLoading(false);
          }
        })
        .catch(() => {
          if (!cancelled) setLoading(false);
        });
    };

    load();
    const interval = setInterval(load, REFETCH_MS);
    const onVisible = () => {
      if (document.visibilityState === "visible") load();
    };
    document.addEventListener("visibilitychange", onVisible);

    return () => {
      cancelled = true;
      clearInterval(interval);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, []);

  return { events, loading };
}
