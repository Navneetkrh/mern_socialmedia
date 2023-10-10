export function Sidebar(props) {
    return (

            <nav className={" flex flex-col rounded-2xl bg-[#2E2F31] w-48  h-full pt-10 mb-10 m-5 "}>
                <div className={"flex-col"}>

                        <img src={props.image} alt={"logo"} className={"w-20 h-24 rounded-full mx-auto"}/>
                        <h1 className={"text-white text-center text-2xl font-bold"}>Welcome</h1>
                        <h1 className={"text-center text-lg text-[#9EBC87] font-bold"}>@{props.name}</h1>


                </div>

                <ul className={" flex flex-col justify-evenly text-gray-400 h-full font-bold text-center"}>

                    <li className={"text-white"}>Home</li>
                    <li className={"hover:text-white"}>Events</li>
                    <li className={"hover:text-white"}>Chat Room</li>
                    <li className={"hover:text-white"}>Updates</li>
                    <li className={"hover:text-white"}>Forums</li>
                    <li className={"hover:text-white"}>Achievements</li>

                </ul>
            </nav>

    )
}