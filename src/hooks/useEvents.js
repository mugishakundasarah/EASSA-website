import { useEffect, useState } from "react";

export function useEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://opensheet.elk.sh/1JeqQoN2V_WlLAZKREMOKZ_Toxq6AY1lBxeSY3vWtpuw/event")
      .then(res => res.json())
      .then(data => {
        setEvents(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return { events, loading };
}
