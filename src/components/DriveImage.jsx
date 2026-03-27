import React from "react";
import { getDriveImageUrls } from "../utils/driveImageUrls";

/**
 * Tries several Google Drive URL shapes; OpenSheet "share" links often fail as raw img src.
 */
export default function DriveImage({ url, alt, className, onError }) {
  const [currentUrlIndex, setCurrentUrlIndex] = React.useState(0);
  const urls = getDriveImageUrls(url);
  const currentUrl = urls[currentUrlIndex];

  const handleError = (e) => {
    if (currentUrlIndex < urls.length - 1) {
      setCurrentUrlIndex((i) => i + 1);
    } else if (onError) {
      onError(e);
    }
  };

  if (!url) return null;

  return (
    <img
      key={currentUrl}
      src={currentUrl}
      alt={alt}
      className={className}
      loading="lazy"
      onError={handleError}
    />
  );
}
