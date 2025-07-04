import { NextResponse } from 'next/server';
import { readdirSync, readFileSync } from 'fs';
import path from 'path';

export async function GET() {
 const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
  const files = readdirSync(uploadsDir);
  const leads = files
    .filter((f) => f.endsWith('.json'))
    .map((f) => {
      const content = readFileSync(path.join(uploadsDir, f), 'utf-8');
if (!content.trim()) return null; // ignorer les fichiers vides
return JSON.parse(content);
    });

  return NextResponse.json(leads);
}
