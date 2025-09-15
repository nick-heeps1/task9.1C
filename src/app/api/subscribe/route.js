import { NextResponse } from 'next/server';
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY || '');

export async function POST(req) {
  try {
    const { email } = await req.json();

   
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ ok: false, error: 'Invalid email' }, { status: 400 });
    }

    await sgMail.send({
      to: email,
      from: process.env.SENDGRID_FROM, 
      subject: 'Welcome to DEV@Deakin',
      html: `
        <div style="font-family: system-ui, Arial; line-height:1.5">
          <h2>Welcome aboard 👋</h2>
          <p>Thanks for subscribing to the DEV@Deakin newsletter. We’ll only send the good stuff.</p>
        </div>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('SendGrid error:', err?.response?.body || err.message || err);
    return NextResponse.json({ ok: false, error: 'Email failed' }, { status: 500 });
  }
}
