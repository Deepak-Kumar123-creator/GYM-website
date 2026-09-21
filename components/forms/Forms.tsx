'use client';

import { useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';
import type { ClassSession } from '../../lib/data';
import { validateClassBooking, validateContact, validateLead } from '../../lib/validation';
import { emailHref, siteConfig, whatsappHref } from '../../lib/site-config';

function Input({label,name,type='text',value,onChange,error,required=true}:{label:string;name:string;type?:string;value:string;onChange:(v:string)=>void;error?:string;required?:boolean}) {
  return <div className="field">
    <label htmlFor={name}>{label}{required?' *':''}</label>
    <input id={name} name={name} type={type} required={required} value={value} onChange={e=>onChange(e.target.value)}
      aria-invalid={!!error} aria-describedby={error?`${name}-error`:undefined}/>
    {error&&<small id={`${name}-error`} role="alert">{error}</small>}
  </div>;
}

export function ContactForm({defaultSubject=''}:{defaultSubject?:string}) {
  const [data,setData]=useState({name:'',email:'',phone:'',subject:defaultSubject,message:''});
  const [errors,setErrors]=useState<Record<string,string>>({});
  const [state,setState]=useState<'idle'|'loading'|'success'|'error'>('idle');
  const [message,setMessage]=useState('');

  useEffect(()=>setData(current=>({...current,subject:defaultSubject})),[defaultSubject]);

  const submit=async(e:React.FormEvent)=>{
    e.preventDefault();
    if(state==='loading') return;
    const next=validateContact(data); setErrors(next);
    if(Object.keys(next).length) return;
    setState('loading');
    try{
      const response=await fetch('/api/leads',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({...data,type:'contact'})});
      const result=await response.json().catch(()=>({}));
      if(!response.ok) throw new Error(result.message||'Unable to submit');
      setMessage(result.message||'Request submitted. The gym team will reply soon.');
      setState('success');
    }catch{
      setMessage(`The form could not be delivered right now. Please email the gym at ${siteConfig.email} or use WhatsApp instead.`);
      setState('error');
    }
  };

  if(state==='success') return <div className="card p-8" role="status">
    <h3 className="text-2xl font-black">MESSAGE REQUEST SUBMITTED.</h3>
    <p className="mt-3 text-neutral-400">{message}</p>
    <button className="btn btn-ghost mt-6" onClick={()=>{setState('idle');setErrors({});setData({name:'',email:'',phone:'',subject:defaultSubject,message:''})}}>SEND ANOTHER</button>
  </div>;

  return <form onSubmit={submit} className="card grid gap-4 p-7" noValidate aria-busy={state==='loading'}>
    <div className="grid gap-4 sm:grid-cols-2">
      <Input label="Name" name="contact-name" value={data.name} onChange={v=>setData({...data,name:v})} error={errors.name}/>
      <Input label="Email" name="contact-email" type="email" value={data.email} onChange={v=>setData({...data,email:v})} error={errors.email}/>
    </div>
    <div className="grid gap-4 sm:grid-cols-2">
      <Input label="Phone" name="contact-phone" type="tel" value={data.phone} onChange={v=>setData({...data,phone:v})} error={errors.phone}/>
      <Input label="Subject" name="contact-subject" value={data.subject} onChange={v=>setData({...data,subject:v})} error={errors.subject}/>
    </div>
    <div className="field">
      <label htmlFor="contact-message">Message *</label>
      <textarea id="contact-message" rows={6} value={data.message} onChange={e=>setData({...data,message:e.target.value})} aria-invalid={!!errors.message} aria-describedby={errors.message?'contact-message-error':undefined}/>
      {errors.message&&<small id="contact-message-error" role="alert">{errors.message}</small>}
    </div>
    {state==='error'&&<div className="rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-200" role="alert">
      <p>{message}</p><div className="mt-2 flex flex-wrap gap-3"><a className="underline" href={emailHref}>Email the gym</a><a className="underline" href={whatsappHref} target="_blank" rel="noopener noreferrer">WhatsApp</a></div>
    </div>}
    <button disabled={state==='loading'} className="btn btn-primary">{state==='loading'?'SUBMITTING…':'SEND MESSAGE'}</button>
  </form>;
}

