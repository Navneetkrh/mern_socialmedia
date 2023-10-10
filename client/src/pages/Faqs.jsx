import {Faqitem} from "../components/Faqitem.jsx";

export function Faqs() {
    return (
        <>
            <div className={"flex flex-col justify-center items-center  bg-blackish text-center"}>
                <div>
                    <h1 className={"text-reddish text-6xl font-semibold "}>FAQ’s</h1>
                    <h3 className={"text-white text-2xl font-semibold"}>all of your questions answered</h3>
                </div>
                <div className=" flex flex-col  my-16 justify-between text-left px-40 ">
                    <div className="bg-grayish p-4 rounded-3xl  w-full space-y-6 py-10 px-10" >
                        <Faqitem question={"1.How can I join the game development society?"} answer={"Answer: You can join our society by [providing details on the membership process, fees, and registration]"}/>
                        <Faqitem question={"2.Do I need to be an experienced developer to join?"} answer={"Answer: No, we welcome members of all skill levels, from beginners to experienced developers. Our society is a learning and collaborative environment."}/>
                        <Faqitem question={"3.What are the benefits of joining the society?"} answer={"Answer: [Provide details on the benefits of joining the society, such as access to resources, events, and networking opportunities]"}/>
                        <Faqitem question={"4.How can I get involved in the society?"} answer={"Answer: [Provide details on how members can get involved in the society, such as joining events, contributing to projects, and networking with other members]"}/>
                        <Faqitem question={"5.How can I contact the society?"} answer={"Answer: [Provide details on how members can contact the society, such as email, social media, and website]"}/>

                    </div>
                </div>


            </div>
        </>
    )
}