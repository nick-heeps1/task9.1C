'use client';

import { useState } from 'react';
import { db } from '@/lib/firebase';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';

export default function QuestionForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!title.trim() || !description.trim()) {
      setError('Title and description are required.');
      return;
    }

    setSaving(true);
    try {
      const tagsArray = tags
        .split(',')
        .map(t => t.trim())
        .filter(Boolean)
        .slice(0, 3);

      await addDoc(collection(db, 'posts'), {
        type: 'question',
        title: title.trim(),
        description: description.trim(),
        tags: tagsArray,
        createdAt: serverTimestamp(),
      });

      setTitle('');
      setDescription('');
      setTags('');
      alert('Question submitted ✅');
    } catch (err) {
      console.error('submit question:', err);
      setError('Could not save question.');
    } finally {
      setSaving(false);
    }
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

      {error && <p className="fq-error">{error}</p>}

      <button type="submit" disabled={saving}>
        {saving ? 'Posting…' : 'Post'}
      </button>
    </form>
  );
}