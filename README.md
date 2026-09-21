# IRONFORGE FITNESS — Production-ready gym website

Premium Next.js + React + Tailwind website architecture designed to be reused for real gym businesses.

## Stack
- Next.js 15 App Router
- React 19
- TypeScript
- Tailwind CSS v4
- Lucide icons
- Next/Image
- Route handlers for lead/booking requests

## Install & run
```bash
npm install
npm run dev
npm run build
npm start
```

## Environment variables
Copy `.env.example` to `.env.local`.

Forms use an optional Resend integration. Without `RESEND_API_KEY`, the UI does **not** claim a message was delivered; it shows a fallback to the configured email/WhatsApp contact.

## Customize a client
Edit `lib/site-config.ts` for:
- business name/tagline
- phone/WhatsApp/email
- address/city/state/postal code
- website/canonical URL
- opening hours
- map URL/embed
- social profiles

Edit `lib/data.ts` for:
- trainers
- programs
- memberships and annual prices
- class schedule
- gallery
- testimonials
- facilities
- transformation stories
- FAQs

## Images
Images currently use Unsplash URLs so the template is easy to demonstrate. Replace URLs in `lib/data.ts` and relevant sections with client-owned assets before launch. Remote images are configured in `next.config.mjs`.

## Forms
All lead forms POST to `/api/leads`. Add a production email/CRM provider inside that route or replace it with your database/CRM integration. The current route supports contact, free-trial, personal-training and class booking requests.

## Routes
`/`, `/about`, `/programs`, `/classes`, `/schedule`, `/trainers`, `/membership`, `/gallery`, `/personal-training`, `/contact`, `/book-free-trial`, `/privacy-policy`, `/terms-and-conditions` plus program detail routes under `/programs/[id]`.

## Production checklist
- Replace sample business details.
- Add real social URLs.
- Replace sample testimonials and transformation stories with approved client content.
- Configure email/CRM delivery.
- Review legal pages with the business owner.
- Replace demo images with licensed/client-owned imagery.
