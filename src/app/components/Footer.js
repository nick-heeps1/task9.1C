'use client';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-column">
          <h4>Explore</h4>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="#">Questions</a></li>
            <li><a href="/ArticleCard">Articles</a></li>
            <li><a href="#">Tutorials</a></li>
          </ul>
        </div>

        <div className="footer-column">
          <h4>Support</h4>
          <ul>
            <li><a href="#">FAQs</a></li>
            <li><a href="#">Help</a></li>
            <li><a href="#">Contact Us</a></li>
          </ul>
        </div>

        <div className="footer-column">
          <h4>Stay connected</h4>
          <div className="social-icons">
            <a href="#"><img src="/facebook.png" alt="Facebook" /></a>
            <a href="#"><img src="/twitter.png" alt="Twitter" /></a>
            <a href="#"><img src="/instagram.png" alt="Instagram" /></a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>DEV@Deakin 2025</p>
        <div className="footer-links">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms</a>
          <a href="#">Code of Conduct</a>
        </div>
      </div>
    </footer>
  );
}
            