import { Sidebar } from '../Sidebar'
import profile from "../../assets/profile.jpeg"
import { useNavigate } from 'react-router-dom';
import { Sidebarforprofile } from '../Sidebarprofile';
import { useState, useEffect } from 'react'
import axios from 'axios'

export function Logouthere() {
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
                <Logout navigate={navigate} />
            </main>
            <aside className="w-56 fixed right-0 top-0 pb-10 h-screen bg-[#1E1E1E]">
                <Sidebarforprofile />
            </aside>
        </div>
    );
}

function Logout({ navigate }) {
    const handleLogout = async () => {
        try {
            localStorage.removeItem('userdata');
            navigate('/');
            console.log("Logged out");
        } catch (error) {
            console.error("Error during logout:", error);
        }
    };
    return (
        <div className="flex justify-center items-center h-screen">
            <div className="bg-white p-8 rounded shadow">
                <h1 className="text-2xl font-bold mb-4">Confirm logout</h1>
                <button
                    className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
                    onClick={handleLogout}
                >
                    Logout
                </button>
            </div>
        </div>
    );
}
