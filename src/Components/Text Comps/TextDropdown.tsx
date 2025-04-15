import { useContext, useState } from "react";
import { textContext } from "../../Context/Text Context/textContext";

export function TextDropdown() {
    const textCTX = useContext(textContext);
    const fontArray: string[] = ["Helvetica", "Helvetica Bold", "Courier", "Courier Bold", "Times New Roman", "Times New Roman Bold"];

    const [isOpen, setIsOpen] = useState<boolean>(false);

    function selectFont(font: string) {
        textCTX.setTextOptions(prev =>(
            {
                ...prev,
                font: font
            }
        ));
        setIsOpen(false);
    };

    return (
        <>
            <button onClick={() => setIsOpen(isOpen ? false : true)} className="cursor-pointer border-b-2 border-black w-full text-left">{textCTX.textOptions.font}</button>
            {isOpen &&
                <div className="flex flex-col items-start *:cursor-pointer">
                    {fontArray.map((el, i) => (
                        textCTX.textOptions.font !== el && <button onClick={() => selectFont(el)} key={i}>{el}</button>
                    ))}
                </div>
            }
        </>
    )
};