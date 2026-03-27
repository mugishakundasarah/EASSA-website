import { useEffect, useState } from "react";

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

export function useEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://opensheet.elk.sh/1JeqQoN2V_WlLAZKREMOKZ_Toxq6AY1lBxeSY3vWtpuw/event")
      .then((res) => res.json())
      .then((data) => {
        setEvents(normalizeSheetRows(data));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return { events, loading };
}
