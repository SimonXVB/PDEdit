import { NavbarModal } from "../Individuals/NavbarModal";
import { TextColorButton } from "./TextColorButton";
import { textContext } from "../../Context/Text Context/textContext";
import { useContext, useEffect, useRef } from "react";
import { TextDropdown } from "./TextDropdown";

export function TextModal() {
    const textCTX = useContext(textContext);

    const inputRef = useRef<HTMLInputElement>(null);

    function selectFontSize(e: React.ChangeEvent<HTMLInputElement>) {
        textCTX.setTextOptions(prev => (
            {
                ...prev,
                size: Number(e.target.value)
            }
        ));
    };

    useEffect(() => {
        inputRef.current!.value = String(textCTX.textOptions.size);
    }, [textCTX.textOptions.size]);

    return (
        <NavbarModal>
            <TextDropdown />
            <input ref={inputRef} onChange={e => selectFontSize(e)} type="range" min={1} max={50} className="cursor-pointer"/>
            <div className="flex items-center flex-col *:w-full *:flex">
                <div>
                    <TextColorButton color="#000000" title="Black"/>
                    <TextColorButton color="#ffffff" title="White"/>
                    <TextColorButton color="#fb2c36" title="Red"/>
                </div>
                <div>
                    <TextColorButton color="#00c950" title="Green"/>
                    <TextColorButton color="#2b7fff" title="Blue"/>
                    <TextColorButton color="#a294f9" title="Purple"/>
                </div>
            </div>
        </NavbarModal>
    )
};