// src/app/page.tsx

import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#232323]">
      <div className="flex flex-col items-center w-full max-w-md p-8 rounded-2xl shadow-2xl bg-white">
        <Image
          src="/logo.png"
          alt="ID 3D Concept Logo"
          width={120}
          height={120}
          className="mb-2"
        />
        <h1 className="text-2xl font-bold mb-2 text-[#232323] text-center">
          Upload de fichier STL ou image
        </h1>
        <p className="mb-6 text-[#ff8000] text-center">
          Vos idées prennent forme
        </p>
        <form
          className="flex flex-col gap-3 w-full"
          method="POST"
          action="/api/upload"
          encType="multipart/form-data"
        >
          <input
            type="file"
            name="file"
            accept=".stl,image/*"
            required
            className="border border-gray-200 p-2 rounded-lg"
          />
          <input
            type="text"
            name="name"
            placeholder="Nom"
            required
            className="border border-gray-200 p-2 rounded-lg"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            className="border border-gray-200 p-2 rounded-lg"
          />
          <textarea
            name="message"
            placeholder="Votre message…"
            rows={3}
            className="border border-gray-200 p-2 rounded-lg"
          />
          <button
            type="submit"
            className="bg-[#ff8000] text-white font-bold p-2 rounded-lg mt-2 transition hover:bg-orange-500"
          >
            Envoyer
          </button>
        </form>
      </div>
      <a
        href="https://id3dconcept.com"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-8 text-gray-400 hover:text-[#ff8000] transition"
      >
        id3dconcept.com
      </a>
    </div>
  );
}
