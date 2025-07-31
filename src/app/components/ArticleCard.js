'use client';

export default function ArticleCard({ title, description, author, rating, image }) {
  return (
    <div className="article-card">
      <img src={image} alt={title} className="article-image" />
      <h3 className="article-title">{title}</h3>
      <p className="article-description">{description}</p>
      <p className="article-meta">{rating}  — <em>{author}</em></p>
    </div>
  );
}