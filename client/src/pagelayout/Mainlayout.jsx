import { Sidebar } from "../components/Sidebar";
import profile from "../assets/profile.jpeg"
import {Home} from "../pages/Home";
export function Mainlayout(){
return(
    <div className="flex">
          <aside className="w-56 fixed left-0 top-0 pb-10 h-screen bg-[#1E1E1E]">
                <Sidebar image={profile} name={"Navneetkrh"}/>
          </aside>
          <main className="flex-1 ml-56">
              <Home/>

          </main>
      </div>
);
    
}