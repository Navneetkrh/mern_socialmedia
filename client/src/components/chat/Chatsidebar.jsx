import React, { useEffect, useState } from "react";
import axios from 'axios';

export function Chatdata({ chatId , username , setCheck}) {
  const [chatContent, setChatContent] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const userdata = JSON.parse(localStorage.getItem('userdata'));

  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${userdata.token}`
    }
  };
  console.log(chatId);
 
  console.log(username);
  // const handleChatClick = (chatId) => {
  //   axios.get(`/api/message/${chatId}`, config).then((response) => {
  //     setSelectedChat(chatId);
  //     setChatContent(response.data);
  //   }).catch((error) => {
  //     console.log("Error fetching chat content:", error);
  //   });
  // };
  // handleChatClick(chatId);

  useEffect(() => {
    if(chatId) {
      axios.get(`/api/message/${chatId}`, config).then((response) => {
        setChatContent(response.data);
      }).catch((error) => {
        console.log("Error fetching chat content:", error);
      });
    }
  }, [chatId]);
  return (
    <div className="p-4 ml-4 rounded-xl min-h-full w-full bg-grayish">
    {/* <h3 className="font-bold mb-2">Chat Content</h3> */}
    <p className="text-white">{username}</p>
    
    {chatContent.map((message, index) => (
      <div key={index} className={`p-2 mb-2 flex ${message.sender.name === username ? "justify-end" : "justify-start"}`}>
        <p className={`inline-block px-4 py-2 rounded-3xl opacity-75 ${message.sender.name === username ? " text-right bg-graychat" : "text-left bg-red-500"}`}>
          {message.content}
        </p>
      </div>
    ))}
    <button 
      onClick={() => {
        setSelectedChat(null);
        setCheck(false);
        setChatContent([]);
      }}
      className="p-2 border mt-2"
    >
      Close
    </button>
    <div className="relative bottom-0 left-0 w-full p-4 rounded-3xl opacity-75">
    <button className="w-full p-4 bg-blacka text-white rounded-3xl opacity-75 shadow-md hover:bg-blue-600">
      Type text
    </button>
  </div>
    
  </div>
  
  );
}

export function Chatsidebar({SetUsername,SetChatId, SetCheck}) {
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

  const onClick = (username,chatId,check) => {
    SetUsername(username);
    SetChatId(chatId);
    SetCheck(check);
    console.log("clicked");
    console.log(username);
    console.log(chatId);
    console.log(check);
  }

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
          className="h-12 w-56 rounded-3xl mb-11 text-center border-gray-500 focus:ring-2 focus:ring-blue-600"
        />
      </div>

      <div className="ov
      erflow-y-auto scrollbar-track-inherit scrollbar-thin scrollbar-track-transparent p-1">
        <ul>
          {filteredChats.map((chat, index) => (
            <li key={chat._id} >
            <div className="p-1 mb-2">
              <button 
                onClick={() => onClick(chat.users[1].name,chat._id,true)}
                className={`flex items-center  justify-start transform hover:scale-105 motion-reduce:transform-none h-14 w-52 rounded-3xl gap-2 text-black border p-2 ${index % 3 === 0 ? 'bg-bluechat' : index% 3 == 1? 'bg-greenish' : 'bg-yellowish'}`}
              >
                <div className="rounded-full w-10 h-10 bg-white my-4 ">
                </div>
                <p>
                  {chat.users && chat.users[1] && chat.users[1].name}
                </p>

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
