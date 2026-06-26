'use client';

import { useState } from 'react';
import { SiteNav } from '@/components/site-nav';
import { SiteFooter } from '@/components/site-footer';
import { SectionTitle } from '@/components/section';
import { Button, Card, Input, Textarea } from '@/components/ui';
import { saveTicket } from '@/lib/storage';
import { uid } from '@/lib/utils';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState('');

  const submit = async () => {
    if (!form.name || !form.email || !form.message) {
      setSent('Please fill all fields.');
      return;
    }
    await saveTicket({
      id: uid('ticket'),
      name: form.name,
      email: form.email,
      message: form.message,
      createdAt: new Date().toISOString(),
      status: 'open'
    });
    setSent('Message saved locally. Admin can review it in the panel.');
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <div className="min-h-screen">
      <SiteNav />
      <main className="mx-auto max-w-4xl px-4 py-14 sm:px-6 lg:px-8">
        <SectionTitle eyebrow="Contact" title="Talk to the admin team." description="Contact form stores messages locally for the admin panel. Upgrade buttons still open WhatsApp directly." />
        <Card className="mt-10 space-y-4">
          <Input placeholder="Your name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
          <Input placeholder="Your email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
          <Textarea placeholder="Your message" rows={6} value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} />
          <Button onClick={submit}>Send Message</Button>
          {sent ? <p className="text-sm text-slate-300">{sent}</p> : null}
        </Card>
      </main>
      <SiteFooter />
    </div>
  );
}
