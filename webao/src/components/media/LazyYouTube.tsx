'use client';

import { useState } from "react";

interface LazyYouTubeProps {
  videoId: string;
  title?: string;
}

export default function LazyYouTube({ videoId, title }: LazyYouTubeProps) {
  const [showIframe, setShowIframe] = useState(false);

  return (
    <div style={{ position: "relative", paddingBottom: "56.25%", height: 0 }}>
      {!showIframe ? (
        <button
          aria-label={`Assistir vídeo: ${title || videoId}`}
          style={{
            background: "none",
            border: "none",
            padding: 0,
            cursor: "pointer",
            position: "absolute",
            width: "100%",
            height: "100%",
          }}
          onClick={() => setShowIframe(true)}
        >
          <img
            src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
            alt={`Thumbnail do vídeo: ${title || videoId}`}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
          <span style={{
            position: "absolute", top: "50%", left: "50%",
            transform: "translate(-50%, -50%)", fontSize: 48, color: "#fff"
          }}>▶</span>
        </button>
      ) : (
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
          title={title || videoId}
          frameBorder="0"
          allow="autoplay; encrypted-media"
          allowFullScreen
          style={{
            position: "absolute", top: 0, left: 0, width: "100%", height: "100%"
          }}
        />
      )}
    </div>
  );
} 