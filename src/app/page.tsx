// app/signup/page.js
import Image from 'next/image';
import Link from 'next/link';

export default function Signup() {
  return (
    <div className="p-10 max-w-md mx-auto mt-20 bg-gray-50 rounded-lg shadow-md">
      <div className="text-center mb-8">
        <Image
          src="/logo.png" // Replace with your logo path
          alt="Banana Logo"
          width={100}
          height={100}
          className="rounded-full mx-auto"
        />
        <h1 className="text-gray-800 text-2xl">Banana</h1>
      </div>
      <form>
        <input 
          type="email" 
          placeholder="Email" 
          required 
          className="block w-full mb-4 p-2.5 border border-gray-300 rounded-md"
        />
        <input 
          type="password" 
          placeholder="Password" 
          required 
          className="block w-full mb-4 p-2.5 border border-gray-300 rounded-md"
        />
        <Link
            href="/Home"
            className="block w-full p-2.5 bg-green-500 text-white text-center rounded-md hover:bg-green-600"
          >
            Sign Up
          </Link>
          </form>
    </div>
  );
}
