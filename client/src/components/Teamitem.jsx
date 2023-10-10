import {Faqitem} from "./Faqitem.jsx";

export function Teamitem(props) {
    return (
        <>
            <h2 className="text-4xl font-semibold text-yellowish">props.position</h2>
            <p className="text-white text-xl">{props.answer}</p>
        </>
    )
}