'use client';

import { useState } from "react";

export default function ArticleForm() {
    const [title, setTitle] = useState('');
    const [abstract, setAbstract] = useState('');
    const [content, setContent] = useState('');
    const [tags, setTags] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log ({ title, abstract, content, tags });
        alert('Article submitted successfully! (not yet saved to database)');
    };

    return (
        <form onSubmit={handleSubmit} className="post-form">
            <input
                type="text"
                placeholder="Enter a descriptive title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />

            <textarea
                placeholder="Enter a 1-paragraph abstract"
                value={abstract}
                onChange={(e) => setAbstract(e.target.value)}
                required
            />

            <textarea
                placeholder="Enter the article text"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
            />

            <input
                type="text"
                placeholder="please add up to 3 tags (e.g., Java)"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
            />
            <button type="submit">Submit Article</button>
        </form>
    );
}