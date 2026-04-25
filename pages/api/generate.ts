import type { NextApiRequest, NextApiResponse } from 'next'
import { savePost } from '../../lib/posts'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end()

  const { text } = req.body
  if (!text || text.trim().length < 50) {
    return res.status(400).json({ error: 'Текст слишком короткий. Минимум 50 символов.' })
  }

  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) return res.status(500).json({ error: 'ANTHROPIC_API_KEY не задан' })

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-opus-4-5',
        max_tokens: 4000,
        messages: [{
          role: 'user',
          content: `Ты помогаешь структурировать текст для SEO-блога на русском языке.

Получаешь сырой текст статьи или лид-магнита.
Возвращаешь ТОЛЬКО валидный JSON без markdown-обёртки, без комментариев.

Структура JSON:
{
  "slug": "url-friendly-slug-на-латинице-через-дефис",
  "title": "Заголовок H1, до 60 символов, цепляющий",
  "description": "Meta description 120-155 символов, описывает ценность материала",
  "tags": ["тег1", "тег2", "тег3"],
  "content": "Готовый markdown с H2/H3 структурой. Сохраняй смысл и стиль автора. Добавляй H2 там где начинается новая мысль. Изображения вставляй как ![описание](/images/название.png) если они упоминаются."
}

Правила:
- slug только латиница, цифры, дефисы
- title и description на русском
- tags на русском, 2-4 штуки
- content — полный структурированный markdown

Текст для обработки:
${text}`
        }]
      })
    })

    const data = await response.json()
    const raw = data.content?.[0]?.text || ''

    let parsed: any
    try {
      const clean = raw.replace(/```json|```/g, '').trim()
      parsed = JSON.parse(clean)
    } catch {
      return res.status(500).json({ error: 'AI вернул невалидный JSON. Попробуй ещё раз.' })
    }

    const today = new Date().toISOString().split('T')[0]
    savePost(parsed.slug, {
      title: parsed.title,
      description: parsed.description,
      pubDate: today,
      tags: parsed.tags || [],
      image: '/images/og-default.png'
    }, parsed.content)

    return res.status(200).json({
      slug: parsed.slug,
      title: parsed.title,
      description: parsed.description,
      tags: parsed.tags,
      url: `/blog/${parsed.slug}`
    })

  } catch (err: any) {
    return res.status(500).json({ error: err.message || 'Ошибка сервера' })
  }
}
