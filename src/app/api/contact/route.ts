import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  // On gère un form-data pour recevoir fichier + texte
  const formData = await req.formData();
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const message = formData.get("message") as string;
  const file = formData.get("file") as File | null;

  // Vérif
  if (!name || !email || !message || !file) {
    return NextResponse.json({ error: "Données manquantes" }, { status: 400 });
  }

  // Lecture du fichier en buffer
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  // Envoi du mail via Resend
  try {
    const data = await resend.emails.send({
      from: "Formulaire ID 3D Concept <onboarding@resend.dev>",
      to: "info@id3dconcept.com",
      subject: "Nouveau formulaire depuis le site",
      html: `
        <p><b>Nom :</b> ${name}</p>
        <p><b>Email :</b> ${email}</p>
        <p><b>Message :</b><br>${message.replace(/\n/g, "<br>")}</p>
      `,
      attachments: [
        {
          filename: file.name,
          content: buffer,
        }
      ],
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: "Erreur lors de l'envoi du mail." }, { status: 500 });
  }
}
