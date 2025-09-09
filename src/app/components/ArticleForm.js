'use client';

import { useState } from "react";
import { db, storage } from "@/lib/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";



export default function ArticleForm() {
    const [title, setTitle] = useState('');
    const [abstract, setAbstract] = useState('');
    const [content, setContent] = useState('');
    const [tags, setTags] = useState('');

    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title.trim() || !abstract.trim() || !content.trim()) {
            setError("All fields are required.");
            return;
        }

        setLoading(true);
      try {
            await addDoc(collection(db, "posts"), {
                type: "article",
                title,
                abstract,
                content,
                tags,
                imageUrl: imageUrl || null,
                createdAt: serverTimestamp(),
            });

            setTitle(""); setAbstract(""); setContent(""); setTags("");
            setFile(null); setPreview(""); setImageUrl("");
            setError("");
            alert('Article submitted successfully!');
        } catch (err) {
            console.error(err);
            console.error(err.code, err.message);
            setError("Could not save article.");
        } finally {
            setLoading(false);
        }
    };

    const handleChoose = (e) => {
        const f = e.target.files?.[0];
        if (f) {
            setFile(f);
            setPreview(URL.createObjectURL(f));
        }
    };

    const handleUpload = async () => {
  if (!file) return;
  setLoading(true);
  setError("");

  try {
    const path = `articles/${Date.now()}-${file.name}`;
    const storageRef = ref(storage, path);
    const snap = await uploadBytes(storageRef, file);
    
    console.log("UPLOAD OK:", snap.metadata.fullPath);
    const url = await getDownloadURL(storageRef);
    console.log("DOWNLOAD URL:", url);
    setImageUrl(url);
    alert("Image uploaded ✅");
  } catch (err) {
    console.error("UPLOAD ERR:", err.code, err.message);
    setError(err.message || "Image upload failed.");
  } finally {
    setLoading(false);
  }
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

            <fieldset style={{ border: "1px solid #ddd", padding: 12, marginTop: 12 }}>
                <legend>Upload Image</legend>
                <input type="file" accept="image/*" onChange={handleChoose} />
                {preview && (
                    <div style={{ marginTop: 8 }}>
                        <img src={preview} alt="preview" style={{ maxWidth: "100%" }} />
                    </div>
                )}
                <button
                    type="button"
                    onClick={handleUpload}
                    disabled={!file || loading}
                >
                    {loading ? "Uploading…" : "Upload"}
                </button>
                {imageUrl && <p>✔ Image uploaded and ready</p>}
            </fieldset>

            {error && <p style={{ color: "crimson" }}>{error}</p>}

            <button type="submit" disabled={loading}>Submit Article</button>
        </form>
    );
}