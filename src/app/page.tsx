"use client";
import React, { useState } from "react";

export default function Home() {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files?.[0] || null);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-2xl font-bold mb-4">Upload de fichier STL ou image</h1>
      <input
        type="file"
        accept=".stl,image/*"
        onChange={handleFileChange}
        className="mb-4"
      />
      {file && (
        <div className="p-4 bg-green-100 rounded-xl mb-4">
          <p>✅ Fichier reçu : {file.name}</p>
        </div>
      )}
      {/* Place ici ton formulaire de contact */}
      <form className="flex flex-col gap-2 w-64">
        <input type="text" placeholder="Nom" className="border p-2 rounded" required />
        <input type="email" placeholder="Email" className="border p-2 rounded" required />
        <textarea placeholder="Votre message..." className="border p-2 rounded" required />
        <button type="submit" className="bg-blue-600 text-white py-2 rounded mt-2 hover:bg-blue-700">
          Envoyer
        </button>
      </form>
    </main>
  );
}
