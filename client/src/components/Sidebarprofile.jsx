import React from "react";
import {Link,NavLink} from "react-router-dom";

export function Sidebarforprofile(props){
    const userdata = JSON.parse(localStorage.getItem('userdata'));
    console.log(userdata);
    return (
        <nav className={" flex flex-col rounded-2xl bg-[#2E2F31] w-48  h-full pt-10 mb-10 m-5 "}>
            
            {
                    !userdata&&<div className={"flex-col"}>

                    <img src={"https://www.pngitem.com/pimgs/m/30-307416_profile-icon-png-image-free-download-searchpng-employee.png" }  alt={"logo"} className={"w-20 h-24 rounded-full mx-auto"}/>
                    <h1 className={"text-white text-center text-2xl font-bold"}>Welcome</h1>

                    <h1 className={"text-center text-lg text-[#9EBC87] font-bold"}>Please Login</h1>


                    </div>
            }

            <ul className={" flex flex-col justify-evenly text-gray-400 h-full font-bold text-center"}>
                <NavLink className="text-gray-400 aria-[current=page]:text-white hover:text-greenish" to="/">Edit Profile</NavLink>
                <NavLink className="text-gray-400 aria-[current=page]:text-white hover:text-greenish" to="/userpost">My Post</NavLink>
                
                <NavLink className="text-gray-400 aria-[current=page]:text-white hover:text-greenish" to="/">Favourites</NavLink>
                <NavLink className="text-gray-400 aria-[current=page]:text-white hover:text-greenish" to="/logout">Logout</NavLink>
            </ul>
        </nav>
    )
}