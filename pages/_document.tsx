import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="ru">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Unbounded:wght@400;600;700&family=Golos+Text:wght@400;500;600&display=swap" rel="stylesheet" />
        <meta name="theme-color" content="#1B3A8C" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