export function LeadForm({title='YOUR FIRST WORKOUT IS ON US',type='trial'}:{title?:string;type?:'trial'|'personal'}) {
  const fields=type==='personal'?['name','phone','email','goal','date','time','experience','message']:['name','phone','email','goal','date','time'];
  const [data,setData]=useState<Record<string,string>>({name:'',phone:'',email:'',goal:'',date:'',time:'',experience:'',message:''});
  const [errors,setErrors]=useState<Record<string,string>>({});
  const [state,setState]=useState<'idle'|'loading'|'success'|'error'>('idle');
  const [msg,setMsg]=useState('');

  const submit=async(e:React.FormEvent)=>{
    e.preventDefault();
    if(state==='loading') return;
    const next=validateLead(data,type); setErrors(next);
    if(Object.keys(next).length) return;
    setState('loading');
    try{
      const r=await fetch('/api/leads',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({...data,type})});
      const j=await r.json().catch(()=>({}));
      if(!r.ok) throw new Error(j.message||'Unable to submit');
      setMsg(j.message||'Request submitted. The gym team will confirm availability.');
      setState('success');
      setData({name:'',phone:'',email:'',goal:'',date:'',time:'',experience:'',message:''});
      setErrors({});
    }catch{
      setMsg(`We couldn't submit the request right now. Please email ${siteConfig.email} or use WhatsApp to arrange a time.`);
      setState('error');
    }
  };

  return <section className="relative overflow-hidden bg-[var(--accent)] py-20 text-black">
    <div className="container relative grid gap-10 lg:grid-cols-2 lg:items-center">
      <div><p className="text-xs font-black uppercase tracking-[.18em]">No pressure. Just a great first session.</p><h2 className="display mt-3 text-5xl sm:text-7xl">{title}</h2><p className="mt-5 max-w-xl font-medium text-black/70">Tell us a little about your goal and our team will confirm availability. A request is not a confirmed booking.</p></div>
      {state==='success'?<div className="rounded-2xl bg-black p-8 text-white" role="status"><h3 className="text-2xl font-black">REQUEST SUBMITTED.</h3><p className="mt-2 text-neutral-400">{msg}</p><button className="btn btn-ghost mt-6" onClick={()=>setState('idle')}>SEND ANOTHER REQUEST</button></div>:<form onSubmit={submit} className="grid gap-3 rounded-2xl bg-black p-6 text-white" noValidate aria-busy={state==='loading'}>
        {fields.map(f=>f==='message'?<div key={f} className="field"><label htmlFor="personal-message">Message *</label><textarea id="personal-message" rows={4} value={data[f]} onChange={e=>setData({...data,message:e.target.value})} aria-invalid={!!errors[f]} aria-describedby={errors[f]?'personal-message-error':undefined}/>{errors[f]&&<small id="personal-message-error" role="alert">{errors[f]}</small>}</div>
        :f==='goal'?<div key={f} className="field"><label htmlFor="lead-goal">Fitness Goal *</label><select id="lead-goal" value={data[f]} onChange={e=>setData({...data,goal:e.target.value})}><option value="">Select a goal</option><option>Build strength</option><option>Lose weight</option><option>Build muscle</option><option>General fitness</option><option>Sports conditioning</option></select>{errors.goal&&<small role="alert">{errors.goal}</small>}</div>
        :f==='experience'?<div key={f} className="field"><label htmlFor="lead-experience">Experience Level *</label><select id="lead-experience" value={data[f]} onChange={e=>setData({...data,experience:e.target.value})}><option value="">Select experience</option><option>Beginner</option><option>Intermediate</option><option>Advanced</option></select>{errors.experience&&<small role="alert">{errors.experience}</small>}</div>
        :<Input key={f} label={f==='name'?'Full Name':f==='date'?'Preferred Date':f==='time'?'Preferred Time':f[0].toUpperCase()+f.slice(1)} name={`lead-${f}`} type={f==='email'?'email':f==='phone'?'tel':f==='date'?'date':f==='time'?'time':'text'} value={data[f]} onChange={v=>setData({...data,[f]:v})} error={errors[f]}/>)}
        {state==='error'&&<div className="rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-200" role="alert"><p>{msg}</p><div className="mt-2 flex flex-wrap gap-3"><a className="underline" href={emailHref}>Email the gym</a><a className="underline" href={whatsappHref} target="_blank" rel="noopener noreferrer">WhatsApp</a></div></div>}
        <button disabled={state==='loading'} className="btn btn-primary mt-2">{state==='loading'?'SUBMITTING…':type==='trial'?'BOOK MY FREE TRIAL':'REQUEST PERSONAL TRAINING'}</button>
      </form>}
    </div>
  </section>;
}

