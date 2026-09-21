import { SectionHead, Location } from '../../components/UI';
import { ContactForm } from '../../components/forms/Forms';
import { memberships } from '../../lib/data';
import { siteConfig, emailHref, phoneHref } from '../../lib/site-config';

export default async function Contact({ searchParams }: { searchParams: Promise<{ membership?: string }> }) {
  const params = await searchParams;
  const selected = memberships.find(m => m.id === params.membership);
  const defaultSubject = selected ? `Membership enquiry — ${selected.name}` : '';
  return <>
    <div className="container pt-36 pb-12">
      <SectionHead eyebrow="Contact" title="LET'S TALK TRAINING." body="Questions about memberships, classes, personal training or your first visit? Send a message and the front desk can follow up."/>
      {selected && <div className="mb-6 rounded-xl border border-[var(--accent)]/30 bg-[var(--accent)]/10 p-4 text-sm text-neutral-200">
        You selected the <strong>{selected.name}</strong> membership. Your enquiry subject has been pre-filled.
      </div>}
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="card p-7">
          <h3 className="text-xl font-black">{siteConfig.name}</h3>
          <p className="mt-4 text-sm leading-7 text-neutral-400">
            {siteConfig.address}<br/>{siteConfig.city}, {siteConfig.state} {siteConfig.postalCode}<br/><br/>
            <a href={phoneHref}>{siteConfig.phone}</a><br/>
            <a href={emailHref}>{siteConfig.email}</a>
          </p>
        </div>
        <ContactForm defaultSubject={defaultSubject}/>
      </div>
    </div>
    <Location/>
  </>;
}
