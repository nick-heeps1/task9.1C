'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import ReactMarkdown from 'react-markdown';
import { db } from '@/lib/firebase';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';

const Controlled = dynamic(
  async () => {
    const mod = await import('react-codemirror2');
    await import('codemirror/mode/javascript/javascript');
    await import('codemirror/mode/markdown/markdown');
    return mod.Controlled;
  },
  {
    ssr: false,
    loading: () => (
      <div className="editor-loading">Loading editor…</div>
    ),
  }
);

export default function QuestionForm() {
  const [title, setTitle] = useState('');
  const [descriptionMarkdown, setDescriptionMarkdown] = useState('');
  const [tags, setTags] = useState('');
  const [code, setCode] = useState(
    `// paste a minimal reproducible example\nconsole.log("hello DEV@Deakin");`
  );
  const [language, setLanguage] = useState('javascript');
  const [showPreview, setShowPreview] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!title.trim() || !descriptionMarkdown.trim()) {
      setError('Title and description are required.');
      return;
    }

    setSaving(true);
    try {
      const tagsArray = tags
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean)
        .slice(0, 3);

      await addDoc(collection(db, 'posts'), {
        type: 'question',
        title: title.trim(),
        description: descriptionMarkdown.trim(),
        descriptionMarkdown: descriptionMarkdown.trim(),
        code: code,
        language: language,
        tags: tagsArray,
        createdAt: serverTimestamp(),
      });

      setTitle('');
      setDescriptionMarkdown('');
      setTags('');
      setCode('');
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

      <div className="preview-toggle">
        <button
          type="button"
          className="btnGhost"
          onClick={() => setShowPreview((v) => !v)}
        >
          {showPreview ? 'Hide Preview' : 'Show Preview'}
        </button>
      </div>

      <div className="editor-section">
        <div className="editor-container">
          <Controlled
            value={code}
            options={{
              mode: language,
              theme: 'neat',
              lineNumbers: true,
              autofocus: true,
              viewportMargin: Infinity,
            }}
            onBeforeChange={(_ed, _d, value) => setCode(value)}
          />
        </div>

        {showPreview && (
          <div className="preview">
            <h3>Live Preview</h3>
            <ReactMarkdown>{descriptionMarkdown}</ReactMarkdown>
            {code && (
              <>
                <h4>Code</h4>
                <pre className="codeBlock">
                  <code>{code}</code>
                </pre>
              </>
            )}
          </div>
        )}
      </div>

      <input
        type="text"
        placeholder="Please add up to 3 tags (e.g., Java)"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
      />

      {error && <p className="fq-error">{error}</p>}

      <button className="btn" type="submit" disabled={saving}>
        {saving ? 'Posting…' : 'Post'}
      </button>
    </form>
  );
}
