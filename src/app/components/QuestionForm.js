'use client';
import { useState } from 'react';

export default function QuestionForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ title, description, tags });
    alert('Question submitted (not yet saved to DB)');
  };

  return (
    <form onSubmit={handleSubmit} className="post-form">
      <input
        type="text"
        placeholder="Start your question with how, what, why, etc."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <textarea
        placeholder="Describe your problem"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />

      <input
        type="text"
        placeholder="Please add up to 3 tags (e.g., Java)"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
      />

      <button type="submit">Post</button>
    </form>
  );
}