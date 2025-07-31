'use client';

export default function TutorialCard({ title, author, rating, videoUrl }) {
  return (
    <div className="tutorial-card">
        <a href={videoUrl} target="_blank" rel="noopener noreferrer" className="tutorial-link">
            <img
                src={`https://img.youtube.com/vi/${getYouTubeID(videoUrl)}/hqdefault.jpg`}
                alt={title}
                className="tutorial-image"
            />
            
        </a>
        <h3>{title}</h3>
        <p>{rating}  <em>{author}</em></p>
    </div>
  );
} 

function getYouTubeID(url) {
  try {
    const urlObj = new URL(url);

    if (urlObj.hostname === "youtu.be") {
      return urlObj.pathname.slice(1);
    }

    if (urlObj.searchParams.has("v")) {
      return urlObj.searchParams.get("v");
    }

    const match = url.match(/embed\/([^?&]+)/);
    if (match) return match[1];

    return ""; 
  } catch {
    return "";
  }
}
