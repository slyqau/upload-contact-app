'use client';

import { useState } from 'react';

export default function Home() {
  // const [file, setFile] = useState<File | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  // Simule l’envoi, à remplacer par ta logique plus tard
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    // Ici, upload à faire plus tard si besoin
  };

  return (
    <div className="w-full max-w-lg bg-dark rounded-xl p-8 shadow-lg">
      <h2 className="text-primary text-2xl font-bold mb-6 text-center">Upload de fichier STL ou image</h2>
      {sent ? (
        <div className="text-center text-primary font-semibold text-lg">Merci, votre message a bien été envoyé !</div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="file"
            accept=".stl,image/*"
            className="block w-full bg-light p-2 border border-primary rounded"
            onChange={() => {}}   {/* <<< Ici ! */}
            required
          />
          <input
            type="text"
            placeholder="Nom"
            className="block w-full bg-light p-2 border border-primary rounded"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            className="block w-full bg-light p-2 border border-primary rounded"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <textarea
            placeholder="Votre message..."
            className="block w-full bg-light p-2 border border-primary rounded"
            rows={4}
            value={message}
            onChange={e => setMessage(e.target.value)}
          />
          <button
            type="submit"
            className="w-full bg-primary text-white p-2 rounded hover:bg-opacity-90 transition font-semibold"
          >
            Envoyer
          </button>
        </form>
      )}
    </div>
  );
}
