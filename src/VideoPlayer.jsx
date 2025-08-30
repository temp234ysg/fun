// src/VideoPlayer.jsx
import { useEffect } from "react";

export default function VideoPlayer({ videoUrl }) {
  useEffect(() => {
    // Load Instagram embed script after component mounts
    const script = document.createElement("script");
    script.src = "https://www.instagram.com/embed.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div style={{ textAlign: "center", display: "flex", justifyContent: "center", flexDirection: "column", width: "100vw" }}>
      <h2>🎬 Enjoy the video!</h2>

      {/* Instagram Embed */}
      <blockquote
        className="instagram-media"
        data-instgrm-permalink="https://www.instagram.com/reel/DI5T57fSpX2/?utm_source=ig_embed&utm_campaign=loading"
        data-instgrm-version="14"
        style={{
          background: "#FFF",
          border: 0,
          borderRadius: "3px",
          boxShadow:
            "0 0 1px 0 rgba(0,0,0,0.5), 0 1px 10px 0 rgba(0,0,0,0.15)",
          margin: "1px auto",
          maxWidth: "540px",
          minWidth: "326px",
          padding: 0,
          width: "calc(100% - 2px)",
        }}
      >
        <a
          href="https://www.instagram.com/reel/DI5T57fSpX2/?utm_source=ig_embed&utm_campaign=loading"
          target="_blank"
          rel="noreferrer"
          style={{ textDecoration: "none", color: "#3897f0" }}
        >
          View this post on Instagram
        </a>
      </blockquote>
    </div>
  );
}
