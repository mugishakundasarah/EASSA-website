const OPEN_SHEET_BASE =
  "https://opensheet.elk.sh/1JeqQoN2V_WlLAZKREMOKZ_Toxq6AY1lBxeSY3vWtpuw";

/**
 * Fetches a tab from OpenSheet. Only the `raw` query param is allowed by the API; do not append ?_= etc.
 * Uses cache: "no-store" so the browser does not serve a stale response. Hooks also refetch on a timer / visibility.
 */
export function fetchOpenSheetTab(tab) {
  const url = `${OPEN_SHEET_BASE}/${tab}`;
  return fetch(url, { cache: "no-store" }).then((res) => {
    if (!res.ok) throw new Error(res.statusText);
    return res.json();
  });
}