export function ClassBookingModal({session,onClose}:{session:ClassSession;onClose:()=>void}) {
  const dialogRef=useRef<HTMLDivElement>(null);
  const [data,setData]=useState({name:'',phone:'',email:'',date:''});
  const [errors,setErrors]=useState<Record<string,string>>({});
  const [state,setState]=useState<'idle'|'loading'|'success'|'error'>('idle');

  useEffect(()=>{
    dialogRef.current?.focus();
    const onKeyDown=(event:KeyboardEvent)=>{if(event.key==='Escape')onClose();};
    window.addEventListener('keydown',onKeyDown);
    return ()=>window.removeEventListener('keydown',onKeyDown);
  },[onClose]);

  const submit=async(e:React.FormEvent)=>{
    e.preventDefault();
    if(state==='loading') return;
    const next=validateClassBooking(data);setErrors(next);
    if(Object.keys(next).length)return;
    setState('loading');
    try{
      const r=await fetch('/api/leads',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({...data,type:'class',classId:session.id,className:session.name,day:session.day,time:session.time,trainer:session.trainer})});
      if(!r.ok)throw new Error();
      setState('success');
    }catch{setState('error');}
  };

  return <div ref={dialogRef} tabIndex={-1} className="dialog-open fixed inset-0 z-[70] grid place-items-center overflow-y-auto bg-black/80 p-4" role="dialog" aria-modal="true" aria-labelledby="class-booking-title">
    <div className="card w-full max-w-lg p-7">
      <div className="flex items-start justify-between gap-4"><div><p className="eyebrow">Class request</p><h2 id="class-booking-title" className="mt-2 text-2xl font-black">{session.name}</h2><p className="mt-1 text-sm text-neutral-500">{session.day} • {session.time} • {session.trainer} • {session.duration}</p></div><button aria-label="Close booking" onClick={onClose} className="rounded-full bg-white/5 p-2"><X/></button></div>
      {state==='success'?<div className="mt-8" role="status"><h3 className="text-xl font-black">BOOKING REQUEST SUBMITTED.</h3><p className="mt-2 text-sm leading-6 text-neutral-400">Your request was submitted. The gym will confirm your slot; this is not an instant booking.</p><button className="btn btn-primary mt-6" onClick={onClose}>DONE</button></div>
      :<form onSubmit={submit} className="mt-7 grid gap-4" noValidate>
        <Input label="Member Name" name="member-name" value={data.name} onChange={v=>setData({...data,name:v})} error={errors.name}/>
        <Input label="Phone" name="member-phone" type="tel" value={data.phone} onChange={v=>setData({...data,phone:v})} error={errors.phone}/>
        <Input label="Email" name="member-email" type="email" value={data.email} onChange={v=>setData({...data,email:v})} error={errors.email}/>
        <Input label="Date" name="member-date" type="date" value={data.date} onChange={v=>setData({...data,date:v})} error={errors.date}/>
        {state==='error'&&<p role="alert" className="text-sm text-red-300">Unable to submit the request. Please use WhatsApp or contact the gym.</p>}
        <button disabled={state==='loading'} className="btn btn-primary">{state==='loading'?'SUBMITTING…':'SUBMIT BOOKING REQUEST'}</button>
      </form>}
    </div>
  </div>;
}
