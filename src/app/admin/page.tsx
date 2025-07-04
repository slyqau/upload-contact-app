'use client';

import { useEffect, useState } from 'react';

type Lead = {
  name: string;
  email: string;
  phone: string;
  file: string;
  date: string;
};

export default function AdminPage() {
  const [leads, setLeads] = useState<Lead[]>([]);

  useEffect(() => {
    const fetchLeads = async () => {
      const res = await fetch('/api/leads');
      const data = await res.json();
      setLeads(data);
    };
    fetchLeads();
  }, []);

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Liste des demandes</h1>
      <ul>
        {leads.map((lead, index) => (
          <li key={index} className="mb-4 border p-4 rounded">
            <p><strong>Nom :</strong> {lead.name}</p>
            <p><strong>Email :</strong> {lead.email}</p>
            <p><strong>Téléphone :</strong> {lead.phone}</p>
            <p><strong>Date :</strong> {new Date(lead.date).toLocaleString()}</p>
            <a
              href={`/uploads/${lead.file}`}
              download
              className="text-blue-500 underline mt-2 inline-block"
            >
              Télécharger fichier
            </a>
          </li>
        ))}
      </ul>
    </main>
  );
}
