import './globals.css';

export const metadata = {
  title: 'ID 3D Concept - Upload de Fichier',
  description: 'Service d\'upload et de contact ID 3D Concept',
};

import { ReactNode } from 'react';
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
      <body className="font-sans bg-light min-h-screen">
        <header className="bg-primary flex items-center px-8 py-4 shadow">
          <img src="/logo.png" alt="ID 3D Concept" className="h-14" />
          {/* Ajoute ici la navigation ou autre si besoin */}
        </header>
        <main className="flex justify-center items-center flex-col min-h-[80vh]">
          {children}
        </main>
        <footer className="text-center py-4 text-dark opacity-70 text-sm">
          &copy; {new Date().getFullYear()} ID 3D Concept
        </footer>
      </body>
    </html>
  );
}
