import React, { useEffect, useState } from "react";
import axios from 'axios';



export function Chatdata({ chatId, username, setCheck }) {
  const [chatContent, setChatContent] = useState([]);
  const userdata = JSON.parse(localStorage.getItem('userdata'));

  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${userdata.token}`
    }
  };

  useEffect(() => {
    if (chatId) {
      axios.get(`/api/message/${chatId}`, config).then((response) => {
        setChatContent(response.data);
      }).catch((error) => {
        console.log("Error fetching chat content:", error);
      });
    }
  }, [chatId]);

  return(
    <div className="flex flex-col h-full  bg-grayish rounded-xl mx-3 ">
  
    <div className="flex bg-blue-300 h-24 rounded-t-xl p-4">
    <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" alt="profile" className="w-16 h-16 rounded-full mx-4" />
    <div>
    <h1 className="text-black font-bold text-3xl">Firstname Lastname</h1>
    <h2 className="text-black font-bold text-xl">@{username}</h2>
    </div>
    
    </div>
    <div className="flex-grow overflow-y-auto scrollbar-thin scrollbar-thumb-bluechat scrollbar-track-grayish px-4 bg-grayish text-white"> 
    <ul >

      
        {
          chatContent.map((message, index) => (
            <li key={index} className={`flex`}>
              {message.sender.name === username && <div className="w-3/4"></div>}
              {message.sender.name === username && <div className="flex-grow"></div>}
               
              <div className={`${message.sender.name === username ? "bg-gray-300" : "bg-yellow-300"} h-12 text-black font-semibold my-2 rounded-full p-4`}>
                  {message.content}
              </div>
              {message.sender.name !== username && <div className="flex-grow"></div>}
              {message.sender.name !== username && <div className="w-3/4"></div>}
            </li>
          ))

        }
        {/* <li className="flex">
          <div className="bg-yellow-300 h-12 w-full my-2 rounded-full">
          
          </div>
          <div className="flex-grow"></div>
          <div className="w-3/4"></div>

        </li>

        <li className="flex">
          <div className="w-3/4"></div>
          <div className="flex-grow"></div>
          <div className="bg-gray-300 h-12 w-full my-2 rounded-full">
          
          </div>
        </li> */}
      

        
       </ul>
      </div>
     
      <div className="w-full h-20 p-2  ">
      <div className="bg-black rounded-full w-full h-16 ">

      </div>

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
          placeholder="Search user..." 
          value={search} 
          onChange={handleSearchChange} 
          className="h-12 w-56 rounded-3xl mb-11 text-center bg-grayish border-2 border-gray-400 focus:ring-2 focus:ring-blue-600"
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
                className={`flex items-center  justify-start transform hover:scale-105 motion-reduce:transform-none h-14 w-52 rounded-3xl gap-2 text-black  p-2 ${index % 3 === 0 ? 'bg-bluechat' : index% 3 == 1? 'bg-greenish' : 'bg-yellowish'}`}
              >
                <div className="rounded-full w-10 h-10 bg-white my-4 ">
                </div>
                <p className="font-semibold">
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
