import React, { useState } from "react";

export function Chatsidebar({ username }) {
  const [search, setSearch] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
    setIsSearchOpen(true);
    // You can add a function here to handle the search functionality
  };

  const chats = ['Chat 1', 'Chat 2', 'Chat 3'];

  return (
    <div className="flex flex-col h-full p-4 bg-grayish rounded-xl">
      <div className="relative">
        <input 
          type="text" 
          placeholder="Search..." 
          value={search} 
          onChange={handleSearchChange} 
          className=" h-12 w-56 rounded-3xl mb-2 text-center bg-grayish border-2 border-gray-500"
        />
        {isSearchOpen && (
          <div className="absolute top-full mt-2 w-full bg-white p-4 rounded border">
            {/* Replace this with your search results */}
            <p>Search results for "{search}"</p>
            <button 
              onClick={() => setIsSearchOpen(false)} 
              className="p-2 rounded border mt-2"
            >
              Close
            </button>
          </div>
        )}
      </div>

      <div className="overflow-y-auto scrollbar scrollbar-thumb-gray-500 scrollbar-track-gray-100">
        {chats.map((chat, index) => (
          <div key={index} className="p-2 hover:bg-gray-300 rounded cursor-pointer">
            {chat}
          </div>
        ))}
      </div>
    </div>
  );
}