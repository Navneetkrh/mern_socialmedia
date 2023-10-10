export function Faqitem(props) {
    return (
        <>
            <h2 className="text-4xl font-semibold text-yellowish">{props.question}</h2>
            <p className="text-white text-xl">{props.answer}</p>
        </>
    )
}