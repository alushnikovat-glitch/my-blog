import { useState } from 'react'
import Layout from '../components/Layout'

interface Result {
  slug: string
  title: string
  description: string
  tags: string[]
  markdown: string
  filename: string
}

export default function Admin() {
  const [text, setText] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle')
  const [result, setResult] = useState<Result | null>(null)
  const [errorMsg, setErrorMsg] = useState('')
  const [copied, setCopied] = useState(false)

  async function handleSubmit() {
    if (text.trim().length < 50) {
      setErrorMsg('Текст слишком короткий. Вставь хотя бы 50 символов.')
      setStatus('error')
      return
    }
    setStatus('loading')
    setResult(null)
    setErrorMsg('')
    setCopied(false)

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

  async function handleCopy() {
    if (!result) return
    await navigator.clipboard.writeText(result.markdown)
    setCopied(true)
    setTimeout(() => setCopied(false), 3000)
  }

  return (
    <Layout title="Добавить материал">
      <div className="admin-wrap">
        <div className="admin-header">
          <h1>Новый материал</h1>
          <p>Вставь текст — AI сделает структуру, заголовок и SEO-теги.</p>
        </div>

        {status !== 'done' && (
          <>
            <div className="admin-card">
              <h2>Текст материала</h2>
              <label className="field-label">Вставь сырой текст</label>
              <textarea
                rows={14}
                placeholder="Вставь сюда текст лид-магнита, статьи или полезного материала."
                value={text}
                onChange={e => setText(e.target.value)}
              />
              <div className="field-hint">{text.length} символов</div>
            </div>

            <button
              className="btn-primary"
              onClick={handleSubmit}
              disabled={status === 'loading'}
              style={{ width: '100%', justifyContent: 'center', padding: '14px' }}
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
          </>
        )}

        {status === 'done' && result && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

            <div className="result-box">
              <h3>✓ AI обработал текст</h3>
              <div className="result-row">
                <label>Заголовок</label>
                <span>{result.title}</span>
              </div>
              <div className="result-row">
                <label>Description</label>
                <span>{result.description}</span>
              </div>
              <div className="result-row">
                <label>Имя файла</label>
                <span style={{ fontFamily: 'monospace', background: '#dbeafe', padding: '2px 8px', borderRadius: '4px', fontSize: '13px' }}>{result.filename}</span>
              </div>
              <div className="result-row">
                <label>Теги</label>
                <div className="tags-list">
                  {result.tags.map(t => <span key={t} className="tag">{t}</span>)}
                </div>
              </div>
            </div>

            <div className="admin-card">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                <h2 style={{ margin: 0 }}>Готовый файл</h2>
                <button
                  onClick={handleCopy}
                  style={{
                    background: copied ? '#dcfce7' : 'var(--accent)',
                    color: copied ? '#166534' : 'var(--blue)',
                    border: `1px solid ${copied ? '#bbf7d0' : '#bfdbfe'}`,
                    borderRadius: '6px',
                    padding: '6px 14px',
                    fontSize: '13px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                >
                  {copied ? '✓ Скопировано' : 'Копировать'}
                </button>
              </div>
              <textarea
                rows={12}
                value={result.markdown}
                readOnly
                style={{ fontFamily: 'monospace', fontSize: '12px', background: '#f8fafc', color: '#374151', cursor: 'text' }}
              />
            </div>

            <div className="admin-card">
              <h2>Как опубликовать — 3 шага</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

                <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'var(--blue)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: 700, flexShrink: 0 }}>1</div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '14px', marginBottom: '4px' }}>Нажми «Копировать» выше</div>
                    <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Весь текст файла скопируется в буфер обмена.</div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'var(--blue)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: 700, flexShrink: 0 }}>2</div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '14px', marginBottom: '4px' }}>GitHub → my-blog → папка posts → Add file → Create new file</div>
                    <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                      В поле имени файла введи:&nbsp;
                      <span style={{ fontFamily: 'monospace', background: '#f0f4ff', padding: '2px 8px', borderRadius: '4px', fontSize: '12px' }}>{result.filename}</span>
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'var(--blue)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: 700, flexShrink: 0 }}>3</div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '14px', marginBottom: '4px' }}>Вставь скопированный текст и нажми «Commit changes»</div>
                    <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Vercel задеплоит через минуту. Страница появится на сайте.</div>
                  </div>
                </div>

              </div>
            </div>

            <button
              onClick={() => { setStatus('idle'); setResult(null) }}
              style={{ background: 'none', border: '1px solid var(--border)', borderRadius: '8px', padding: '10px', fontSize: '14px', color: 'var(--text-muted)', cursor: 'pointer' }}
            >
              ← Создать ещё один материал
            </button>
          </div>
        )}
      </div>
    </Layout>
  )
}
