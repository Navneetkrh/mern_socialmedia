import { Sidebar } from "../components/Sidebar";
import profile from "../assets/profile.jpeg"
import {Home} from "../pages/Home";
import { useState } from "react";

export function Mainlayout(){

    const [isLogin, setisLogin] = useState(false);

    const userdata = JSON.parse(localStorage.getItem('userdata'));
    console.log(userdata);

    if(!userdata){
        console.log("Not logged in");
    }
    else{
        console.log("Logged in");
        
    }
return(
    <div className="flex">
          <aside className="w-56 fixed left-0 top-0 pb-10 h-screen bg-[#1E1E1E]">
                
                <Sidebar image={profile} name={(!userdata)? "please login":userdata.name }/>
          </aside>
          <main className="flex-1 ml-56">
              <Home/>
              
              

          </main>
      </div>
);
    
}