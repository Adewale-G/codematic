"use client";
import { useState, useEffect, createContext, useContext } from 'react';

// TypeScript interfaces
interface User { name: string; avatar: string; }
interface Tweet { id: number; user: string; content: string; likes: number; avatar?: string; }
interface UserContextType { user: User | null; setUser: (user: User) => void; }

// Create Context
const UserContext = createContext<UserContextType>({ user: null, setUser: () => {} });

// Sample tweets
const initialTweets: Tweet[] = [
  { id: 1, user: 'User1', content: 'Hello world!', likes: 5 },
  { id: 2, user: 'User2', content: 'Loving Next.js!', likes: 3 },
];

// User Provider
function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>({ name: 'Guest', avatar: '/avatar.png' });
  return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
}

// Tweet Component
function Tweet({ tweet }: { tweet: Tweet }) {
  const [likes, setLikes] = useState<number>(tweet.likes);
  return (
    <div className="p-4 border-b border-gray-200 bg-white">
      <div className="flex items-start gap-3">
        <img src={tweet.avatar || '/avatar.png'} alt="avatar" className="w-10 h-10 rounded-full" />
        <div>
          <p className="font-bold text-gray-900">{tweet.user}</p>
          <p className="text-gray-600">{tweet.content}</p>
          <button className="mt-2 text-red-500 hover:text-red-600" onClick={() => setLikes(likes + 1)}>
            ❤️ {likes}
          </button>
        </div>
      </div>
    </div>
  );
}

// Navbar Component
function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <nav className="bg-blue-500 text-white p-4">
      <div className="max-w-4xl mx-auto flex justify-between items-center">
        <a href="/" className="text-xl font-bold">Mini Twitter</a>
        <div className="hidden md:flex gap-4">
          <a href="/" className="hover:text-gray-200">Home</a>
          <a href="/profile" className="hover:text-gray-200">Profile</a>
        </div>
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>{isOpen ? '✕' : '☰'}</button>
      </div>
      {isOpen && (
        <div className="md:hidden flex flex-col gap-2 mt-2">
          <a href="/" className="hover:text-gray-200" onClick={() => setIsOpen(false)}>Home</a>
          <a href="/profile" className="hover:text-gray-200" onClick={() => setIsOpen(false)}>Profile</a>
        </div>
      )}
    </nav>
  );
}

// Main Feed Component
function TwitterFeed() {
  const { user } = useContext(UserContext);
  const [tweets, setTweets] = useState<Tweet[]>(initialTweets);
  const [newTweet, setNewTweet] = useState<string>('');

  useEffect(() => {
    setTimeout(() => setTweets(initialTweets), 1000);
  }, []);

  const handleTweet = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTweet.trim() && user) {
      setTweets([{ id: Date.now(), user: user.name, content: newTweet, likes: 0, avatar: user.avatar }, ...tweets]);
      setNewTweet('');
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4 bg-gray-50">
      <h1 className="text-2xl font-bold text-gray-900 mb-4">Mini Twitter</h1>
      <form onSubmit={handleTweet} className="mb-4">
        <textarea
          value={newTweet}
          onChange={(e) => setNewTweet(e.target.value)}
          placeholder="What's happening?"
          className="w-full p-3 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
          rows={3}
        />
        <button type="submit" className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
          Tweet
        </button>
      </form>
      <div>
        {tweets.map((tweet) => (
          <Tweet key={tweet.id} tweet={tweet} />
        ))}
      </div>
    </div>
  );
}

// Page Component
export default function Page() {
  return (
    <UserProvider>
      <Navbar />
      <TwitterFeed />
    </UserProvider>
  );
}