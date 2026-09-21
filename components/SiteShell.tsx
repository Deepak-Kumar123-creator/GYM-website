'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Facebook, Instagram, Mail, MapPin, Menu, MessageCircle, Phone, X, Youtube } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { siteConfig, whatsappHref, phoneHref, emailHref } from '../lib/site-config';

const links = [
  ['Home', '/'], ['About', '/about'], ['Programs', '/programs'], ['Classes', '/classes'],
  ['Trainers', '/trainers'], ['Membership', '/membership'], ['Schedule', '/schedule'],
  ['Gallery', '/gallery'], ['Contact', '/contact'],
] as const;

export function SiteShell({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [path]);
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open]);

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <header className="fixed top-0 z-50 w-full border-b border-white/10 bg-black/75 backdrop-blur-xl">
        <div className="container flex min-h-20 items-center justify-between gap-4">
          <Link href="/" className="shrink-0 text-xl font-black tracking-tighter" aria-label={`${siteConfig.name} home`}>
            IRON<span className="text-[var(--accent)]">FORGE</span>
          </Link>
          <nav className="hidden xl:flex gap-5 text-[11px] font-bold uppercase tracking-wider text-neutral-300" aria-label="Primary navigation">
            {links.map(([name, href]) => (
              <Link key={href} href={href} aria-current={path === href ? 'page' : undefined} className={path === href ? 'text-white' : 'hover:text-white'}>
                {name}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <Link href="/book-free-trial" className="btn btn-primary hidden sm:inline-flex">START YOUR FREE TRIAL</Link>
            <button aria-expanded={open} aria-controls="mobile-nav" aria-label={open ? 'Close menu' : 'Open menu'}
              className="btn btn-ghost xl:hidden p-3" onClick={() => setOpen(value => !value)}>
              {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
            </button>
          </div>
        </div>
        {open && (
          <div id="mobile-nav" className="xl:hidden border-t border-white/10 bg-black p-5">
            <nav className="grid gap-2" aria-label="Mobile navigation">
              {links.map(([name, href]) => (
                <Link key={href} href={href} aria-current={path === href ? 'page' : undefined} className="rounded-lg px-3 py-3 font-bold hover:bg-white/5">
                  {name}
                </Link>
              ))}
              <Link href="/book-free-trial" className="btn btn-primary mt-2">START YOUR FREE TRIAL</Link>
            </nav>
          </div>
        )}
      </header>
      <main id="main">{children}</main>
      <a aria-label="Chat with Ironforge Fitness on WhatsApp" href={whatsappHref} target="_blank" rel="noopener noreferrer"
        className="fixed bottom-5 right-5 z-40 grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-black shadow-2xl hover:scale-105">
        <MessageCircle aria-hidden="true" />
      </a>
      <Footer />
    </>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#050505] py-14">
      <div className="container grid gap-10 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <Link href="/" className="text-xl font-black">IRON<span className="text-[var(--accent)]">FORGE</span></Link>
          <p className="mt-4 max-w-sm text-sm leading-6 text-neutral-500">Premium strength, conditioning and coaching for people who want a better way to train.</p>
          <div className="mt-5 flex gap-3">
            {siteConfig.social.instagram && <a aria-label="Instagram" href={siteConfig.social.instagram} target="_blank" rel="noopener noreferrer"><Instagram size={19} /></a>}
            {siteConfig.social.facebook && <a aria-label="Facebook" href={siteConfig.social.facebook} target="_blank" rel="noopener noreferrer"><Facebook size={19} /></a>}
            {siteConfig.social.youtube && <a aria-label="YouTube" href={siteConfig.social.youtube} target="_blank" rel="noopener noreferrer"><Youtube size={19} /></a>}
          </div>
        </div>
        <div>
          <h3 className="font-black">QUICK LINKS</h3>
          <div className="mt-4 grid gap-2 text-sm text-neutral-500">
            {links.slice(1, 7).map(([name, href]) => <Link key={href} href={href} className="hover:text-white">{name}</Link>)}
          </div>
        </div>
        <div>
          <h3 className="font-black">CONTACT</h3>
          <div className="mt-4 grid gap-3 text-sm text-neutral-500">
            <a href={phoneHref} className="flex gap-2"><Phone size={16} />{siteConfig.phone}</a>
            <a href={emailHref} className="flex gap-2"><Mail size={16} />{siteConfig.email}</a>
            <a href={siteConfig.googleMapsUrl} target="_blank" rel="noopener noreferrer" className="flex gap-2"><MapPin size={16} />{siteConfig.address}, {siteConfig.city}</a>
          </div>
        </div>
        <div>
          <h3 className="font-black">LEGAL</h3>
          <div className="mt-4 grid gap-2 text-sm text-neutral-500">
            <Link href="/privacy-policy">Privacy Policy</Link>
            <Link href="/terms-and-conditions">Terms & Conditions</Link>
          </div>
        </div>
      </div>
      <div className="container mt-10 border-t border-white/10 pt-6 text-xs text-neutral-600">© {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</div>
    </footer>
  );
}
