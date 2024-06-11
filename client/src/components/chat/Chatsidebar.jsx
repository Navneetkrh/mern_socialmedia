import React, { useEffect, useState } from "react";
import axios from 'axios';

export function Chatsidebar({ username }) {
  const [search, setSearch] = useState('');
  const [chats, setChats] = useState([]);
  const [filteredChats, setFilteredChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [chatContent, setChatContent] = useState([]);

  // For auth
  const userdata = JSON.parse(localStorage.getItem('userdata'));

  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${userdata.token}`
    }
  };

  const handleSearchChange = (event) => {
    const value = event.target.value.toLowerCase();
    setSearch(value);
    setFilteredChats(chats.filter(chat => chat.users[1].name.toLowerCase().includes(value)));
  };

  const chatfetcher = () => {
    axios.get("/api/chat", config).then((response) => {
      setChats(response.data);
      setFilteredChats(response.data);
    }).catch((error) => {
      console.log("Error fetching chats:", error);
    });
  };

  const handleChatClick = (chatId) => {
    axios.get(`/api/message/${chatId}`, config).then((response) => {
      setSelectedChat(chatId);
      setChatContent(response.data);
    }).catch((error) => {
      console.log("Error fetching chat content:", error);
    });
  };

  useEffect(() => {
    chatfetcher();
  }, []);

  return (
    <div className="flex flex-col h-full p-4 bg-grayish rounded-xl w-64">
      <div className="relative">
        <input 
          type="text" 
          placeholder="Search..." 
          value={search} 
          onChange={handleSearchChange} 
          className="h-12 w-56 rounded-3xl mb-2 text-center border-gray-500 focus:ring-2 focus:ring-blue-600"
        />
      </div>

      <div className="overflow-y-auto scrollbar-track-inherit scrollbar-thin scrollbar-track-transparent">
        <ul>
          {filteredChats.map((chat, index) => (
            <li key={chat._id} >
              <div className="border p-2 mb-2">
                <button 
                  onClick={() => handleChatClick(chat._id)}
                  className={`transform hover:scale-110 motion-reduce:transform-none w-full text-center text-black border p-2 ${index % 2 === 0 ? 'bg-green-300' : 'bg-blue-300'}`}
                >
                  {chat.users && chat.users[1] && chat.users[1].name}
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {selectedChat && chatContent.length > 0 && (
        <div className="p-4 mt-4 rounded shadow bg-white">
          <h3 className="font-bold mb-2">Chat Content</h3>
          {chatContent.map((message, index) => (
            <div key={index} className="p-2 border-b mb-2">
              <p>{message.content}</p>
            </div>
          ))}
          <button 
            onClick={() => {
              setSelectedChat(null);
              setChatContent([]);
            }} 
            className="p-2 rounded border mt-2"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}
