# PosterFlow SaaS

Browser-first SaaS untuk membuat poster/thumbnail promosi, menyimpan proyek, dan mengekspor hasil ke PNG/PDF tanpa API berbayar.

## Stack
- Next.js App Router
- TypeScript
- Tailwind CSS
- Framer Motion
- LocalStorage + IndexedDB
- html-to-image + jsPDF

## Jalankan
```bash
npm install
npm run dev
```

## Build
```bash
npm run build
```

## Catatan
- Ganti nomor WhatsApp admin di `lib/constants.ts`
- Data auth, profil, dan billing berjalan lokal di browser
- Proyek desain disimpan di IndexedDB
