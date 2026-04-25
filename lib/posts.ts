import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import remarkHtml from 'remark-html'
import remarkGfm from 'remark-gfm'

const postsDir = path.join(process.cwd(), 'posts')

export interface PostMeta {
  slug: string
  title: string
  description: string
  pubDate: string
  tags: string[]
  image?: string
}

export interface Post extends PostMeta {
  content: string
}

export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(postsDir)) return []
  const files = fs.readdirSync(postsDir).filter(f => f.endsWith('.md'))
  const posts = files.map(filename => {
    const slug = filename.replace('.md', '')
    const raw = fs.readFileSync(path.join(postsDir, filename), 'utf8')
    const { data } = matter(raw)
    return {
      slug,
      title: data.title || '',
      description: data.description || '',
      pubDate: data.pubDate || '',
      tags: data.tags || [],
      image: data.image || ''
    }
  })
  return posts.sort((a, b) => (a.pubDate < b.pubDate ? 1 : -1))
}

export async function getPost(slug: string): Promise<Post | null> {
  const filePath = path.join(postsDir, `${slug}.md`)
  if (!fs.existsSync(filePath)) return null
  const raw = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(raw)
  const processed = await remark().use(remarkGfm).use(remarkHtml, { sanitize: false }).process(content)
  return {
    slug,
    title: data.title || '',
    description: data.description || '',
    pubDate: data.pubDate || '',
    tags: data.tags || [],
    image: data.image || '',
    content: processed.toString()
  }
}

export function savePost(slug: string, frontmatter: Omit<PostMeta, 'slug'>, content: string) {
  if (!fs.existsSync(postsDir)) fs.mkdirSync(postsDir, { recursive: true })
  const fm = [
    '---',
    `title: "${frontmatter.title}"`,
    `description: "${frontmatter.description}"`,
    `pubDate: "${frontmatter.pubDate}"`,
    `tags: [${frontmatter.tags.map(t => `"${t}"`).join(', ')}]`,
    `image: "${frontmatter.image || '/images/og-default.png'}"`,
    '---',
    '',
    content
  ].join('\n')
  fs.writeFileSync(path.join(postsDir, `${slug}.md`), fm, 'utf8')
}
