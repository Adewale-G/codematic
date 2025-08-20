// src/app/page.tsx
"use client";
import { useState, useEffect, createContext, useContext } from 'react';

// Create Context for user data
const UserContext = createContext({ user: null, setUser: () => {} });

// Sample tweets data
const initialTweets = [
  { id: 1, user: 'User1', content: 'Hello world!', likes: 5 },
  { id: 2, user: 'User2', content: 'Loving Next.js!', likes: 3 },
];

// User Provider Component
function UserProvider({ children }) {
  const [user, setUser] = useState({ name: 'Guest', avatar: '/avatar.png' });
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

// Tweet Component
function Tweet({ tweet }) {
  const [likes, setLikes] = useState(tweet.likes);

  return (
    <div className="p-4 border-b border-gray-200">
      <div className="flex items-start gap-3">
        <img src="/avatar.png" alt="avatar" className="w-10 h-10 rounded-full" />
        <div>
          <p className="font-bold">{tweet.user}</p>
          <p className="text-gray-700">{tweet.content}</p>
          <button
            className="mt-2 text-red-500"
            onClick={() => setLikes(likes + 1)}
          >
            ❤️ {likes}
          </button>
        </div>
      </div>
    </div>
  );
}

// Main Feed Component
function TwitterFeed() {
  const { user } = useContext(UserContext); // Access context
  const [tweets, setTweets] = useState(initialTweets);
  const [newTweet, setNewTweet] = useState('');

  // Fetch tweets (simulated)
  useEffect(() => {
    setTimeout(() => {
      setTweets(initialTweets);
    }, 1000);
  }, []);

  const handleTweet = (e) => {
    e.preventDefault();
    if (newTweet.trim()) {
      setTweets([{ id: Date.now(), user: user.name, content: newTweet, likes: 0 }, ...tweets]);
      setNewTweet('');
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4 min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Mini Twitter</h1>
      
      {/* Tweet Input */}
      <form onSubmit={handleTweet} className="mb-4">
        <textarea
          value={newTweet}
          onChange={(e) => setNewTweet(e.target.value)}
          placeholder="What's happening?"
          className="w-full p-3 rounded-lg border border-gray-300 resize-none"
          rows="3"
        />
        <button
          type="submit"
          className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-lg"
        >
          Tweet
        </button>
      </form>

      {/* Tweet Feed */}
      <div>
        {tweets.map((tweet) => (
          <Tweet key={tweet.id} tweet={tweet} />
        ))}
      </div>
    </div>
  );
}

// Wrap TwitterFeed with UserProvider in the default export
export default function Page() {
  return (
    <UserProvider>
      <TwitterFeed />
    </UserProvider>
  );
}