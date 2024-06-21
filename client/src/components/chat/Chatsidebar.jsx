import React, { useEffect, useState } from "react";
import axios from 'axios';
// import { set } from "mongoose";

export function Chatdata({ chatId, username, setCheck }) {
  const [chatContent, setChatContent] = useState([]); // for displaying chat content
  const [message, setMessage] = useState('');  // for sending message
  const [isSubmitting, setIsSubmitting] = useState(false); // to manage submission state

  // for auth of user
  const userdata = JSON.parse(localStorage.getItem('userdata'));
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${userdata.token}`
    }
  };

  // fetching the chat content
  useEffect(() => {
    if (chatId) {
      axios.get(`/api/message/${chatId}`, config).then((response) => {
        setChatContent(response.data);
      }).catch((error) => {
        console.log("Error fetching chat content:", error);
      });
    }
  }, [chatId]);

  // add new message to chat
  const handleSubmit = async () => {
    if (!message.trim() || isSubmitting) return;
    setIsSubmitting(true);
    try {
      const response = await axios.post('/api/message', { content: message, chatId }, config);
      setChatContent([...chatContent, response.data]); // Update the chat content with the new message
      setMessage(''); // Clear the input after submission
    } catch (error) {
      console.error('Error adding message:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // use of enter key to send message
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault(); // prevent the default form submission behavior
      handleSubmit();
    }
  };

  return (
    <div className="flex flex-col h-full  bg-grayish rounded-xl mx-3 ">
      <div className="flex bg-bluechat h-24 rounded-t-xl p-4">
        <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" alt="profile" className="w-16 h-16 rounded-full mx-4" />
        <div className="flex flex-col">
          <h1 className="text-black font-bold text-3xl whitespace-nowrap">Firstname Lastname</h1>
          <h2 className="text-black font-bold text-xl">@{username}</h2>
        </div>
        <div className="w-full flex justify-end items-center">
          <div className="flex items-center">
            <img src="/imagecall.png" alt="call" className="w-14 h-12 mx-2" />
            <img src="/imagephone.png" alt="videocall" className="w-16 h-16 mx-2" />
          </div>
        </div>
      </div>

      <div className="flex-grow overflow-y-auto scrollbar-thin scrollbar-thumb-bluechat scrollbar-track-grayish px-4 bg-grayish text-white">
        <ul>
          {
            chatContent.map((message, index) => (
              <li key={index} className={`flex`}>
                {message.sender.name !== username && <div className="w-3/4"></div>}
                {message.sender.name !== username && <div className="flex-grow"></div>}
                <div className={`${message.sender.name !== username ? "bg-gray-300" : "bg-yellow-300"} text-black font-semibold my-2 rounded-3xl p-4`}>
                  {message.content}
                </div>
                {message.sender.name === username && <div className="flex-grow"></div>}
                {message.sender.name === username && <div className="w-3/4"></div>}
              </li>
            ))
          }
        </ul>
      </div>

      <div className="w-full h-20 p-2">
        <div className="bg-black rounded-full w-full h-16 flex items-center p-2">
          <textarea
            className="bg-black flex-grow h-full border-none rounded-full p-2 resize-none text-white text-center placeholder-center"
            rows="1"
            placeholder="Write Something..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyPress}
          />
          <button type="button" onClick={handleSubmit}>
            <img src="/send/image.png" alt="send" className="w-12 h-12 p-1 rounded-full bg-bluechat hover:scale-105" />
          </button>
        </div>
      </div>
    </div>
  );
}

export function Chatsidebar({ SetUsername, SetChatId, SetCheck }) {
  const [search, setSearch] = useState('');
  const [chats, setChats] = useState([]);
  const [filteredChats, setFilteredChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [chatContent, setChatContent] = useState([]);
  const [users, setUsers] = useState([]);
  const [showUsers, setShowUsers] = useState(false);
  const [newusers , setNewUsers] = useState([]);

  // For auth
  const userdata = JSON.parse(localStorage.getItem('userdata'));

  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${userdata.token}`
    }
  };

  const onClick = (username, chatId, check) => {
    SetUsername(username);
    SetChatId(chatId);
    SetCheck(check);
    console.log("clicked");
    console.log(username);
    console.log(chatId);
    console.log(check);
  };

  const handleSearchChange = (event) => {
    const value = event.target.value.toLowerCase();
    if (value === '') {
      setShowUsers(false);
    } else {
      setShowUsers(true);
    }
    setSearch(value);
    setFilteredChats(chats.filter(chat => chat.users[1].name.toLowerCase().includes(value)));
    setNewUsers(users.filter(user => user.name.toLowerCase().includes(value)));  
  };

  const chatfetcher = () => {
    axios.get("/api/chat", config).then((response) => {
      setChats(response.data);
      setFilteredChats(response.data);
    }).catch((error) => {
      console.log("Error fetching chats:", error);
    });
  };

  useEffect(() => {
    chatfetcher();
  }, []);

  const addusers = () => {
    axios.get("/api/user/fetchUsers", config).then((response) => {
      const filteredUsers = response.data.filter(user => !chats.some(chat => chat.users.some(chatUser => chatUser._id === user._id)));
      setUsers(filteredUsers);
      setNewUsers(filteredUsers);
      setShowUsers(false);
    }).catch((error) => {
      console.log("Error fetching users:", error);
    });
  };

  useEffect(() => {
    addusers();
  }, []);


  const createnewchat = (selectedUserId, username) => {
    const existingChat = chats.find(chat => chat.users.some(user => user._id === selectedUserId));

    if (existingChat) {
      onClick(username, existingChat._id, true);
    } else {
      axios.post("/api/chat", { userId: selectedUserId }, config).then((response) => {
        const newChat = response.data;
        setChats([...chats, newChat]);
        setFilteredChats([...chats, newChat]);
        setNewUsers(newusers.filter(user => user._id !== selectedUserId));
        if (newusers.length === 1) {
          setShowUsers(false);
        }
        onClick(username, newChat._id, true);
        setShowUsers(false);
        addusers();
      }).catch((error) => {
        console.log("Error creating new chat:", error);
      });
    }
  };

  return (
    <div className="flex flex-col h-full p-4 bg-grayish rounded-xl w-64">
      <div className="relative">
        <input 
          type="text" 
          placeholder="Search user..." 
          value={search}
          onChange={handleSearchChange}
          className="h-12 w-56 text-white rounded-3xl mb-11 text-center bg-grayish border-2 border-gray-400 focus:ring-2 focus:ring-blue-600"
        />
      </div>

      <div className="overflow-y-auto scrollbar-track-inherit scrollbar-thin scrollbar-track-transparent p-1">
        <ul>
          {filteredChats.map((chat, index) => (
            <li key={chat._id}>
              <div className="p-1 mb-2">
                <button 
                  onClick={() => onClick(chat.users[1].name, chat._id, true)}
                  className={`flex items-center justify-start transform hover:scale-105 motion-reduce:transform-none h-14 w-52 rounded-3xl gap-2 text-black p-2 ${index % 3 === 0 ? 'bg-bluechat' : index % 3 === 1 ? 'bg-greenish' : 'bg-yellowish'}`}
                >
                  <div className="rounded-full w-10 h-10 bg-white my-4 "></div>
                  <p className="font-semibold">
                    {chat.users && chat.users[1] && chat.users[1].name}
                  </p>
                </button>
              </div>
            </li>
          ))}
        </ul>

      {showUsers && (
        <ul>
          <div className="p-1 mb-2">
            <p className="font-semibold text-white">New Users</p>
            </div>
            {newusers.map((user,index) => (
              <li key={user._id} className="p-1 mb-2">
                <button 
                  onClick={() => createnewchat(user._id, user.name)} 
                  className={`flex items-center justify-start transform hover:scale-105 motion-reduce:transform-none h-14 w-52 rounded-3xl gap-2 text-black p-2 ${index % 3 === 0 ? 'bg-bluechat' : index % 3 === 1 ? 'bg-greenish' : 'bg-yellowish'}`}
                  >
                  <div className="rounded-full w-10 h-10 bg-white my-4"></div>
                  <p className="font-semibold">{user.name}</p>
                </button>
              </li>
            ))}
          </ul>
      )}
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
