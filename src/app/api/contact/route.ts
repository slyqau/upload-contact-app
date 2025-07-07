import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';


export async function POST(req: NextRequest) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  try {
    // Récupération du formulaire envoyé en multipart
    const formData = await req.formData();
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const message = formData.get('message') as string;
    const file = formData.get('file') as File | null;

    const attachments = [];
    if (file) {
      const buffer = Buffer.from(await file.arrayBuffer());
      attachments.push({
        filename: file.name,
        content: buffer,
      });
    }

    // Envoi du mail avec Resend
    const mailResult = await resend.emails.send({
      from: 'noreply@id3dconcept.com', // Peut-être "noreply" ou ton adresse support officielle
      to: ['info@id3dconcept.com'],    // <-- mets bien TON mail ici
      subject: `Nouveau formulaire - ID 3D Concept`,
      html: `
        <h3>Nouveau message client</h3>
        <p><strong>Nom :</strong> ${name}</p>
        <p><strong>Email :</strong> ${email}</p>
        <p><strong>Message :</strong><br>${message.replace(/\n/g, '<br>')}</p>
      `,
      attachments,
    });

    return NextResponse.json({ success: true, mailResult });
  } catch (err) {
    console.error('Erreur API:', err);
    return NextResponse.json({ success: false, error: err }, { status: 500 });
  }
}
