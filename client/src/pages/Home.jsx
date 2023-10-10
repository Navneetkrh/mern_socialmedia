    import bg from "../assets/bg.gif"
    import {Discover} from "./Discover.jsx";
    import {Faqs} from "./Faqs.jsx";
    import {Team} from "./Team.jsx";
    import {Footer} from "./Footer.jsx";
    import {Link} from "react-router-dom";
    // import {Login} from "./Login.jsx";
export function Home() {

    return (
        <div className={"h-full w-full  "}>
            {/*<img src={bg} alt={"bg"} className={"h-full w-full object-cover"}/>*/}



            <div
                className={"w-full h-screen bg-cover bg-center"}
                style={{ backgroundImage: `url(${bg})`  }}>
                <div className="w-full h-full flex  justify-center items-center
             bg-gradient-to-t from-[#1E1E1E] via-transparent to-[#1E1E1E] backdrop-brightness-50 flex-col">

                    <div className={"flex w-full h-1/2"}>
                    {/*    logo*/}
                        <div className={"flex flex-col justify-start w-full"}>
                            <div className={"flex flex-row justify-end w-full"}>
                                <input type={"text"} className={" h-12 w-56 rounded-3xl my-3.5 mx-20 text-center bg-grayish border-2 border-gray-500 "} placeholder={"Type to Search"}/>
                            </div>
                        </div>
                    </div>

                    <div className={" flex flex-row justify-end w-full h-1/2 "}>
                        {/*    logo*/}
                        <div className={"flex flex-col justify-end items-center w-96 mb-16 mr-40"}>
                            <h1 className={"text-white text-center text-6xl font-bold"}>Your Odyssey Awaits</h1>
                            <h2 className={"text-white text-3xl text-center mt-4 mb-5"}>Start Your Game Dev Journey Today</h2>
                            <button className={"bg-[#F5DD5F] p-1 rounded-3xl w-40 h-12 hover:bg-bluish hover:text-white "}>
                            
                                <text className={"font-bold text-2xl "}><Link to = '/login'>Join Us</Link></text>
                            </button>
                        </div>
                    </div>

                </div>
            </div>
            <Discover/>
            <Faqs/>
            <Team/>
            <Footer/>

        </div>
    )
}