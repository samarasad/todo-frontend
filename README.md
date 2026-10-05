# To-Do List Frontend

A fully responsive mobile first To-Do List app where users create, edit, delete and search tasks, and track open and completed work week by week.

## Live demo

- **App:** https://todo-frontend-1.netlify.app
- **API:** https://todo-backend-96t1.onrender.com/api
- **Backend repository:** https://github.com/samarasad/todo-backend

The API runs on a free Render instance that sleeps when idle, so the first load can take around 30 seconds.

## Tech stack

Next.js (App Router) · TypeScript · Tailwind CSS v4 · SWR · Poppins

## Run locally

```bash
npm install
cp .env.example .env.local
npm run dev
```

The app runs at `http://localhost:3000`.

Set `NEXT_PUBLIC_API_URL` in `.env.local` to your backend, for example `http://localhost:5000/api` for a local API or `https://todo-backend-96t1.onrender.com/api` for the deployed one.

## Environment variables

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_API_URL` | Base URL of the backend API, including `/api` |

This value is read at build time, so redeploy after changing it.

## Screens

- `/` onboarding
- `/home` week strip, weekly counts and progress, tasks of the selected day, add button
- `/search` live keyword search with edit and delete
- `/weeks` every week as a card with open and completed counts, tap to expand its tasks

## Features

- Create tasks with title, date, start and end time, description and optional priority
- Edit and delete tasks, with swipe left to delete on touch screens
- Mark tasks completed or in progress with the checkbox
- Weekly cards grouped Monday to Sunday with open and completed counts
- Debounced keyword search across title and description
- Responsive layout: full screen on phones, centered phone sized card on larger screens
- Loading skeletons, empty states and clear error messages

## Project structure

```
src/
  app/          Pages and global styles
  components/   UI components
  lib/          API client, types, date helpers
```