import Link from 'next/link'
import Layout from '../components/Layout'
import { getAllPosts, PostMeta } from '../lib/posts'

interface Props {
  posts: PostMeta[]
}

function formatDate(str: string) {
  try {
    return new Date(str).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })
  } catch {
    return str
  }
}

export default function Home({ posts }: Props) {
  return (
    <Layout>
      <div className="hero">
        <div className="hero-inner">
          <div className="hero-tag">База знаний</div>
          <h1>Маркетинг. AI. Смыслы.</h1>
          <p>Полезные материалы для экспертов, которые хотят продавать через контент, а не охваты.</p>
        </div>
      </div>

      <main className="main">
        {posts.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">✦</div>
            <h3>Пока постов нет</h3>
            <p>Добавь первый материал через панель администратора.</p>
            <Link href="/admin" className="btn-primary" style={{ display: 'inline-flex', marginTop: '8px' }}>
              Добавить пост
            </Link>
          </div>
        ) : (
          <>
            <div className="section-title">Все материалы — {posts.length}</div>
            <div className="posts-grid">
              {posts.map(post => (
                <Link href={`/blog/${post.slug}`} key={post.slug} style={{ textDecoration: 'none' }}>
                  <article className="post-card">
                    {post.tags?.[0] && (
                      <div className="post-card-tag">✦ {post.tags[0]}</div>
                    )}
                    <h2>{post.title}</h2>
                    <p>{post.description}</p>
                    <div className="post-card-footer">
                      <span className="post-card-date">{formatDate(post.pubDate)}</span>
                      <div className="post-card-arrow">→</div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </>
        )}
      </main>
    </Layout>
  )
}

export async function getStaticProps() {
  const posts = getAllPosts()
  return { props: { posts } }
}
