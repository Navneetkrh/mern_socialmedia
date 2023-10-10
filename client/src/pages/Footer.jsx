import {Faqitem} from "../components/Faqitem.jsx";
import logo from "../assets/insidelogo.png"
import line from "../assets/Line.svg"

export function Footer() {
    return (
        <>
            <div className={"flex flex-col justify-center items-center  bg-blackish text-center"}>
                <div className=" flex flex-col  my-40 justify-between text-left px-40 ">\

                    <div className="bg-grayish p-4 rounded-3xl  w-full space-y-6 pt-2 pb-10 px-10" >

                        <div className={"flex flex-row justify-center"}>
                            <img className={"w-1/2 h-1/2"} src={logo}/>
                        </div>


                        <div className={"flex flex-col justify-center"}>
                            <h1 className={"text-3xl text-greenish font-semibold text-center"}>Important links</h1>
                            <div className={"flex flex-row justify-evenly gap-6 mt-3"}>
                                <h1 className={"text-white text-2xl font-semibold"}>Society guidlines</h1>
                                <h1 className={"text-white text-2xl font-semibold"}>Terms and condititons</h1>
                                <h1 className={"text-white text-2xl font-semibold"}>Contact us</h1>
                            </div>
                        </div>

                        <div className={"flex flex-col justify-center"}>
                            <h1 className={"text-3xl text-reddish font-semibold text-center"}>Social media</h1>
                            <div className={"flex flex-row justify-evenly gap-6 mt-3"}>
                                <h1 className={"text-white text-2xl font-semibold"}>Instagram</h1>
                                <h1 className={"text-white text-2xl font-semibold"}>Youtube</h1>
                                <h1 className={"text-white text-2xl font-semibold"}>Whatsapp</h1>
                            </div>
                        </div>


                        <div className={"flex flex-col justify-center"}>

                            <div className={"flex flex-row justify-center"}>
                                <img src={line} className={"w-1/2 h-1/2"}/>

                            </div>
                            <div className={"flex flex-col text-center"}>
                                <h3 className={" text-lg font-semibold text-[#94D0EA]"}> ❤️ Designed and Developed by Navneet</h3>
                                <h1 className={"text-white text-2xl font-semibold"}>© 2023 Inside</h1>

                            </div>

                        </div>



                    </div>


                </div>



            </div>
        </>
    )
}