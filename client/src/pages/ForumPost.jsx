import React from 'react';
import { useParams } from 'react-router-dom';
import { useLocation} from "react-router-dom"


const posts = [
    { title: 'Post 1', content: 'This is the content of the first post. It is longer than 120 characters so that we can see the truncation in action.' },
    { title: 'Post 2', content: 'This is the content of the second post. It is also longer than 120 characters for the same reason.hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh' },
    // Add more posts as needed
];


export function ForumPost(props) {
    // const location = useLocation();
    const { state} =location;
    console.log(props.location);
    return(
        <div className="flex flex-col " >
            <div className=''></div>            
        </div>
    )

}