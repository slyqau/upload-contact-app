'use client';

import { useState } from 'react';

export default function Home() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  // Correctement typé et async !
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    // Ceinture et bretelles, on force bien les states dans le formData
    formData.set('name', name);
    formData.set('email', email);
    formData.set('message', message);

    const response = await fetch('/api/contact', {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      setSent(true);
    } else {
      let error = "Erreur à l'envoi du message !";
      try {
        const resJson = await response.json();
        error = resJson?.error?.message || error;
      } catch {}
      alert(error);
    }
    setSending(false);
  };

  return (
    <div className="min-h-screen bg-[#378099] flex flex-col items-center justify-center relative font-sans">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md px-8 py-10 flex flex-col items-center">
        <img
          src="/logo.png"
          alt="Logo ID 3D Concept"
          className="rounded-full border-4 border-[#2B241B] shadow-lg w-40 h-40 object-cover mb-6"
        />
        <h2 className="text-[#378099] text-2xl font-extrabold mb-2 text-center">
          Téléchargement de fichier STL ou image
        </h2>
        <p className="text-[#E97413] text-center mb-4">Vos idées prennent forme</p>
        {sent ? (
          <div className="text-center text-[#378099] font-semibold text-lg">
            Merci, votre message a bien été envoyé !
          </div>
        ) : (
          <form onSubmit={handleSubmit} encType="multipart/form-data" className="w-full space-y-4">
            <label className="block">
              <span className="text-[#2B241B] font-semibold">Fichier</span>
              <input
                type="file"
                name="file"
                accept=".stl,image/*"
                className="mt-1 block w-full rounded border border-[#378099] bg-white text-[#2B241B] file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-[#378099] file:text-white hover:file:bg-[#2B241B] transition"
                required
              />
            </label>
            <input
              type="text"
              name="name"
              placeholder="Nom"
              className="block w-full bg-white p-2 border border-[#378099] rounded text-[#2B241B] placeholder:text-[#378099]/80"
              value={name}
              onChange={e => setName(e.target.value)}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="block w-full bg-white p-2 border border-[#378099] rounded text-[#2B241B] placeholder:text-[#378099]/80"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
            <textarea
              name="message"
              placeholder="Votre message..."
              className="block w-full bg-white p-2 border border-[#378099] rounded text-[#2B241B] placeholder:text-[#378099]/80"
              rows={4}
              value={message}
              onChange={e => setMessage(e.target.value)}
            />
            <button
              type="submit"
              disabled={sending}
              className="w-full bg-[#2B241B] text-white p-2 rounded-lg font-bold text-lg hover:bg-[#378099] transition"
            >
              {sending ? 'Envoi...' : 'Envoyer'}
            </button>
          </form>
        )}
      </div>
      <footer className="mt-8 text-white opacity-80">
        <a href="https://id3dconcept.com" className="underline">
          id3dconcept.com
        </a>
      </footer>
    </div>
  );
}
