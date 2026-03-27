/**
 * Build embeddable image URLs for Google Drive file links.
 * OpenSheet / Sheets often store "share" links; browsers load these most reliably
 * via drive.usercontent.google.com (direct image) rather than /file/d/... pages.
 */
export function extractFileId(url) {
  if (!url || typeof url !== "string") return null;
  const trimmed = url.trim();
  const match =
    trimmed.match(/\/d\/([a-zA-Z0-9_-]+)/) ||
    trimmed.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  if (match?.[1]) return match[1];
  if (/^[a-zA-Z0-9_-]+$/.test(trimmed)) return trimmed;
  return null;
}

export function getDriveImageUrls(url) {
  const fileId = extractFileId(url);
  if (!fileId) return [url.trim()];

  return [
    `https://drive.usercontent.google.com/download?id=${fileId}&export=view`,
    `https://drive.google.com/thumbnail?id=${fileId}&sz=w1000`,
    `https://drive.google.com/uc?export=view&id=${fileId}`,
    `https://drive.google.com/uc?export=download&id=${fileId}`,
    `https://corsproxy.io/?${encodeURIComponent(`https://drive.google.com/uc?export=view&id=${fileId}`)}`,
  ];
}
