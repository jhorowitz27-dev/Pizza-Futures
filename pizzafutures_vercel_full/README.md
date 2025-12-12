# PizzaFutures

Real-time pizza price prediction market built with Next.js 14, Vercel, Supabase, Tailwind, and Chart.js.

## Setup

1. Install deps:

   npm install

2. Create a `.env.local` with:

   SUPABASE_URL=your_supabase_url
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key

3. Start dev:

   npm run dev

Deploy to Vercel and set the same env vars in the project settings.
