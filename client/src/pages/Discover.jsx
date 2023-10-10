export function Discover() {
    return (
        <>
            <div className={"flex flex-col justify-center items-center  bg-[#1e1e1e] text-center"}>
                <div>
                    <h1 className={"text-[#9EBC87] text-6xl font-semibold "}>Discover</h1>
                    <h3 className={"text-white text-2xl font-semibold"}>exciting events and games</h3>
                </div>
                <div className="grid grid-cols-2 grid-rows-2 gap-8 my-16 justify-between">
                    <div className="bg-grayish p-4 rounded-2xl h-60 w-72">
                        <h2 className="text-4xl font-semibold text-reddish">Game Showcase</h2>
                        <p className="text-white text-xl">Experience Gaming Excellence !</p>
                    </div>
                    <div className="bg-grayish p-4 rounded-2xl h-60 w-72">
                        <h2 className="text-4xl font-semibold text-yellowish">Behind-the-Scenes</h2>
                        <p className="text-white text-xl">Dive into the Dev Diaries.</p>
                    </div>
                    <div className="bg-grayish p-4 rounded-2xl h-60 w-72">
                        <h2 className="text-4xl font-semibold text-pinkish">Tutorials and Guides</h2>
                        <p className="text-white text-xl">Level Up Your Skills</p>
                    </div>
                    <div className="bg-grayish p-4 rounded-2xl h-60 w-72">
                        <h2 className="text-4xl font-semibold text-bluish">Game Dev Challenges</h2>
                        <p className="text-white text-xl">Ready for the Challenge?</p>
                    </div>
                </div>


            </div>
        </>
    )
}