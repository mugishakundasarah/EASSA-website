import { useEffect, useState } from "react";

export function useTeams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://opensheet.elk.sh/1JeqQoN2V_WlLAZKREMOKZ_Toxq6AY1lBxeSY3vWtpuw/team")
      .then(res => res.json())
      .then(data => {
        setTeams(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return { teams, loading };
}
