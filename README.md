# To-Do List Frontend

Next.js (App Router), Tailwind CSS.

## Run

```
npm install
cp .env.example .env.local
npm run dev
```

Set `NEXT_PUBLIC_API_URL` in `.env.local` to your backend, for example
`http://localhost:5000/api`. 
## Screens

- `/` onboarding
- `/home` week strip, weekly counts and progress, tasks of the selected day, add button
- `/search` live keyword search with edit and delete
- `/weeks` every week as a card with open and completed counts, tap to expand its tasks
