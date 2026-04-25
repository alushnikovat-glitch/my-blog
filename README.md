# Блог Анастасии Лушниковой

Next.js блог с AI-генерацией страниц. Деплой на Vercel.

## Быстрый старт

### 1. Установка

```bash
npm install
```

### 2. Переменные окружения

Создай файл `.env.local` в корне проекта:

```
ANTHROPIC_API_KEY=sk-ant-xxxxxx
```

### 3. Запуск локально

```bash
npm run dev
```

Открой http://localhost:3000

---

## Как добавлять посты

1. Открой `/admin` на своём сайте
2. Вставь текст лид-магнита или статьи
3. Нажми «Создать страницу»
4. AI сделает title, description, теги, структуру H2/H3
5. Сделай `git add . && git commit -m "new post" && git push`
6. Vercel автоматически задеплоит

---

## Как добавлять изображения

1. Положи файл в папку `public/images/`
2. Называй файлы по-английски: `ai-pulse-screen.png`
3. В тексте упомяни скриншот — AI вставит тег автоматически
4. Или добавь вручную в markdown: `![описание](/images/название.png)`

---

## Деплой на Vercel

1. Создай новый репозиторий на GitHub
2. Запушь этот проект
3. Зайди на vercel.com → New Project → импортируй репо
4. В Settings → Environment Variables добавь `ANTHROPIC_API_KEY`
5. Deploy

---

## Структура проекта

```
posts/          ← markdown-файлы постов (создаются автоматически)
public/images/  ← изображения для постов
pages/
  index.tsx     ← главная страница блога
  admin.tsx     ← панель для добавления постов
  blog/[slug]   ← страница поста
  api/generate  ← API для AI-обработки текста
components/
  Layout.tsx    ← шапка, футер, SEO-теги
lib/
  posts.ts      ← утилиты для работы с постами
```
