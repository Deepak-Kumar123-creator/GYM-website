import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { trainers } from '../../../lib/data';
import { SectionHead } from '../../../components/UI';

export function generateStaticParams() {
  return trainers.map(trainer => ({ id: trainer.id }));
}

export default async function TrainerProfile({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const trainer = trainers.find(item => item.id === id);
  if (!trainer) notFound();

  return <div className="container pt-36 pb-24">
    <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
      <div className="relative aspect-[4/5] overflow-hidden rounded-3xl">
        <Image src={trainer.image} alt={`${trainer.name}, ${trainer.specialization}`} fill sizes="(max-width:1024px) 100vw, 50vw" className="object-cover"/>
      </div>
      <div>
        <SectionHead eyebrow="Trainer profile" title={trainer.name.toUpperCase()} body={trainer.bio}/>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="card p-5"><p className="text-xs uppercase tracking-widest text-neutral-500">Specialization</p><p className="mt-2 font-bold">{trainer.specialization}</p></div>
          <div className="card p-5"><p className="text-xs uppercase tracking-widest text-neutral-500">Experience</p><p className="mt-2 font-bold">{trainer.experience}</p></div>
          <div className="card p-5 sm:col-span-2"><p className="text-xs uppercase tracking-widest text-neutral-500">Certifications</p><p className="mt-2 font-bold">{trainer.certifications}</p></div>
        </div>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link href="/personal-training" className="btn btn-primary">BOOK PERSONAL TRAINING</Link>
          <Link href="/trainers" className="btn btn-ghost">BACK TO TRAINERS</Link>
        </div>
      </div>
    </div>
  </div>;
}
