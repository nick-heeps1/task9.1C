'use client';
import TutorialCard from './TutorialCard';

const tutorials = [
  {
    title: "$50 vs $50K Computer",
    author: "Linus Tech Tips",
    rating: '5/5',
    videoUrl: "https://youtu.be/m7WYT2bgTlo?si=oPpmxRSYk87qTPEC",
  },
  {
    title: "How to build a PC",
    author: "Tech Source",
    rating: '4.7/5',
    videoUrl: "https://youtu.be/PXaLc9AYIcg?si=44GYDH04JO8f5Mj6",
  },
  {
    title: "Computer Components for Dummies",
    author: "JayzTwoCents",
    rating: '4.8/5',
    videoUrl: "https://youtu.be/cZs6kh0WFRY?si=gTPC_s-R7lbg7nIM",
  },
];

export default function FeaturedTutorials() {
  return (
    <section className="featured-tutorials">
      <h2>Featured Tutorials</h2>
      <div className="tutorials-grid">
        {tutorials.map((tutorial, index) => (
          <TutorialCard
            key={index}
            title={tutorial.title}
            author={tutorial.author}
            rating={tutorial.rating}
            videoUrl={tutorial.videoUrl}
          />
        ))}
      </div>
    <button className="article-button">See all Tutorials</button>
    </section>
  );
}