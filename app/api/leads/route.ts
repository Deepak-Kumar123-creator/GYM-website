import { NextResponse } from 'next/server';
import { emailPattern, phonePattern } from '../../../lib/validation';
import { siteConfig } from '../../../lib/site-config';

const json = (message: string, status = 200) => NextResponse.json({ message }, { status });

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const type = String(body.type || '');

    const required =
      type === 'contact'
        ? ['name', 'email', 'phone', 'subject', 'message']
        : type === 'class'
          ? ['name', 'phone', 'email', 'classId', 'className', 'date']
          : type === 'personal'
            ? ['name', 'phone', 'email', 'goal', 'date', 'time', 'experience', 'message']
            : ['name', 'phone', 'email', 'goal', 'date', 'time'];

    if (!['contact', 'class', 'personal', 'trial'].includes(type)) return json('Unsupported request type.', 400);

    for (const key of required) {
      if (!String(body[key] ?? '').trim()) return json(`${key} is required.`, 400);
    }

    if (!emailPattern.test(String(body.email))) return json('Enter a valid email address.', 400);
    if (!phonePattern.test(String(body.phone))) return json('Enter a valid phone number.', 400);

    const apiKey = process.env.RESEND_API_KEY;
    const to = process.env.CONTACT_TO_EMAIL || siteConfig.email;

    if (!apiKey) {
      return json(`The gym email service is not configured yet. Please email ${siteConfig.email} or use WhatsApp to arrange your request.`, 503);
    }

    const subject =
      type === 'contact'
        ? `Website contact: ${body.subject}`
        : type === 'class'
          ? `Class booking request: ${body.className} — ${body.date}`
          : type === 'personal'
            ? 'Personal training request'
            : 'Free trial request';

    const text = Object.entries(body)
      .filter(([key]) => key !== 'type')
      .map(([key, value]) => `${key}: ${String(value)}`)
      .join('\n');

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM_EMAIL || 'Website <onboarding@resend.dev>',
        to,
        subject,
        text,
      }),
    });

    if (!response.ok) return json('The email service could not accept the request. Please try again or use WhatsApp.', 502);
    return json('Request submitted. The gym team will review it and confirm availability or reply to your enquiry.');
  } catch {
    return json('We could not process the request right now. Please use the gym contact details or WhatsApp.', 500);
  }
}
