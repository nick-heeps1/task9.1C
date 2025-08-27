'use client';

import {useState} from 'react';
import Navbar from '../components/Navbar'; 
import Footer from '../components/Footer';
import QuestionForm from '../components/QuestionForm';
import ArticleForm from '../components/ArticleForm';

export default function PostPage() {
    const [postType, setPostType] = useState('question'); 

    return (
        <main> 
            <Navbar />

            <div className="post-container">
            <div className="post-card">
          <h1>New Post</h1>

          <div className="post-type-selector">
            <label>
              <input
                type="radio"
                name="postType"
                value="question"
                checked={postType === 'question'}
                onChange={() => setPostType('question')}
              />
              Question
            </label>

            <label>
              <input
                type="radio"
                name="postType"
                value="article"
                checked={postType === 'article'}
                onChange={() => setPostType('article')}
              />
              Article
            </label>
          </div>

          <p className="info-text">
            This section is designed based on the type of the post.
          </p>

          {postType === 'question' ? <QuestionForm /> : <ArticleForm />}
        </div>
      </div>

      <Footer />
    </main>
  );
}
