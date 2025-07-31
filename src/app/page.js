import BannerImage from './components/BannerImage';
import FeaturedArticles from './components/FeaturedArticles';
import FeaturedTutorials from './components/FeaturedTutorials';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import EmailSignup from './components/EmailSignup';

export default function Home() {
  return (
      <main> 
        <Navbar />
        <BannerImage />
        <FeaturedArticles />
        <FeaturedTutorials />
        <EmailSignup />
        <Footer />  
      </main>
  );
}
