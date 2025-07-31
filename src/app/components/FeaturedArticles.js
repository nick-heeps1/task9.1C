'use client';

import ArticleCard from "./ArticleCard";

const articles = [
  {
    title: "The world of CPUs",
    description: "Understanding CPU architecture.",
    author: "John Doe",
    rating: '5/5',
    image: "/cpu.avif",
  },
  {
    title: "How to build a PC",
    description: "Learn the basics.",
    author: "Ash Smith",
    rating: '5/5',
    image: "/ComputerCase.png",
  },
  {
    title: "GPUs explained",
    description: "A deep dive into graphics processing units.",
    author: "Nick Blaze",
    rating: '5/5',
    image: "/RTX.jpg",
  },
];

export default function FeaturedArticles() {
  return (
    <section className="articles-section">
      <h2>Featured Articles</h2>
      <div className="articles-container">
        {articles.map((article, index) => (
          <ArticleCard
            key={index}
            title={article.title}
            description={article.description}
            author={article.author}
            rating={article.rating}
            image={article.image}
          />
        ))}
      </div>
      <button className="article-button">See all articles</button>
    </section>
  );
}