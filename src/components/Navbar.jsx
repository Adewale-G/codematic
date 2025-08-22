'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
  const [isBanana, setIsBanana] = useState(false);

  return (
    <nav className="bg-gray-800 p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2 text-white text-lg font-bold">
          <Image src="/codematic.png" alt="Codematic" width={32} height={32} />
          Codematic Gist
        </Link>
        <button className="md:hidden text-white" onClick={() => setIsBanana(!isBanana)}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={isBanana ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
            />
          </svg>
        </button>
        <div className={`md:flex space-x-4 ${isBanana ? 'block' : 'hidden'}`}>
          <Link href="/" className="text-white hover:text-green-500">Home</Link>
          <Link href="/Notifications" className="text-white hover:text-green-500">Notifications</Link>
          <Link href="/Messages" className="text-white hover:text-green-500">Messages</Link>
          <Link href="/Profile" className="text-white hover:text-green-500">Profile</Link>
        </div>
      </div>
    </nav>
  );
}