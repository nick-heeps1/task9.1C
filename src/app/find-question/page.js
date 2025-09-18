"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { db } from "@/lib/firebase";
import {
  collection, query, where, orderBy, onSnapshot,
  addDoc, serverTimestamp
} from "firebase/firestore";
import QuestionCard from "@/components/QuestionCard";

import Navbar from '../components/Navbar'; 
import Footer from '../components/Footer';

export default function FindQuestionPage() {
  const [titleFilter, setTitleFilter] = useState("");
  const [tagFilter, setTagFilter] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const [appliedTitle, setAppliedTitle] = useState("");
  const [appliedTag, setAppliedTag] = useState("");
  const [appliedFrom, setAppliedFrom] = useState("");
  const [appliedTo, setAppliedTo] = useState("");

  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState(null);
  const [hiddenIds, setHiddenIds] = useState(new Set());
  const [hasSearched, setHasSearched] = useState(false);
  const [showResults, setShowResults] = useState(true);

  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [newTags, setNewTags] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [showTagSuggestions, setShowTagSuggestions] = useState(false);

  useEffect(() => {
    const ref = collection(db, "posts");
    const q = query(ref, where("type", "==", "question"), orderBy("createdAt", "desc"));
    const unsub = onSnapshot(q, (snap) => {
      setQuestions(snap.docs.map(d => ({ id: d.id, ...d.data() })));
      setLoading(false);
    }, () => setLoading(false));
    return () => unsub();
  }, []);

  const allTags = useMemo(() => {
    const s = new Set();
    for (const q of questions) {
      const arr = Array.isArray(q.tags) ? q.tags : (q.tags ? q.tags.split(",") : []);
      for (const t of arr) {
        const v = String(t).trim();
        if (v) s.add(v);
      }
    }
    return Array.from(s).sort();
  }, [questions]);

  const tagSuggestions = useMemo(() => {
    const q = tagFilter.trim().toLowerCase();
    if (!q) return [];
    return allTags.filter(t => t.toLowerCase().includes(q));
  }, [allTags, tagFilter]);

  const filtered = useMemo(() => {
    const term = appliedTitle.trim().toLowerCase();
    const tag = appliedTag.trim().toLowerCase();
    const fromMs = appliedFrom ? new Date(appliedFrom).setHours(0,0,0,0) : null;
    const toMs   = appliedTo   ? new Date(appliedTo).setHours(23,59,59,999) : null;

    return questions
      .filter(q => !hiddenIds.has(q.id))
      .filter(q => {
        if (term && !String(q.title || "").toLowerCase().includes(term)) return false;

        if (tag) {
          const tags = Array.isArray(q.tags) ? q.tags : (q.tags ? q.tags.split(",") : []);
          const tagsLower = tags.map(t => String(t).trim().toLowerCase());
          if (!tagsLower.includes(tag)) return false;
        }

        if (fromMs || toMs) {
          const ts = q.createdAt?.toDate ? q.createdAt.toDate().getTime() : null;
          if (!ts) return false;
          if (fromMs && ts < fromMs) return false;
          if (toMs && ts > toMs) return false;
        }
        return true;
      });
  }, [questions, hiddenIds, appliedTitle, appliedTag, appliedFrom, appliedTo]);

  const hasVisible = filtered.length > 0;
  const hasHidden  = hiddenIds.size > 0;
  const hiddenCount = hiddenIds.size;

  const runSearch = () => {
    setAppliedTitle(titleFilter);
    setAppliedTag(tagFilter);
    setAppliedFrom(fromDate);
    setAppliedTo(toDate);
    setHasSearched(true);
    setShowResults(true);
    setShowTagSuggestions(false);
  };

  const clearFilters = () => {
    setTitleFilter(""); setTagFilter(""); setFromDate(""); setToDate("");
    setAppliedTitle(""); setAppliedTag(""); setAppliedFrom(""); setAppliedTo("");
    setHasSearched(false);
    setShowResults(true);
    setHiddenIds(new Set());
    setShowTagSuggestions(false);
  };

  const addQuestion = async (e) => {
    e.preventDefault();
    setError("");
    if (!newTitle.trim() || !newDesc.trim()) {
      setError("Title and description are required.");
      return;
    }
    setSaving(true);
    try {
      const tagsArray = newTags
        .split(",")
        .map(t => t.trim())
        .filter(Boolean)
        .slice(0, 3);

      await addDoc(collection(db, "posts"), {
        type: "question",
        title: newTitle.trim(),
        description: newDesc.trim(),
        tags: tagsArray,
        createdAt: serverTimestamp(),
      });

      setNewTitle(""); setNewDesc(""); setNewTags("");
    } catch {
      setError("Could not add question.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <main>
      <Navbar />
      <div  className="fq-container"> 
      <div className="fq-header">
        <div className="fq-header-left">
          <Link href="/"><button className="fq-btn fq-btn-ghost">← Back</button></Link>
          <h1 className="fq-title">Find Question</h1>
        </div>

        {hasSearched && (hasVisible || hasHidden) && (
          <div className="fq-header-actions">
            <button
              className="fq-btn fq-btn-ghost"
              type="button"
              onClick={() => setShowResults(v => !v)}
            >
              {showResults ? "Hide Questions" : "Show Questions"}
            </button>
            {hasHidden && (
              <button
                className="fq-btn fq-btn-ghost"
                type="button"
                onClick={() => { setHiddenIds(new Set()); setShowResults(true); }}
              >
                Unhide Questions{hiddenCount ? ` (${hiddenCount})` : ""}
              </button>
            )}
          </div>
        )}
      </div>


      <section className="fq-section">
        <h3 className="fq-section-title">Filter</h3>
        <div className="fq-filter-grid">
          <input
            className="fq-input"
            placeholder="Search by title..."
            value={titleFilter}
            onChange={(e) => setTitleFilter(e.target.value)}
          />

          <div className="fq-typeahead">
            <input
              className="fq-input"
              placeholder="Tag (type to search)"
              value={tagFilter}
              onChange={(e) => {
                const v = e.target.value;
                setTagFilter(v);
                setShowTagSuggestions(v.trim().length > 0);
              }}
              onFocus={(e) => {
                const v = e.currentTarget.value;
                if (v.trim().length > 0) setShowTagSuggestions(true);
              }}
              onBlur={() => setTimeout(() => setShowTagSuggestions(false), 150)}
            />
            {showTagSuggestions && tagFilter.trim() && tagSuggestions.length > 0 && (
              <ul className="fq-typeahead-list">
                {tagSuggestions.map((t) => (
                  <li key={t}>
                    <button
                      type="button"
                      className="fq-typeahead-item"
                      onMouseDown={(e) => {
                        e.preventDefault();
                        setTagFilter(t.toLowerCase());
                        setShowTagSuggestions(false);
                      }}
                    >
                      {t}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <input className="fq-input" type="date" value={fromDate} onChange={(e)=>setFromDate(e.target.value)} />
          <input className="fq-input" type="date" value={toDate} onChange={(e)=>setToDate(e.target.value)} />
          <button className="fq-btn fq-btn-ghost" type="button" onClick={clearFilters}>Clear</button>
          <button className="fq-btn fq-btn-primary" type="button" onClick={runSearch}>Search</button>
        </div>
      </section>


      <section className="fq-section">
        <h3 className="fq-section-title">Add a Question</h3>
        <form className="fq-add-form" onSubmit={addQuestion}>
          <input
            className="fq-input"
            placeholder="Title"
            value={newTitle}
            onChange={(e)=>setNewTitle(e.target.value)}
            required
          />
          <textarea
            className="fq-textarea"
            placeholder="Describe your problem…"
            rows={4}
            value={newDesc}
            onChange={(e)=>setNewDesc(e.target.value)}
            required
          />
          <input
            className="fq-input"
            placeholder="Tags (comma separated, up to 3)"
            value={newTags}
            onChange={(e)=>setNewTags(e.target.value)}
          />
          {error && <p className="fq-error">{error}</p>}
          <div className="fq-actions">
            <button className="fq-btn fq-btn-primary" type="submit" disabled={saving}>
              {saving ? "Adding…" : "Add Question"}
            </button>
          </div>
        </form>
      </section>

      {hasSearched ? (
        showResults ? (
          loading ? (
            <p className="fq-muted">Loading…</p>
          ) : filtered.length > 0 ? (
            filtered.map(q => (
              <QuestionCard
                key={q.id}
                q={q}
                expanded={expandedId === q.id}
                onToggle={() => setExpandedId(expandedId === q.id ? null : q.id)}
                onHide={() => setHiddenIds(prev => new Set(prev).add(q.id))}
              />
            ))
          ) : (
            <p className="fq-muted">All results are hidden. Click “Unhide Questions”.</p>
          )
        ) : (
          <p className="fq-muted">Results hidden. Click “Show Questions”.</p>
        )
      ) : null}
      </div>
      <Footer />
    </main>
  );
}
