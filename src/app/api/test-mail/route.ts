import { NextResponse } from 'next/server';
import { Resend } from 'resend';


export async function GET() {
  const resend = new Resend(process.env.RESEND_API_KEY);
  try {
    const mailResult = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'info@id3dconcept.com',
      subject: 'Hello World',
      html: '<p>Test d’envoi depuis Next.js API Route !</p>',
    });

    return NextResponse.json({ success: true, mailResult });
  } catch (err) {
    return NextResponse.json({ success: false, error: err }, { status: 500 });
  }
}
