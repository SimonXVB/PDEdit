import { useContext, useRef, useState } from "react";
import { useAddPages } from "../Hooks/useAddPages";
import { useZoomPages } from "../Hooks/useZoomPages";
import { NavbarButton } from "./Individuals/3DButton";
import { pdfContext } from "../Context/PDFContext/pdfContext";
import { zoomContext } from "../Context/ZoomContext/zoomContext";
import { DrawModal } from "./Drawing Comps/DrawModal";
import { TextModal } from "./Text Comps/TextModal";

export function Navbar() {
    const { addPages } = useAddPages();
    const { zoomPages } = useZoomPages();
    
    const zoomCTX = useContext(zoomContext);
    const pdfCTX = useContext(pdfContext);

    const [modal, setModal] = useState<string>("");

    const inputButtonRef = useRef<HTMLInputElement>(null);

    function clickInput() {
        inputButtonRef.current?.click();
    };

    function handleAddPage(e: React.ChangeEvent<HTMLInputElement>): void {
        if(e.target.files) {
            addPages(e.target.files[0]);
        };
    };

    return (
        <>
            <nav className="flex justify-center sticky top-0 z-20">
                {pdfCTX.pdfDoc &&
                    <div className="flex gap-4 p-3 my-4 bg-white border-4 border-[#A294F9] rounded-4xl">
                        <div className="flex items-center">
                            <NavbarButton title={"Zoom In"} onClick={() => zoomPages("plus")}>Zoom In</NavbarButton>
                            <p className="font-semibold bg-[#a194f994] px-3 py-1 rounded-3xl mx-2" title="Zoom">{Math.floor(zoomCTX.zoomLevel * 100)}%</p>
                            <NavbarButton title={"Zoom Out"} onClick={() => zoomPages("minus")}>Zoom Out</NavbarButton>
                        </div>
                        <div className="relative flex justify-center">
                            <NavbarButton onClick={() => setModal(modal === "draw" ? "" : "draw")} title={"Draw"}>Draw</NavbarButton>
                            {modal === "draw" && <DrawModal/>}
                        </div>
                        <div className="relative flex justify-center">
                            <NavbarButton onClick={() => setModal(modal === "text" ? "" : "text")} title={"Text"}>Text</NavbarButton>
                            {modal === "text" && <TextModal/>}
                        </div>
                        <NavbarButton title={"Add PDF"} onClick={clickInput}>
                            <input ref={inputButtonRef} type="file" onChange={handleAddPage} className="absolute h-full top-0 left-0 w-full hidden"/>
                            <p>Add PDF</p>
                        </NavbarButton>
                    </div>
                }
            </nav>
            {modal && <div className="fixed top-0 left-0 w-screen h-screen z-10" onClick={() => setModal("")}></div>}
        </>
    )
};