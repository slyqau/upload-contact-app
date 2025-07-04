import { NextRequest, NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';
import { mkdirSync, existsSync } from 'fs';

export async function POST(req: NextRequest) {
  const formData = await req.formData();

  const file: File | null = formData.get('file') as unknown as File;
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const phone = formData.get('phone') as string;

  if (!file || !name || !email || !phone) {
    return NextResponse.json({ success: false, message: 'Champs manquants' }, { status: 400 });
  }

  // Crée le dossier public/uploads si inexistant
  const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
  if (!existsSync(uploadsDir)) {
    mkdirSync(uploadsDir);
  }

  // Génère un nom de fichier unique basé sur un seul timestamp
  const timestamp = Date.now();
  const filename = `${timestamp}_${file.name}`;
  const filepath = path.join(uploadsDir, filename);

  // Convertit et écrit le fichier
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  await writeFile(filepath, buffer);

  // Écrit les infos dans un fichier JSON
  const info = {
    name,
    email,
    phone,
    file: filename,
    date: new Date().toISOString(),
  };
  const infoPath = path.join(uploadsDir, `${timestamp}_infos.json`);
  await writeFile(infoPath, JSON.stringify(info, null, 2));

  // Retourne succès
  return NextResponse.json({ success: true });
}
