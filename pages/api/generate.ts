/* ARTICLE CONTENT */
.article-content h2 {
  font-family: 'Inter', sans-serif;
  font-size: 20px;
  font-weight: 700;
  color: var(--text);
  margin: 48px 0 16px;
  letter-spacing: -0.3px;
  padding-bottom: 10px;
  border-bottom: 2px solid var(--border);
}

.article-content h3 {
  font-family: 'Inter', sans-serif;
  font-size: 16px;
  font-weight: 600;
  color: var(--text);
  margin: 32px 0 10px;
}

.article-content p {
  font-size: 16px;
  line-height: 1.85;
  color: var(--text);
  margin-bottom: 20px;
}

.article-content ul, .article-content ol {
  padding-left: 20px;
  margin-bottom: 20px;
}

.article-content li {
  font-size: 16px;
  line-height: 1.8;
  margin-bottom: 8px;
}

.article-content strong {
  font-weight: 600;
}

.article-content img {
  margin: 28px 0;
  border: 1px solid var(--border);
  border-radius: var(--radius);
}

.article-content blockquote {
  border-left: 3px solid var(--blue);
  padding: 14px 20px;
  margin: 24px 0;
  background: var(--accent);
  border-radius: 0 10px 10px 0;
  color: var(--blue-dark);
  font-size: 16px;
  font-style: italic;
}

.article-content pre {
  background: #1e1e2e;
  border-radius: 10px;
  padding: 20px;
  margin: 24px 0;
  overflow-x: auto;
  position: relative;
}

.article-content pre code {
  font-family: 'JetBrains Mono', 'Fira Code', monospace;
  font-size: 14px;
  color: #cdd6f4;
  line-height: 1.7;
  background: none;
  padding: 0;
  border-radius: 0;
}

.article-content code {
  font-family: 'JetBrains Mono', 'Fira Code', monospace;
  font-size: 13px;
  background: #f0f4ff;
  color: var(--blue);
  padding: 2px 8px;
  border-radius: 5px;
}

.article-content hr {
  border: none;
  border-top: 1px solid var(--border);
  margin: 40px 0;
}

.article-content table {
  width: 100%;
  border-collapse: collapse;
  margin: 24px 0;
  font-size: 14px;
}

.article-content th {
  background: var(--bg);
  font-weight: 600;
  padding: 10px 14px;
  text-align: left;
  border-bottom: 2px solid var(--border);
}

.article-content td {
  padding: 10px 14px;
  border-bottom: 1px solid var(--border);
}

.article-content tr:last-child td {
  border-bottom: none;
}

/* FOOTER */
.footer {
  background: var(--white);
  border-top: 1px solid var(--border);
  padding: 24px;
  text-align: center;
}

.footer-inner {
  max-width: 960px;
  margin: 0 auto;
  font-size: 12px;
  color: var(--text-muted);
}

/* SPINNER */
.spinner {
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255,255,255,0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
  display: inline-block;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* EMPTY STATE */
.empty-state {
  text-align: center;
  padding: 60px 24px;
  color: var(--text-muted);
}

.empty-state-icon {
  font-size: 36px;
  margin-bottom: 14px;
}

.empty-state h3 {
  font-family: 'Inter', sans-serif;
  font-size: 15px;
  font-weight: 600;
  color: var(--text);
  margin-bottom: 6px;
}

.empty-state p {
  font-size: 13px;
  max-width: 300px;
  margin: 0 auto 20px;
}

@media (max-width: 640px) {
  .posts-grid {
    grid-template-columns: 1fr;
  }
  .header-nav {
    display: none;
  }
  .admin-card {
    padding: 16px;
  }
}
