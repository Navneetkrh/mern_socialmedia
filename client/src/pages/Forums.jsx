import { TextField } from '@mui/material';
import React, { useState } from 'react';
import { PiTextbox } from 'react-icons/pi';

import {Link, NavLink} from  "react-router-dom";


const posts = [
    { title: 'Post 1', content: 'This is the content of the first post. It is longer than 120 characters so that we can see the truncation in action.' },
    { title: 'Post 2', content: 'This is the content of the second post. It is also longer than 120 characters for the same reason.hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh' },
    // Add more posts as needed
];
export function Forums(){
    const [currentForum, setCurrentForum] = useState('Default');
    return (
        <div className="flex flex-col h-screen w-screen items-center justify-start ">
            <div><input placeholder='Search Forums' className='m-5 h-9 w-80 p-2 bg-grayish rounded-default'></input></div>
            <div className='text-white text-xl text-start w-1/3'>{currentForum}</div>
            <div className='m-5 h-28 w-1/3'><textarea type="text" placeholder="Create Post Here...." className="bg-grayish h-full w-full border-none rounded-default text-white text-start p-2 resize-none" ></textarea></div>
            <div className='w-1/3 flex flex-row justify-start'> 
                <button className='rounded-default bg-grayish w-24 h-10 text-white  hover:text-blackish'  >    Post</button>
            </div>
            <ul className='w-1/3'>
                {posts.map((post, index) => (
                    <NavLink to={{pathname:"/forumPost/"+index}} >
                    <li key={index} >
                        <div className='bg-grayish rounded-default my-5 text-start text-white p-2'>
                            <h2>{post.title}</h2>
                            <p>{post.content.substring(0, 100)}</p>
                        </div>
                    </li>
                    </NavLink>
                ))}
            </ul>
        </div>
    );
}

