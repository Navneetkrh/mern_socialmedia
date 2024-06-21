import { Sidebar } from '../Sidebar'
import profile from "../../assets/profile.jpeg"
import { useNavigate } from 'react-router-dom';
import { Sidebarforprofile } from '../Sidebarprofile';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Post from '../feed/Post';
import logo from "../../assets/insidelogo.png";

export function Filteredpost() {
    let navigate = useNavigate();
    const userdata = JSON.parse(localStorage.getItem('userdata'));
    console.log(userdata);

    useEffect(() => {
        if (!userdata) {
            console.log("Not logged in");
            navigate('/login');
        } else {
            console.log("Logged in");
        }
    }, [userdata, navigate]);

    return (
        <div className="flex">
            <aside className="w-56 fixed left-0 top-0 pb-10 h-screen bg-[#1E1E1E]">
                <Sidebar image={profile} name={(!userdata) ? "please login" : userdata.name} />
            </aside>
            <main className="flex-1 ml-56">
                <Fetchmypost userdata={userdata} />
            </main>
            <aside className="w-56 fixed right-0 top-0 pb-10 h-screen bg-[#1E1E1E]">
                <Sidebarforprofile />
            </aside>
        </div>
    );
}


export const Fetchmypost = ({ userdata }) => {
    const [mypost, setMypost] = useState([]);

    useEffect(() => {
        if (!userdata) return;

        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userdata.token}`
            }
        };

        const mypostfetcher = async () => {
            try {
                const response = await axios.get(`/api/feed/mypost/${userdata._id}`, config);
                const posts = response.data.map((post) => (
                    <Post
                        key={post._id}
                        id={post._id}
                        title={post.title}
                        text={post.text}
                        photo={post.photo}
                        userphoto={post.postedby?.photo?.url}
                        username={post.postedby?.name}
                    />
                )).reverse();
                setMypost(posts);
                console.log(response.data);
            } catch (error) {
                console.log(error);
                console.log(error.response);
            }
        };

        mypostfetcher();
    }, [userdata]);

    return (
        <div className={"flex flex-col bg-[#1e1e1e] text-center"}>
            <div className={"flex flex-row justify-center bg-bakc"}>
                <img className={"w-1/6 h-1/6 -my-10"} src={logo} />
            </div>
            {mypost}
        </div>
    );
}
