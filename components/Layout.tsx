import Head from 'next/head'
import Link from 'next/link'
import { ReactNode } from 'react'

interface LayoutProps {
  children: ReactNode
  title?: string
  description?: string
  ogImage?: string
}

export default function Layout({ children, title, description, ogImage }: LayoutProps) {
  const siteName = 'Анастасия Лушникова'
  const fullTitle = title ? `${title} — ${siteName}` : siteName
  const defaultDesc = 'Маркетинг, AI-инструменты и смыслы. Полезные материалы для экспертов.'

  return (
    <>
      <Head>
        <title>{fullTitle}</title>
        <meta name="description" content={description || defaultDesc} />
        <meta property="og:title" content={fullTitle} />
        <meta property="og:description" content={description || defaultDesc} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={siteName} />
        {ogImage && <meta property="og:image" content={ogImage} />}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={fullTitle} />
        <meta name="twitter:description" content={description || defaultDesc} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <meta name="theme-color" content="#ffffff" />
      </Head>

      <header className="header">
        <div className="header-inner">
          <Link href="/" className="logo">
            <div className="logo-icon">✦</div>
            target_school
          </Link>
          <nav className="header-nav">
            <Link href="/">Материалы</Link>
            <Link href="/admin">+ Добавить</Link>
          </nav>
        </div>
      </header>

      {children}

      <footer className="footer">
        <div className="footer-inner">
          © {new Date().getFullYear()} Анастасия Лушникова. Маркетинг, AI, смыслы.
        </div>
      </footer>
    </>
  )
}
