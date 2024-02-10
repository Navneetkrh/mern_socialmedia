import React, { useState } from "react";

export function Chatsidebar({ username }) {
    const [search, setSearch] = useState('');

    const handleSearchChange = (event) => {
        setSearch(event.target.value);
        // You can add a function here to handle the search functionality
    };

    // This is a placeholder for chat names, replace it with your actual data
    const chats = ['Chat 1', 'Chat 2', 'Chat 3'];

    return (

        <div className="flex flex-col h-full p-4 bg-grayish rounded-xl py-5 ">
 

     <input type={"text"} className={" h-12 w-56 rounded-3xl mb-2 text-center bg-grayish border-2 border-gray-500 "} placeholder={"Type to Search"}/>
    
    

  <div className="overflow-y-auto  scrollbar-thin scrollbar-thumb-greenish scrollbar-track-transparent">

    {chats.map((chat, index) => (
      <div key={index} className="p-2 hover:bg-gray-300 rounded cursor-pointer">
        {chat}
      </div>
    ))}
    {chats.map((chat, index) => (
      <div key={index} className="p-2 hover:bg-gray-300 rounded cursor-pointer">
        {chat}
      </div>
    ))}
    {chats.map((chat, index) => (
      <div key={index} className="p-2 hover:bg-gray-300 rounded cursor-pointer">
        {chat}
      </div>
    ))}{chats.map((chat, index) => (
      <div key={index} className="p-2 hover:bg-gray-300 rounded cursor-pointer">
        {chat}
      </div>
    ))}
    {chats.map((chat, index) => (
      <div key={index} className="p-2 hover:bg-gray-300 rounded cursor-pointer">
        {chat}
      </div>
    ))}
  </div>
</div>
    );
}