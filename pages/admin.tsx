import { useState } from 'react'
import Link from 'next/link'
import Layout from '../components/Layout'

interface Result {
  slug: string
  title: string
  description: string
  tags: string[]
  url: string
}

export default function Admin() {
  const [text, setText] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle')
  const [result, setResult] = useState<Result | null>(null)
  const [errorMsg, setErrorMsg] = useState('')

  async function handleSubmit() {
    if (text.trim().length < 50) {
      setErrorMsg('Текст слишком короткий. Вставь хотя бы 50 символов.')
      setStatus('error')
      return
    }
    setStatus('loading')
    setResult(null)
    setErrorMsg('')

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text })
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Ошибка')
      setResult(data)
      setStatus('done')
      setText('')
    } catch (err: any) {
      setErrorMsg(err.message)
      setStatus('error')
    }
  }

  return (
    <Layout title="Добавить пост">
      <div className="admin-wrap">
        <div className="admin-header">
          <h1>Новый материал</h1>
          <p>Вставь текст, AI сам сделает структуру, мета-теги и SEO-разметку.</p>
        </div>

        <div className="admin-card">
          <h2>Текст материала</h2>
          <label className="field-label">Вставь сырой текст</label>
          <textarea
            rows={14}
            placeholder="Вставь сюда текст лид-магнита, статьи или полезного материала. Чем больше текста — тем лучше структура."
            value={text}
            onChange={e => setText(e.target.value)}
          />
          <div className="field-hint">{text.length} символов</div>
        </div>

        <div className="admin-card">
          <h2>Изображения</h2>
          <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '12px' }}>
            Положи скриншоты и картинки в папку <code style={{ background: '#f0f4ff', padding: '2px 6px', borderRadius: '4px', fontSize: '13px' }}>public/images/</code> проекта.
          </p>
          <p style={{ fontSize: '14px', color: 'var(--text-muted)' }}>
            В тексте упомяни: <em>"скриншот интерфейса AI Pulse"</em> и AI вставит правильный тег. Называй файлы по-английски через дефис: <code style={{ background: '#f0f4ff', padding: '2px 6px', borderRadius: '4px', fontSize: '13px' }}>ai-pulse-screen.png</code>
          </p>
        </div>

        <button
          className="btn-primary"
          onClick={handleSubmit}
          disabled={status === 'loading'}
          style={{ width: '100%', justifyContent: 'center', padding: '16px' }}
        >
          {status === 'loading' ? (
            <><span className="spinner" /> AI обрабатывает текст...</>
          ) : (
            <>✦ Создать страницу</>
          )}
        </button>

        {status === 'error' && (
          <div className="status-msg error">{errorMsg}</div>
        )}

        {status === 'done' && result && (
          <div className="result-box">
            <h3>✓ Страница создана</h3>
            <div className="result-row">
              <label>Заголовок</label>
              <span>{result.title}</span>
            </div>
            <div className="result-row">
              <label>Description</label>
              <span>{result.description}</span>
            </div>
            <div className="result-row">
              <label>URL</label>
              <span>/blog/{result.slug}</span>
            </div>
            <div className="result-row">
              <label>Теги</label>
              <div className="tags-list">
                {result.tags.map(t => <span key={t} className="tag">{t}</span>)}
              </div>
            </div>
            <div className="status-msg success" style={{ marginTop: '20px' }}>
              Сделай git push — и страница появится на сайте через минуту.
            </div>
            <Link href={result.url} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginTop: '12px', fontSize: '14px', color: 'var(--blue)' }}>
              Предпросмотр →
            </Link>
          </div>
        )}
      </div>
    </Layout>
  )
}
