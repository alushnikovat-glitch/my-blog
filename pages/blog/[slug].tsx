import Link from 'next/link'
import Layout from '../../components/Layout'
import { getAllPosts, getPost, Post } from '../../lib/posts'

interface Props {
  post: Post
}

function formatDate(str: string) {
  try {
    return new Date(str).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })
  } catch {
    return str
  }
}

export default function BlogPost({ post }: Props) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    datePublished: post.pubDate,
    author: {
      '@type': 'Person',
      name: 'Анастасия Лушникова',
      url: 'https://target-school.github.io'
    },
    keywords: post.tags.join(', ')
  }

  return (
    <Layout title={post.title} description={post.description} ogImage={post.image}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <main className="article-wrap">
        <Link href="/" className="article-back">← Все материалы</Link>

        <div className="article-meta">
          {post.tags.length > 0 && (
            <div className="article-tags">
              {post.tags.map(tag => (
                <span key={tag} className="tag">{tag}</span>
              ))}
            </div>
          )}
          <h1 className="article-title">{post.title}</h1>
          <p className="article-description">{post.description}</p>
          <div className="article-date">{formatDate(post.pubDate)}</div>
        </div>

        <hr className="article-divider" />

        <div
          className="article-content"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </main>
    </Layout>
  )
}

export async function getStaticPaths() {
  const posts = getAllPosts()
  return {
    paths: posts.map(p => ({ params: { slug: p.slug } })),
    fallback: false
  }
}

export async function getStaticProps({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug)
  if (!post) return { notFound: true }
  return { props: { post } }
}
