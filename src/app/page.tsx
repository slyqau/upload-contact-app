'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';


export default function Home() {
  const STLViewer = dynamic(() => import('../components/STLViewer'), { ssr: false });
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [stlURL, setStlURL] = useState<string | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!name.trim()) newErrors.name = 'Nom requis';
    if (!email.trim()) newErrors.email = 'Email requis';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = 'Email invalide';
    if (!phone.trim()) newErrors.phone = 'Téléphone requis';
    if (!file) newErrors.file = 'Fichier requis';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('phone', phone);
    if (file) formData.append('file', file);

    const res = await fetch('/api/lead', {
      method: 'POST',
      body: formData,
    });

    if (res.ok) window.location.href = '/confirmation';
  };

  useEffect(() => {
    if (!file) {
      setImagePreview(null);
      setStlURL(null);
      return;
    }
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
      setStlURL(null);
    } else if (file.name.toLowerCase().endsWith('.stl')) {
      const url = URL.createObjectURL(file);
      setStlURL(url);
      setImagePreview(null);
      return () => URL.revokeObjectURL(url);
    } else {
      setImagePreview(null);
      setStlURL(null);
    }
  }, [file]);

  // Marron logo : #7b573a
  const labelStyle = "block font-semibold mb-1 text-[#7b573a]";
  return (
    <main className="min-h-screen bg-[#2f7c91] p-6 flex flex-col items-center">
      <div className="mb-6">
        <Image src="/logo.png" alt="ID 3D Concept Logo" width={280} height={120} />
      </div>
      <h1 className="text-3xl font-extrabold text-white mb-6 text-center">Demande de devis personnalisé</h1>
      <form onSubmit={handleSubmit} className="bg-white shadow-xl rounded-lg p-8 w-full max-w-xl space-y-6">
        <div>
          <label className={labelStyle}>Nom</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full border p-2 rounded" />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        </div>
        <div>
          <label className={labelStyle}>Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full border p-2 rounded" />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </div>
        <div>
          <label className={labelStyle}>Téléphone</label>
          <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full border p-2 rounded" />
          {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
        </div>
        <div>
          <label className={labelStyle}>Fichier (STL ou image)</label>
          <input type="file" accept=".stl,image/*" onChange={(e) => setFile(e.target.files?.[0] || null)} className="w-full border p-2 rounded bg-white" />
          {errors.file && <p className="text-red-500 text-sm">{errors.file}</p>}
        </div>
        {imagePreview && (
          <div>
            <p className={labelStyle}>Aperçu de l’image :</p>
            <img src={imagePreview} alt="Image preview" className="max-w-full h-auto rounded shadow" />
          </div>
        )}
        {stlURL && (
          <div>
            <p className={labelStyle}>Aperçu du fichier STL :</p>
            <div className="w-full h-[300px] border rounded bg-gray-50">
              <STLViewer url={stlURL} key={stlURL} />
            </div>
          </div>
        )}
        <button
          type="submit"
          disabled={!name || !email || !phone || !file}
          className="w-full bg-[#225e6c] hover:bg-[#1b4b57] text-white font-semibold px-4 py-2 rounded disabled:opacity-50"
        >
          Envoyer ma demande
        </button>
      </form>
    </main>
  );
}
