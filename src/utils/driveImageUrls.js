/**
 * Build embeddable image URLs for Google Drive file links.
 * Order matters: drive.usercontent.google.com/download often shows as "(failed)" in DevTools
 * when used as <img src> (CORP / cross-origin rules), even though curl can get 200.
 * Thumbnail and drive.google.com/uc tend to work more reliably in production.
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
    `https://drive.google.com/thumbnail?id=${fileId}&sz=w1000`,
    `https://drive.google.com/uc?export=view&id=${fileId}`,
    `https://drive.google.com/uc?export=download&id=${fileId}`,
    `https://drive.usercontent.google.com/download?id=${fileId}&export=view`,
    `https://corsproxy.io/?${encodeURIComponent(`https://drive.google.com/uc?export=view&id=${fileId}`)}`,
  ];
}
