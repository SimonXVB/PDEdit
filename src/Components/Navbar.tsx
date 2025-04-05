import { useContext, useRef } from "react";
import { useAddPages } from "../Hooks/useAddPages";
import { useZoomPages } from "../Hooks/useZoomPages";
import { NavbarButton } from "./Individuals/3DButton";
import { pdfContext } from "../Context/PDFContext/pdfContext";

export function Navbar() {
    const { addPages } = useAddPages();
    const { zoomPages } = useZoomPages();

    const pdfCTX = useContext(pdfContext);
    const inputButtonRef = useRef<HTMLInputElement>(null);
 
    function handleAddPage(e: React.ChangeEvent<HTMLInputElement>): void {
        if(e.target.files) {
            addPages(e.target.files[0]);
        };
    };

    function clickInput() {
        inputButtonRef.current?.click();
    };

    return (
        <div className="flex justify-center">
            {pdfCTX.pdfDoc && 
                <nav className="flex gap-4 p-3 border-4 border-[#A294F9] rounded-4xl mx-auto my-16">
                    <NavbarButton title={"Zoom In"} onClick={() => zoomPages("plus")}>Zoom In</NavbarButton>
                    <NavbarButton title={"Zoom Out"} onClick={() => zoomPages("minus")}>Zoom Out</NavbarButton>
                    <NavbarButton title={"Add PDF"} onClick={clickInput}>
                        <input ref={inputButtonRef} type="file" onChange={handleAddPage} className="cursor-pointer absolute h-full top-0 left-0 w-full opacity-0 hidden"/>
                        <p>Add PDF</p>
                    </NavbarButton>
                </nav>
            }
        </div>
    )
};