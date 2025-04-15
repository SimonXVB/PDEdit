import { useContext } from "react"
import { textContext } from "../../Context/Text Context/textContext"

export function TextColorButton({ color, title }: { color: string, title: string }) {
    const textCTX = useContext(textContext);
    const currentColor = textCTX.textOptions.color;

    function setColor(color: string) {
        textCTX.setTextOptions(prev => (
            {
                ...prev,
                color: color
            }
        ));
    };

    return (
        <button onClick={() => setColor(color)} title={title} className="w-[33%] h-6 m-1 cursor-pointer" 
            style={{backgroundColor: color, outline: currentColor === color ? "4px solid #A294F9" : "2px solid #000000"}}>
        </button>
    )
};